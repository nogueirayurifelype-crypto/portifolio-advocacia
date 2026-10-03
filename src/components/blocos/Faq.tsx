'use client'

import { useId, useState } from 'react'
import { registrarEvento, EVENTOS } from '@/lib/analytics'
import type { BlocoFaq } from '@/site/types'

/**
 * Bloco 7 — FAQ.
 *
 * Variantes:
 * - `acordeao`: botões com `aria-expanded`/`aria-controls` (padrão de
 *   acordeão do WAI-ARIA), várias perguntas podem ficar abertas. A resposta
 *   abre com transição de altura via grid-template-rows, sem medir DOM.
 * - `lista-aberta`: todas as respostas visíveis.
 *
 * O conteúdo deste bloco alimenta o JSON-LD de FAQPage automaticamente
 * (ver `src/components/seo/JsonLd.tsx`) — pergunta e resposta precisam fazer
 * sentido lidos fora do site, porque podem aparecer direto no Google.
 */
export function Faq({ bloco }: { bloco: BlocoFaq }) {
  const { conteudo, variante } = bloco
  const { titulo, itens } = conteudo
  const prefixo = useId()
  const [abertas, setAbertas] = useState<Set<number>>(() => new Set())

  const alternar = (indice: number, pergunta: string) => {
    setAbertas((atual) => {
      const proxima = new Set(atual)
      if (proxima.has(indice)) {
        proxima.delete(indice)
      } else {
        proxima.add(indice)
        registrarEvento(EVENTOS.abriuFaq, { pergunta })
      }
      return proxima
    })
  }

  return (
    <section id={bloco.id} className="secao secao-ritmo">
      <div className="secao-interna grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="titulo-secao lg:sticky lg:top-28">{titulo}</h2>
        </div>

        {variante === 'acordeao' ? (
          <div className="border-t border-[var(--color-grafite)] lg:col-span-7 lg:col-start-6">
            {itens.map((item, indice) => {
              const aberta = abertas.has(indice)
              const idBotao = `${prefixo}-p${indice}`
              const idResposta = `${prefixo}-r${indice}`
              return (
                <div key={item.pergunta} className="border-b border-[var(--color-rejunte)]">
                  <h3>
                    <button
                      id={idBotao}
                      type="button"
                      aria-expanded={aberta}
                      aria-controls={idResposta}
                      onClick={() => alternar(indice, item.pergunta)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left font-[family-name:var(--font-titulo)] text-[1.375rem] leading-snug transition-colors duration-200 hover:text-[var(--color-pastilha)] sm:text-[1.5rem]"
                    >
                      <span>{item.pergunta}</span>
                      <span
                        aria-hidden="true"
                        className="relative mt-[0.45rem] h-5 w-5 shrink-0 text-[var(--color-bronze)]"
                      >
                        <span className="absolute left-0 top-[9px] block h-px w-5 bg-current" />
                        <span
                          className={`absolute left-[9px] top-0 block h-5 w-px bg-current transition-transform duration-300 ease-[var(--ease-saida)] ${
                            aberta ? 'scale-y-0' : 'scale-y-100'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={idResposta}
                    role="region"
                    aria-labelledby={idBotao}
                    className={`grid transition-[grid-template-rows,visibility] duration-300 ease-[var(--ease-saida)] ${
                      aberta ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[40rem] pb-7 pr-10 text-[1.0625rem] leading-relaxed text-[var(--color-grafite-suave)]">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <dl className="border-t border-[var(--color-grafite)] lg:col-span-7 lg:col-start-6">
            {itens.map((item) => (
              <div key={item.pergunta} className="border-b border-[var(--color-rejunte)] py-6">
                <dt className="font-[family-name:var(--font-titulo)] text-[1.375rem] leading-snug sm:text-[1.5rem]">
                  {item.pergunta}
                </dt>
                <dd className="mt-3 max-w-[40rem] leading-relaxed text-[var(--color-grafite-suave)]">
                  {item.resposta}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
