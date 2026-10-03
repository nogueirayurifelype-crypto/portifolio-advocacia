import { AcaoLink } from '@/components/AcaoLink'
import { EtapasReveladas } from '@/components/blocos/EtapasReveladas'
import { IconeWhatsapp } from '@/components/Icone'
import type { BlocoDiferenciais } from '@/site/types'

/**
 * Bloco 4 — Diferenciais.
 *
 * Variantes:
 * - `linha-do-tempo`: etapas numeradas sobre o campo verde-pastilha, ligadas
 *   por um fio de bronze. As etapas ainda não vistas aparecem "apagadas"
 *   (número só em contorno) e acendem ao entrar na tela.
 * - `icones-grid`: lista de compromissos em duas colunas, separadas por fio.
 * - `numeros-destaque`: o número é o elemento principal. Só com dado real.
 */
export function Diferenciais({ bloco }: { bloco: BlocoDiferenciais }) {
  const { conteudo, variante } = bloco
  const { titulo, descricao, itens, acao } = conteudo

  if (variante === 'linha-do-tempo') {
    return (
      <section id={bloco.id} className="campo-pastilha secao secao-ritmo">
        <div className="secao-interna">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h2 className="titulo-secao lg:col-span-6">{titulo}</h2>
            {descricao ? <p className="texto-apoio lg:col-span-5 lg:col-start-8">{descricao}</p> : null}
          </div>

          <EtapasReveladas>
            <ol className="relative mt-14 grid gap-0 lg:mt-16 lg:grid-cols-4 lg:gap-8">
              {/* Fio de bronze que liga as etapas: vertical no celular, horizontal no desktop. */}
              <span
                aria-hidden="true"
                className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-[var(--color-bronze-claro)]/60 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[2.6rem] lg:h-px lg:w-auto"
              />
              {itens.map((item, indice) => (
                <li
                  key={item.titulo}
                  data-etapa
                  className="group relative grid grid-cols-[3rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="etapa-numero relative block bg-[var(--color-pastilha)] font-[family-name:var(--font-titulo)] text-[3.25rem] leading-none text-[var(--color-bronze-claro)] [-webkit-text-stroke:1px_var(--color-bronze-claro)] group-data-[acesa=nao]:text-transparent lg:inline-block lg:pr-4 lg:text-[5.5rem]"
                  >
                    {item.numero ?? indice + 1}
                  </span>
                  <div className="lg:mt-6">
                    <h3 className="text-[1.625rem] lg:text-[1.75rem]">
                      <span className="sr-only">Etapa {item.numero ?? indice + 1}: </span>
                      {item.titulo}
                    </h3>
                    <p className="mt-2 text-[1.0625rem] leading-relaxed text-[var(--color-sobre-pastilha-suave)]">
                      {item.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </EtapasReveladas>

          {acao ? (
            <div className="mt-14 border-t border-[var(--color-pastilha-media)] pt-8 lg:mt-16">
              <AcaoLink
                acao={acao}
                className="botao botao-placa w-full sm:w-auto"
                origem="atendimento"
                antes={acao.whatsapp ? <IconeWhatsapp tamanho={20} /> : null}
              />
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section id={bloco.id} className="secao secao-ritmo">
      <div className="secao-interna">
        <div className="max-w-2xl">
          <h2 className="titulo-secao">{titulo}</h2>
          {descricao ? <p className="texto-apoio mt-5">{descricao}</p> : null}
        </div>

        <ul
          className={`mt-12 grid border-t border-[var(--color-rejunte)] ${
            variante === 'numeros-destaque' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 md:gap-x-12'
          }`}
        >
          {itens.map((item) => (
            <li key={item.titulo} className="border-b border-[var(--color-rejunte)] py-7 pr-4">
              {variante === 'numeros-destaque' && item.numero ? (
                <p className="font-[family-name:var(--font-titulo)] text-[3rem] leading-none text-[var(--color-bronze)]">
                  {item.numero}
                </p>
              ) : null}
              <h3 className={`text-[1.5rem] ${variante === 'numeros-destaque' ? 'mt-4' : ''}`}>{item.titulo}</h3>
              <p className="mt-2 leading-relaxed text-[var(--color-grafite-suave)]">{item.descricao}</p>
            </li>
          ))}
        </ul>

        {acao ? (
          <div className="mt-10">
            <AcaoLink acao={acao} className="botao botao-placa" origem="diferenciais" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
