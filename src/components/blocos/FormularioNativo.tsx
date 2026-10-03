'use client'

import { useState } from 'react'
import { registrarEvento, EVENTOS } from '@/lib/analytics'
import type { FonteFormulario } from '@/site/types'

type Fonte = Extract<FonteFormulario, { tipo: 'nativo' }>
type Estado = 'parado' | 'enviando' | 'sucesso' | 'erro'

/**
 * Formulário nativo — envia para `POST /api/contato`, que dispara um e-mail
 * via Resend. Não há banco de dados: a mensagem vira e-mail e acabou.
 *
 * ⚠️ Esta é a única parte do site que exige servidor Node.js. Se o cliente usar
 * Google Forms / Microsoft Forms / iframe, o site pode ser publicado como
 * export estático (`npm run build:static`).
 */
export function FormularioNativo({ fonte }: { fonte: Fonte }) {
  const [estado, setEstado] = useState<Estado>('parado')
  const [mensagemErro, setMensagemErro] = useState('')

  async function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setEstado('enviando')
    setMensagemErro('')

    const dados = Object.fromEntries(new FormData(evento.currentTarget).entries())

    try {
      const resposta = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })

      if (!resposta.ok) {
        const corpo = (await resposta.json().catch(() => ({}))) as { erro?: string }
        throw new Error(corpo.erro ?? 'Não foi possível enviar a mensagem.')
      }

      registrarEvento(EVENTOS.envioFormulario, { origem: 'formulario-nativo' })
      setEstado('sucesso')
    } catch (erro) {
      setMensagemErro(
        erro instanceof Error ? erro.message : 'Não foi possível enviar a mensagem.',
      )
      setEstado('erro')
    }
  }

  if (estado === 'sucesso') {
    return (
      <div
        role="status"
        className=" bg-[var(--color-pastilha-clara)] p-8 text-center"
      >
        <p className="font-[family-name:var(--font-titulo)] text-[1.75rem] text-[var(--color-pastilha)]">
          Mensagem enviada
        </p>
        <p className="mt-2 leading-relaxed text-[var(--color-grafite-suave)]">
          {fonte.mensagemSucesso}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={aoEnviar} className="flex flex-col gap-5" noValidate={false}>
      {/* Campo-armadilha para robôs: invisível para gente, preenchido por bot. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="empresa-site">Não preencher</label>
        <input id="empresa-site" name="empresa_site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {fonte.campos.map((campo) => {
        const id = `campo-${campo.nome}`
        const classes = 'campo-controle'

        return (
          <div key={campo.nome}>
            <label htmlFor={id} className="campo-rotulo mb-2 block">
              {campo.rotulo}
              {campo.obrigatorio ? (
                <span className="text-[var(--color-erro)]"> *</span>
              ) : null}
            </label>

            {campo.tipo === 'textarea' ? (
              <textarea
                id={id}
                name={campo.nome}
                rows={4}
                required={campo.obrigatorio}
                placeholder={campo.placeholder}
                className={`${classes} resize-y`}
              />
            ) : campo.tipo === 'selecao' ? (
              <select id={id} name={campo.nome} required={campo.obrigatorio} className={classes} defaultValue="">
                <option value="" disabled>
                  {campo.placeholder ?? 'Selecione uma opção'}
                </option>
                {(campo.opcoes ?? []).map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={campo.nome}
                type={campo.tipo === 'email' ? 'email' : campo.tipo === 'telefone' ? 'tel' : 'text'}
                inputMode={campo.tipo === 'telefone' ? 'tel' : undefined}
                autoComplete={
                  campo.tipo === 'email' ? 'email' : campo.tipo === 'telefone' ? 'tel' : 'name'
                }
                required={campo.obrigatorio}
                placeholder={campo.placeholder}
                className={classes}
              />
            )}
          </div>
        )
      })}

      {estado === 'erro' ? (
        <p role="alert" className="campo-erro">
          {mensagemErro}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="botao botao-placa w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {estado === 'enviando' ? 'Enviando...' : fonte.rotuloEnvio}
      </button>

      <p className="text-xs leading-relaxed text-[var(--color-grafite-suave)]">
        {fonte.avisoPrivacidade}
      </p>
    </form>
  )
}
