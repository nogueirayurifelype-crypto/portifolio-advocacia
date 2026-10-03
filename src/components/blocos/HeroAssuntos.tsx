'use client'

import { useId, useState } from 'react'
import { IconeWhatsapp } from '@/components/Icone'
import { registrarCliqueWhatsapp } from '@/lib/analytics'
import { linkWhatsapp } from '@/lib/whatsapp'

/**
 * Atalhos de assunto do Hero: o visitante escolhe o tema e a placa de WhatsApp
 * já abre a conversa com a mensagem daquele assunto. Diminui a ansiedade de
 * "o que eu escrevo?" sem acrescentar um passo — escolher é opcional.
 */
export function HeroAssuntos({
  rotulo,
  opcoes,
  rotuloBotao,
  mensagemPadrao,
  children,
}: {
  rotulo: string
  opcoes: { rotulo: string; mensagem: string }[]
  rotuloBotao: string
  mensagemPadrao: string
  /** Ação secundária, exibida ao lado da placa. */
  children?: React.ReactNode
}) {
  const [escolha, setEscolha] = useState<number | null>(null)
  const idRotulo = useId()
  const mensagem = escolha === null ? mensagemPadrao : opcoes[escolha].mensagem

  return (
    <div>
      <p id={idRotulo} className="text-[1rem] font-semibold text-[var(--color-sobre-pastilha-suave)]">
        {rotulo} <span className="font-normal">(opcional)</span>
      </p>
      <ul aria-labelledby={idRotulo} className="mt-3 flex flex-wrap gap-2">
        {opcoes.map((opcao, indice) => {
          const marcado = escolha === indice
          return (
            <li key={opcao.rotulo}>
              <button
                type="button"
                aria-pressed={marcado}
                onClick={() => setEscolha(marcado ? null : indice)}
                className={`flex min-h-11 items-center px-4 text-[1rem] font-semibold transition-colors duration-200 ${
                  marcado
                    ? 'bg-[var(--color-pastilha-clara)] text-[var(--color-pastilha-funda)] shadow-[inset_0_0_0_1px_var(--color-pastilha-clara)]'
                    : 'text-[var(--color-sobre-pastilha)] shadow-[inset_0_0_0_1px_rgb(201_217_207/0.62)] hover:shadow-[inset_0_0_0_1px_var(--color-pastilha-clara)]'
                }`}
              >
                {opcao.rotulo}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-7 flex flex-col gap-x-7 gap-y-3 sm:flex-row sm:items-center">
        <a
          href={linkWhatsapp(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          data-placa-principal
          className="botao botao-placa w-full sm:w-auto"
          onClick={() =>
            registrarCliqueWhatsapp(escolha === null ? 'hero' : `hero:${opcoes[escolha].rotulo}`, mensagem)
          }
        >
          <IconeWhatsapp tamanho={20} />
          {rotuloBotao}
          {escolha !== null ? (
            <span className="sr-only">, assunto: {opcoes[escolha].rotulo}</span>
          ) : null}
        </a>
        {children}
      </div>
    </div>
  )
}
