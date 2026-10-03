'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { IconeWhatsapp, Icone } from '@/components/Icone'
import { EVENTO_ASSUNTO } from '@/lib/assunto'
import { registrarCliqueWhatsapp, registrarEvento, EVENTOS } from '@/lib/analytics'
import { linkWhatsapp } from '@/lib/whatsapp'
import type { FonteFormulario } from '@/site/types'

type Fonte = Extract<FonteFormulario, { tipo: 'whatsapp' }>
type Campo = Fonte['campos'][number]
type Erros = Record<string, string>

const CONSENTIMENTO = 'consentimento'

/** (11) 98765-4321 a partir de qualquer coisa digitada. */
function mascararTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)
  if (digitos.length <= 2) {
    return digitos.length ? `(${digitos}` : ''
  }
  const ddd = digitos.slice(0, 2)
  const resto = digitos.slice(2)
  if (resto.length <= 4) {
    return `(${ddd}) ${resto}`
  }
  const corte = resto.length > 8 ? 5 : 4
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`
}

function validarCampo(campo: Campo, valor: string): string {
  const limpo = valor.trim()

  if (campo.obrigatorio && !limpo) {
    if (campo.tipo === 'selecao') {
      return 'Escolha uma opção. Se não souber, marque "Não sei / outro assunto".'
    }
    if (campo.tipo === 'textarea') {
      return 'Conte em poucas palavras o que está acontecendo.'
    }
    return `Preencha o campo "${campo.rotulo}".`
  }

  if (campo.tipo === 'telefone' && limpo) {
    const digitos = limpo.replace(/\D/g, '')
    if (digitos.length < 10 || digitos.length > 11) {
      return 'Confira o número: são o DDD e mais 8 ou 9 dígitos, como (11) 90000-0000.'
    }
  }

  if (campo.tipo === 'texto' && limpo && limpo.length < 2) {
    return 'Escreva pelo menos o primeiro nome.'
  }

  return ''
}

/**
 * Formulário sem backend: valida, monta a mensagem e abre o WhatsApp.
 *
 * Nada sai do navegador sem o visitante tocar em "enviar" dentro do próprio
 * WhatsApp — por isso funciona em export estático e não exige política de
 * armazenamento. A conversão conta como `envio_formulario` e `clique_whatsapp`.
 */
export function FormularioWhatsapp({ fonte }: { fonte: Fonte }) {
  const prefixo = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [valores, setValores] = useState<Record<string, string>>({})
  const [consentiu, setConsentiu] = useState(false)
  const [erros, setErros] = useState<Erros>({})
  const [tocados, setTocados] = useState<Record<string, boolean>>({})
  const [linkEnviado, setLinkEnviado] = useState<string | null>(null)

  const campoAssunto = fonte.campos.find((campo) => campo.tipo === 'selecao')

  // "Saber mais" das áreas (evento) ou link compartilhado com ?assunto=.
  useEffect(() => {
    if (!campoAssunto) {
      return
    }

    const aplicar = (assunto: string) => {
      const opcao = campoAssunto.opcoes?.find(
        (item) => item.toLowerCase() === assunto.toLowerCase(),
      )
      if (!opcao) {
        return
      }
      setValores((atual) => ({ ...atual, [campoAssunto.nome]: opcao }))
      setErros((atual) => ({ ...atual, [campoAssunto.nome]: '' }))
      setLinkEnviado(null)
    }

    const daUrl = new URLSearchParams(window.location.search).get('assunto')
    if (daUrl) {
      aplicar(daUrl)
    }

    const aoSelecionar = (evento: Event) => aplicar((evento as CustomEvent<string>).detail)
    window.addEventListener(EVENTO_ASSUNTO, aoSelecionar)
    return () => window.removeEventListener(EVENTO_ASSUNTO, aoSelecionar)
  }, [campoAssunto])

  const id = (nome: string) => `${prefixo}-${nome}`

  const atualizar = (campo: Campo, bruto: string) => {
    const valor = campo.tipo === 'telefone' ? mascararTelefone(bruto) : bruto
    setValores((atual) => ({ ...atual, [campo.nome]: valor }))
    setLinkEnviado(null)
    if (tocados[campo.nome]) {
      setErros((atual) => ({ ...atual, [campo.nome]: validarCampo(campo, valor) }))
    }
  }

  const aoSair = (campo: Campo) => {
    setTocados((atual) => ({ ...atual, [campo.nome]: true }))
    setErros((atual) => ({
      ...atual,
      [campo.nome]: validarCampo(campo, valores[campo.nome] ?? ''),
    }))
  }

  const montarMensagem = () => {
    const linhas = [fonte.saudacao, '']
    for (const campo of fonte.campos) {
      const valor = (valores[campo.nome] ?? '').trim()
      if (!valor || campo.tipo === 'textarea') {
        continue
      }
      linhas.push(`${campo.rotulo}: ${valor}`)
    }
    const relato = fonte.campos.find((campo) => campo.tipo === 'textarea')
    const texto = relato ? (valores[relato.nome] ?? '').trim() : ''
    if (texto) {
      linhas.push('', texto)
    }
    return linhas.join('\n')
  }

  const aoEnviar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const novos: Erros = {}
    for (const campo of fonte.campos) {
      const erro = validarCampo(campo, valores[campo.nome] ?? '')
      if (erro) {
        novos[campo.nome] = erro
      }
    }
    if (!consentiu) {
      novos[CONSENTIMENTO] = 'Para continuar, marque a autorização de uso dos dados.'
    }

    setErros(novos)
    setTocados(
      Object.fromEntries([...fonte.campos.map((campo) => [campo.nome, true]), [CONSENTIMENTO, true]]),
    )

    const primeiroErro = [...fonte.campos.map((campo) => campo.nome), CONSENTIMENTO].find(
      (nome) => novos[nome],
    )
    if (primeiroErro) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(primeiroErro))}`)?.focus()
      return
    }

    const mensagem = montarMensagem()
    const link = linkWhatsapp(mensagem)
    const assunto = campoAssunto ? valores[campoAssunto.nome] : undefined

    registrarEvento(EVENTOS.envioFormulario, { origem: 'formulario-whatsapp', assunto })
    registrarCliqueWhatsapp('formulario', mensagem)

    window.open(link, '_blank', 'noopener,noreferrer')
    setLinkEnviado(link)
  }

  const descricaoDe = (campo: Campo) =>
    [campo.dica ? id(`${campo.nome}-dica`) : null, erros[campo.nome] ? id(`${campo.nome}-erro`) : null]
      .filter(Boolean)
      .join(' ') || undefined

  const totalErros = Object.values(erros).filter(Boolean).length

  return (
    <form ref={formRef} onSubmit={aoEnviar} noValidate className="formulario" aria-describedby={id('nota')}>
      {fonte.campos.map((campo) => {
        const erro = erros[campo.nome]
        const comum = {
          id: id(campo.nome),
          name: campo.nome,
          required: campo.obrigatorio,
          'aria-invalid': erro ? true : undefined,
          'aria-describedby': descricaoDe(campo),
          onBlur: () => aoSair(campo),
          className: `campo-controle${erro ? ' campo-controle-erro' : ''}`,
        }

        return (
          <div key={campo.nome} className={`campo${campo.tipo === 'textarea' ? ' campo-largo' : ''}`}>
            <label htmlFor={id(campo.nome)} className="campo-rotulo">
              {campo.rotulo}
              {campo.obrigatorio ? null : <span className="campo-opcional"> (opcional)</span>}
            </label>

            {campo.tipo === 'textarea' ? (
              <textarea
                {...comum}
                rows={5}
                maxLength={1200}
                placeholder={campo.placeholder}
                value={valores[campo.nome] ?? ''}
                onChange={(e) => atualizar(campo, e.target.value)}
              />
            ) : campo.tipo === 'selecao' ? (
              <select
                {...comum}
                value={valores[campo.nome] ?? ''}
                onChange={(e) => {
                  atualizar(campo, e.target.value)
                  setErros((atual) => ({ ...atual, [campo.nome]: validarCampo(campo, e.target.value) }))
                }}
              >
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
                {...comum}
                type={campo.tipo === 'telefone' ? 'tel' : 'text'}
                inputMode={campo.tipo === 'telefone' ? 'tel' : undefined}
                autoComplete={campo.tipo === 'telefone' ? 'tel-national' : 'given-name'}
                maxLength={campo.tipo === 'telefone' ? 15 : 80}
                placeholder={campo.placeholder}
                value={valores[campo.nome] ?? ''}
                onChange={(e) => atualizar(campo, e.target.value)}
              />
            )}

            {campo.dica ? (
              <p id={id(`${campo.nome}-dica`)} className="campo-dica">
                {campo.dica}
              </p>
            ) : null}
            {erro ? (
              <p id={id(`${campo.nome}-erro`)} className="campo-erro">
                <Icone nome="alerta" tamanho={16} />
                {erro}
              </p>
            ) : null}
          </div>
        )
      })}

      <div className="campo campo-largo">
        <label className="campo-consentimento" htmlFor={id(CONSENTIMENTO)}>
          <input
            id={id(CONSENTIMENTO)}
            type="checkbox"
            checked={consentiu}
            aria-invalid={erros[CONSENTIMENTO] ? true : undefined}
            aria-describedby={erros[CONSENTIMENTO] ? id(`${CONSENTIMENTO}-erro`) : undefined}
            onChange={(e) => {
              setConsentiu(e.target.checked)
              setLinkEnviado(null)
              if (tocados[CONSENTIMENTO]) {
                setErros((atual) => ({
                  ...atual,
                  [CONSENTIMENTO]: e.target.checked ? '' : 'Para continuar, marque a autorização de uso dos dados.',
                }))
              }
            }}
          />
          <span>
            {fonte.consentimento}{' '}
            <a href="/politica-de-privacidade" className="link-texto">
              Ler a Política de Privacidade
            </a>
          </span>
        </label>
        {erros[CONSENTIMENTO] ? (
          <p id={id(`${CONSENTIMENTO}-erro`)} className="campo-erro">
            <Icone nome="alerta" tamanho={16} />
            {erros[CONSENTIMENTO]}
          </p>
        ) : null}
      </div>

      <div className="campo-largo formulario-envio">
        <button type="submit" className="botao botao-placa shrink-0 whitespace-nowrap">
          <IconeWhatsapp tamanho={20} />
          {fonte.rotuloEnvio}
        </button>
        <p id={id('nota')} className="campo-dica">
          Abre o WhatsApp com a mensagem pronta. Você revisa e envia de lá.
        </p>
      </div>

      <div aria-live="polite" className="campo-largo">
        {totalErros > 0 && tocados[CONSENTIMENTO] ? (
          <p className="sr-only">
            {totalErros === 1 ? 'Há 1 campo para corrigir.' : `Há ${totalErros} campos para corrigir.`}
          </p>
        ) : null}
        {linkEnviado ? (
          <p className="formulario-sucesso" role="status">
            <Icone nome="check" tamanho={18} />
            <span>
              {fonte.mensagemSucesso} Não abriu?{' '}
              <a
                href={linkEnviado}
                target="_blank"
                rel="noopener noreferrer"
                className="link-texto"
              >
                Abrir o WhatsApp de novo
              </a>
            </span>
          </p>
        ) : null}
      </div>
    </form>
  )
}
