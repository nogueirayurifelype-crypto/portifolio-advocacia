'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { IconeWhatsapp } from '@/components/Icone'
import { registrarCliqueWhatsapp } from '@/lib/analytics'
import { linkWhatsapp } from '@/lib/whatsapp'
import { siteConfig } from '@/site/config'

/**
 * Header/menu — estrutura fixa, existe em todas as páginas, fora do array de
 * blocos. Os itens vêm de `siteConfig.menu`.
 *
 * Faixa verde-pastilha contínua com o hero. O item ativo acompanha a seção
 * visível (IntersectionObserver, sem listener de scroll por item). Fora da
 * home, as âncoras apontam para `/#secao`.
 */
/** Evento que avisa o botão flutuante de WhatsApp quando o menu do celular abre/fecha. */
export const EVENTO_MENU = 'site:menu-mobile'

export function Header() {
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState<string | null>(null)
  const botaoMenuRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const naHome = pathname === '/'

  useEffect(() => {
    if (!naHome) {
      return
    }

    const ids = siteConfig.menu
      .filter((item) => item.href.startsWith('#'))
      .map((item) => item.href.slice(1))
    const secoes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const visiveis = new Map<string, number>()
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          visiveis.set(entrada.target.id, entrada.isIntersecting ? entrada.intersectionRatio : 0)
        }
        const [melhor] = [...visiveis.entries()]
          .filter(([, razao]) => razao > 0)
          .sort((a, b) => ids.indexOf(a[0]) - ids.indexOf(b[0]))
        setAtivo(melhor ? melhor[0] : null)
      },
      // Faixa estreita logo abaixo do header: a seção que cruza essa linha é a ativa.
      { rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.01] },
    )

    secoes.forEach((secao) => observador.observe(secao))
    return () => observador.disconnect()
  }, [naHome])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent<boolean>(EVENTO_MENU, { detail: aberto }))
    if (!aberto) {
      return
    }
    document.body.style.overflow = 'hidden'
    const aoPressionar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setAberto(false)
        botaoMenuRef.current?.focus()
      }
    }
    document.addEventListener('keydown', aoPressionar)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', aoPressionar)
    }
  }, [aberto])

  const mensagem = siteConfig.whatsapp.mensagemPadrao
  const destino = (href: string) => (href.startsWith('#') && !naHome ? `/${href}` : href)

  return (
    <header className="campo-pastilha sticky top-0 z-40 border-b border-[var(--color-pastilha-media)]">
      <div className="secao">
        <div className="secao-interna flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href="/"
            className="whitespace-nowrap font-[family-name:var(--font-titulo)] text-[1.25rem] leading-none tracking-[-0.01em] min-[400px]:text-[1.375rem] sm:text-2xl"
            onClick={() => setAberto(false)}
          >
            {siteConfig.nomeCurto ?? siteConfig.nome}
          </Link>

          <nav aria-label="Menu principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteConfig.menu.map((item) => {
                const atual = ativo !== null && item.href === `#${ativo}`
                return (
                  <li key={item.href}>
                    <Link
                      href={destino(item.href)}
                      aria-current={atual ? 'true' : undefined}
                      className={`relative flex h-11 items-center px-3.5 text-[1rem] font-semibold transition-colors duration-200 after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:origin-left after:bg-[var(--color-bronze-claro)] after:transition-transform after:duration-300 after:ease-[var(--ease-saida)] hover:text-[var(--color-cal)] ${
                        atual
                          ? 'text-[var(--color-cal)] after:scale-x-100'
                          : 'text-[var(--color-sobre-pastilha-suave)] after:scale-x-0'
                      }`}
                    >
                      {item.rotulo}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={linkWhatsapp(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className="botao botao-contorno min-h-11 px-4 py-2 text-[0.9375rem]"
              onClick={() => registrarCliqueWhatsapp('header', mensagem)}
            >
              <IconeWhatsapp tamanho={18} />
              <span>
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Falar no WhatsApp</span>
              </span>
            </a>

            <button
              ref={botaoMenuRef}
              type="button"
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setAberto((valor) => !valor)}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3.5 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-200 ${
                    aberto ? 'top-[7px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-px w-6 bg-current transition-opacity duration-200 ${
                    aberto ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-200 ${
                    aberto ? 'top-[7px] -rotate-45' : 'top-[14px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {aberto ? (
        <div
          id="menu-mobile"
          className="campo-pastilha fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-[var(--color-pastilha-media)] lg:hidden"
        >
          <nav aria-label="Menu principal (celular)" className="secao pb-10 pt-4">
            <ul className="secao-interna flex flex-col">
              {siteConfig.menu.map((item) => (
                <li key={item.href} className="border-b border-[var(--color-pastilha-media)]">
                  <Link
                    href={destino(item.href)}
                    onClick={() => setAberto(false)}
                    className="flex min-h-16 items-center font-[family-name:var(--font-titulo)] text-[1.75rem]"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="secao-interna mt-8">
              <a
                href={linkWhatsapp(mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="botao botao-placa w-full"
                onClick={() => {
                  registrarCliqueWhatsapp('header-mobile', mensagem)
                  setAberto(false)
                }}
              >
                <IconeWhatsapp tamanho={20} />
                Falar no WhatsApp
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
