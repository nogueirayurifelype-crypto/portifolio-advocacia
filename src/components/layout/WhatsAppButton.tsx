'use client'

import { useEffect, useRef, useState } from 'react'
import { Icone, IconeWhatsapp } from '@/components/Icone'
import { registrarCliqueWhatsapp, registrarEvento } from '@/lib/analytics'
import { EVENTO_MENU } from '@/components/layout/Header'
import { linkWhatsapp } from '@/lib/whatsapp'
import { siteConfig } from '@/site/config'

/**
 * Botão flutuante de WhatsApp — estrutura fixa, existe em todas as páginas,
 * fora do array de blocos.
 *
 * Não há integração com a API do WhatsApp. O que existe é UX de retenção:
 * em vez de jogar o visitante direto no aplicativo com uma mensagem genérica,
 * abre um painel curto com intenções pré-escritas. O visitante escolhe a
 * intenção, a conversa já começa qualificada e o clique vira evento no GA4
 * com a intenção escolhida como parâmetro.
 */
export function WhatsAppButton() {
  const [aberto, setAberto] = useState(false)
  // Some quando outra placa de WhatsApp já está na tela (a do Hero ou a do
  // Contato) e quando o menu do celular está aberto: uma ação principal por
  // tela, e o flutuante não cobre os campos do formulário.
  const [placaVisivel, setPlacaVisivel] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const painelRef = useRef<HTMLDivElement>(null)
  const botaoRef = useRef<HTMLButtonElement>(null)
  const { opcoesRapidas, mensagemPadrao, tituloPainel, subtituloPainel } = siteConfig.whatsapp

  useEffect(() => {
    if (!aberto) {
      return
    }

    const aoClicarFora = (evento: MouseEvent) => {
      const alvo = evento.target as Node
      if (painelRef.current?.contains(alvo) || botaoRef.current?.contains(alvo)) {
        return
      }
      setAberto(false)
    }

    const aoPressionar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setAberto(false)
        botaoRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', aoClicarFora)
    document.addEventListener('keydown', aoPressionar)
    return () => {
      document.removeEventListener('mousedown', aoClicarFora)
      document.removeEventListener('keydown', aoPressionar)
    }
  }, [aberto])

  useEffect(() => {
    const alvos = [
      document.querySelector('[data-placa-principal]'),
      document.getElementById('contato'),
    ].filter((el): el is Element => el !== null)
    if (alvos.length === 0) {
      return
    }

    const visiveis = new Set<Element>()
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          visiveis.add(entrada.target)
        } else {
          visiveis.delete(entrada.target)
        }
      }
      setPlacaVisivel(visiveis.size > 0)
    })
    alvos.forEach((alvo) => observador.observe(alvo))
    return () => observador.disconnect()
  }, [])

  useEffect(() => {
    const aoMudarMenu = (evento: Event) => setMenuAberto((evento as CustomEvent<boolean>).detail)
    window.addEventListener(EVENTO_MENU, aoMudarMenu)
    return () => window.removeEventListener(EVENTO_MENU, aoMudarMenu)
  }, [])

  const escondido = (placaVisivel || menuAberto) && !aberto

  const alternar = () => {
    setAberto((valor) => {
      if (!valor) {
        registrarEvento('abriu_painel_whatsapp', { origem: 'botao-flutuante' })
      }
      return !valor
    })
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 transition-[opacity,transform] duration-300 ease-[var(--ease-saida)] sm:bottom-6 sm:right-6 print:hidden ${
        escondido ? 'pointer-events-none translate-y-4 opacity-0' : ''
      }`}
      inert={escondido}
    >
      {aberto ? (
        <div
          ref={painelRef}
          role="dialog"
          aria-label={tituloPainel}
          className="w-[min(21rem,calc(100vw-2rem))] overflow-hidden border border-[var(--color-rejunte)] bg-[var(--color-cal)] shadow-[0_2px_0_var(--color-bronze)]"
        >
          <div className="campo-pastilha px-5 py-4">
            <p className="font-[family-name:var(--font-titulo)] text-[1.5rem] leading-tight">{tituloPainel}</p>
            <p className="mt-1 text-[0.9375rem] leading-snug text-[var(--color-sobre-pastilha-suave)]">
              {subtituloPainel}
            </p>
          </div>

          <ul className="flex flex-col p-2">
            {opcoesRapidas.map((opcao) => (
              <li key={opcao.rotulo}>
                <a
                  href={linkWhatsapp(opcao.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-between gap-3 px-3 py-3 text-[1rem] font-semibold leading-snug transition-colors duration-200 hover:bg-[var(--color-cal-escura)] hover:text-[var(--color-pastilha)]"
                  onClick={() => {
                    registrarCliqueWhatsapp('painel-flutuante', opcao.mensagem)
                    setAberto(false)
                  }}
                >
                  {opcao.rotulo}
                  <Icone nome="seta" tamanho={18} className="shrink-0 text-[var(--color-bronze)]" />
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-[var(--color-rejunte)] px-5 py-3">
            <a
              href={linkWhatsapp(mensagemPadrao)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-texto text-[0.9375rem]"
              onClick={() => {
                registrarCliqueWhatsapp('painel-flutuante-outro', mensagemPadrao)
                setAberto(false)
              }}
            >
              Prefiro escrever minha própria mensagem
            </a>
          </div>
        </div>
      ) : null}

      <button
        ref={botaoRef}
        type="button"
        onClick={alternar}
        aria-expanded={aberto}
        aria-label={aberto ? 'Fechar opções de WhatsApp' : 'Falar no WhatsApp'}
        className="flex h-14 items-center gap-3 bg-[var(--color-pastilha)] pl-2 pr-5 text-[var(--color-cal)] shadow-[0_2px_0_var(--color-bronze-claro)] ring-1 ring-[var(--color-pastilha-funda)] transition-colors duration-200 hover:bg-[var(--color-pastilha-funda)]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-[var(--color-pastilha-funda)]">
          <IconeWhatsapp tamanho={22} />
        </span>
        <span className="text-[1rem] font-bold">{aberto ? 'Fechar' : 'WhatsApp'}</span>
      </button>
    </div>
  )
}
