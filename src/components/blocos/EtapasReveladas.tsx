'use client'

import { useEffect, useRef } from 'react'

/**
 * Acende as etapas da linha do tempo conforme entram na tela.
 *
 * Sem JavaScript, ou com `prefers-reduced-motion`, todas ficam acesas: o
 * estado "apagado" só existe depois que este componente monta, e só para as
 * etapas que ainda estão abaixo da dobra.
 */
export function EtapasReveladas({ children }: { children: React.ReactNode }) {
  const raizRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raiz = raizRef.current
    if (!raiz || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const etapas = [...raiz.querySelectorAll<HTMLElement>('[data-etapa]')]
    const alturaTela = window.innerHeight
    for (const etapa of etapas) {
      if (etapa.getBoundingClientRect().top > alturaTela * 0.85) {
        etapa.dataset.acesa = 'nao'
      }
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            const alvo = entrada.target as HTMLElement
            alvo.dataset.acesa = 'sim'
            observador.unobserve(alvo)
          }
        }
      },
      { rootMargin: '0px 0px -25% 0px' },
    )

    etapas.filter((etapa) => etapa.dataset.acesa === 'nao').forEach((etapa) => observador.observe(etapa))
    return () => observador.disconnect()
  }, [])

  return <div ref={raizRef}>{children}</div>
}
