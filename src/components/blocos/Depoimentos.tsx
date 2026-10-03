import Image from 'next/image'
import type { BlocoDepoimentos } from '@/site/types'

/**
 * Bloco 5 — Depoimentos (aqui: Provas de confiança).
 *
 * ⚠️ REGRA DURA em cliente real: depoimento, nome, contexto e foto são sempre
 * do cliente real, com autorização. Nunca escrever um depoimento "plausível".
 * Neste site (escritório fictício de portfólio) os relatos e indicadores são
 * ilustrativos e o bloco diz isso visivelmente em `aviso`. Na advocacia, o
 * relato fala do atendimento, nunca do resultado de uma causa.
 *
 * Indicadores: quadro de saguão — rótulo, linha pontilhada e número, como o
 * diretório de salas na entrada de um prédio comercial.
 * Depoimentos: citações separadas por fio, sem cartões.
 *
 * Variantes: `cards` (grade) e `carrossel` (scroll-snap em CSS puro).
 */
export function Depoimentos({ bloco }: { bloco: BlocoDepoimentos }) {
  const { conteudo, variante } = bloco
  const { titulo, itens, linkAvaliacoes, indicadores, aviso } = conteudo

  const citacao = (item: BlocoDepoimentos['conteudo']['itens'][number]) => (
    <figure className="flex h-full flex-col">
      <span
        aria-hidden="true"
        className="font-[family-name:var(--font-titulo)] text-[4rem] leading-[0.6] text-[var(--color-bronze)]"
      >
        &ldquo;
      </span>
      <blockquote className="mt-3 flex-1">
        <p className="text-[1.1875rem] leading-relaxed text-[var(--color-grafite)]">{item.texto}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {item.foto ? (
          <Image
            src={item.foto.src}
            alt={item.foto.alt}
            width={item.foto.largura}
            height={item.foto.altura}
            loading="lazy"
            sizes="48px"
            className="h-12 w-12 object-cover"
          />
        ) : null}
        <span>
          <span className="block font-bold">{item.autor}</span>
          {item.contexto ? (
            <span className="block text-[0.9375rem] text-[var(--color-grafite-suave)]">{item.contexto}</span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  )

  return (
    <section id={bloco.id} className="secao secao-ritmo bg-[var(--color-cal-escura)]">
      <div className="secao-interna">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-8">
          <h2 className="titulo-secao lg:col-span-6">{titulo}</h2>

          <div className="lg:col-span-5 lg:col-start-8">
            {indicadores && indicadores.length > 0 ? (
              <dl className="border border-[var(--color-grafite)] bg-[var(--color-cal)] px-5 py-2 sm:px-6">
                {indicadores.map((indicador, indice) => (
                  <div
                    key={indicador.rotulo}
                    className={`flex items-baseline gap-3 py-3 ${
                      indice > 0 ? 'border-t border-[var(--color-rejunte)]' : ''
                    }`}
                  >
                    <dt className="text-[1.0625rem] font-semibold first-letter:uppercase">{indicador.rotulo}</dt>
                    <span
                      aria-hidden="true"
                      className="mb-[0.3rem] flex-1 border-b border-dotted border-[var(--color-grafite-suave)]"
                    />
                    <dd className="font-[family-name:var(--font-titulo)] text-[2rem] leading-none text-[var(--color-pastilha)]">
                      {indicador.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {aviso ? (
              <p className="mt-4 flex gap-3 text-[0.9375rem] leading-snug text-[var(--color-grafite-suave)]">
                <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 bg-[var(--color-bronze)]" />
                {aviso}
              </p>
            ) : null}
          </div>
        </div>

        {variante === 'carrossel' ? (
          <ul
            className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4"
            tabIndex={0}
            aria-label="Depoimentos — role para o lado para ver mais"
          >
            {itens.map((item) => (
              <li
                key={item.autor + item.texto.slice(0, 20)}
                className="w-[min(22rem,85vw)] shrink-0 snap-start border-t border-[var(--color-rejunte)] pt-6"
              >
                {citacao(item)}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-12 grid gap-10 border-t border-[var(--color-grafite)] pt-10 md:grid-cols-3 md:gap-0 lg:mt-16 lg:pt-12">
            {itens.map((item, indice) => (
              <li
                key={item.autor + item.texto.slice(0, 20)}
                className={`border-t border-[var(--color-rejunte)] pt-7 md:border-t-0 md:pt-0 ${
                  indice > 0 ? 'md:border-l md:pl-8 lg:pl-10' : ''
                } ${indice < itens.length - 1 ? 'md:pr-8 lg:pr-10' : ''} ${indice === 0 ? 'border-t-0 pt-0' : ''}`}
              >
                {citacao(item)}
              </li>
            ))}
          </ul>
        )}

        {linkAvaliacoes ? (
          <p className="mt-10">
            <a href={linkAvaliacoes.href} target="_blank" rel="noopener noreferrer" className="link-texto">
              {linkAvaliacoes.rotulo}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  )
}
