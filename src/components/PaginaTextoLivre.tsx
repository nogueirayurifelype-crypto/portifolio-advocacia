import type { PaginaDeTexto } from '@/site/types'

/**
 * Renderiza uma página de texto livre (Política de Privacidade, Termos de Uso,
 * avisos legais). Não usa o array de blocos — é um documento corrido.
 */
export function PaginaTextoLivre({ pagina }: { pagina: PaginaDeTexto }) {
  const data = new Date(`${pagina.atualizadoEm}T12:00:00`)
  const dataLegivel = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(data)

  return (
    <article className="secao py-14 lg:py-20">
      <div className="secao-interna max-w-3xl">
        <header>
          <h1 className="titulo-secao">{pagina.titulo}</h1>
          <p className="mt-3 text-sm font-semibold text-[var(--color-grafite-suave)]">
            Atualizado em <time dateTime={pagina.atualizadoEm}>{dataLegivel}</time>
          </p>
          {pagina.introducao ? (
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-grafite-suave)]">
              {pagina.introducao}
            </p>
          ) : null}
        </header>

        <div className="mt-12 flex flex-col gap-10">
          {pagina.secoes.map((secao) => (
            <section key={secao.titulo}>
              <h2 className="text-xl sm:text-2xl">{secao.titulo}</h2>

              {secao.paragrafos && secao.paragrafos.length > 0 ? (
                <div className="mt-4 space-y-4 leading-relaxed text-[var(--color-grafite-suave)]">
                  {secao.paragrafos.map((paragrafo) => (
                    <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>
                  ))}
                </div>
              ) : null}

              {secao.itens && secao.itens.length > 0 ? (
                <ul className="mt-4 space-y-3 leading-relaxed text-[var(--color-grafite-suave)]">
                  {secao.itens.map((item) => (
                    <li key={item.slice(0, 40)} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 bg-[var(--color-bronze)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
