import Image from 'next/image'
import { AcaoLink } from '@/components/AcaoLink'
import { Icone, IconeWhatsapp } from '@/components/Icone'
import type { BlocoServicos } from '@/site/types'

/**
 * Bloco 3 — Serviços (aqui: Áreas de atuação).
 *
 * `grid-cards`: uma parede de pastilhas — um painel único dividido por
 * rejunte de 1px, não cartões soltos. Cada célula começa com um campo de
 * pastilha no tom da área (com rejunte de 14px), como andares de um mesmo
 * prédio revestidos de cores diferentes.
 * `lista-detalhada`: uma linha por serviço, para descrições longas.
 *
 * O link de cada item leva ao formulário com o assunto já escolhido
 * (`acao.assunto`, ver `src/lib/assunto.ts`).
 */

const TOM_POR_ICONE: Record<string, string> = {
  civel: 'var(--color-area-civel)',
  trabalhista: 'var(--color-area-trabalhista)',
  familia: 'var(--color-area-familia)',
  consumidor: 'var(--color-area-consumidor)',
  previdenciario: 'var(--color-area-previdenciario)',
  empresarial: 'var(--color-area-empresarial)',
}

export function Servicos({ bloco }: { bloco: BlocoServicos }) {
  const { conteudo, variante } = bloco
  const { titulo, descricao, itens, acao, chamadaAcao } = conteudo

  return (
    <section
      id={bloco.id}
      className="secao pb-[var(--spacing-modulo)] pt-[calc(var(--spacing-modulo)*2.5)] lg:pt-[calc(var(--spacing-modulo)*3)]"
    >
      <div className="secao-interna">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 className="titulo-secao lg:col-span-5">{titulo}</h2>
          {descricao ? <p className="texto-apoio lg:col-span-6 lg:col-start-7">{descricao}</p> : null}
        </div>

        {variante === 'grid-cards' ? (
          <ul className="mt-12 grid gap-px border border-[var(--color-rejunte)] bg-[var(--color-rejunte)] sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {itens.map((item) => {
              const tom = (item.icone && TOM_POR_ICONE[item.icone]) ?? 'var(--color-pastilha)'
              return (
                <li
                  key={item.nome}
                  className="group relative grid grid-cols-[4.5rem_1fr] bg-[var(--color-cal)] transition-colors duration-300 hover:bg-[#f7f6f2] sm:flex sm:flex-col"
                >
                  {/* O tom da área é a própria pastilha: um campo inteiro da célula, com rejunte. */}
                  <span
                    aria-hidden="true"
                    className="pastilha-mosaico flex items-start justify-center pt-6 text-[var(--color-cal)] transition-[filter] duration-300 group-hover:brightness-110 sm:h-[calc(var(--spacing-modulo)*1.75)] sm:items-end sm:justify-start sm:px-7 sm:pb-4 sm:pt-0 lg:px-8"
                    style={{ backgroundColor: tom }}
                  >
                    {item.icone ? <Icone nome={item.icone} tamanho={30} /> : null}
                  </span>

                  <div className="flex flex-1 flex-col px-5 py-6 sm:px-7 sm:pb-7 sm:pt-6 lg:px-8 lg:pb-8">
                    {item.imagem ? (
                      <Image
                        src={item.imagem.src}
                        alt={item.imagem.alt}
                        width={item.imagem.largura}
                        height={item.imagem.altura}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="mb-5 aspect-[3/2] w-full object-cover"
                      />
                    ) : null}

                    <h3 className="text-[1.5rem] leading-tight sm:text-[1.625rem]">{item.nome}</h3>
                    <p className="mt-2 flex-1 text-[1.0625rem] leading-relaxed text-[var(--color-grafite-suave)]">
                      {item.descricao}
                    </p>

                    {item.acao ? (
                      <div className="mt-2 sm:mt-4">
                        <AcaoLink
                          acao={item.acao}
                          className="link-seta after:absolute after:inset-0 after:content-['']"
                          origem={`areas:${item.nome}`}
                          rotuloAcessivel={`sobre ${item.nome}`}
                          depois={<Icone nome="seta" tamanho={18} />}
                        />
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <ul className="mt-12 border-t border-[var(--color-rejunte)]">
            {itens.map((item) => (
              <li
                key={item.nome}
                className="grid gap-3 border-b border-[var(--color-rejunte)] py-7 md:grid-cols-12 md:gap-8"
              >
                <h3 className="text-[1.625rem] md:col-span-4">{item.nome}</h3>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="leading-relaxed text-[var(--color-grafite-suave)]">{item.descricao}</p>
                  {item.acao ? (
                    <div className="mt-3">
                      <AcaoLink
                        acao={item.acao}
                        className="link-seta"
                        origem={`areas:${item.nome}`}
                        rotuloAcessivel={`sobre ${item.nome}`}
                        depois={<Icone nome="seta" tamanho={18} />}
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}

        {acao ? (
          <div className="mt-10 flex flex-col gap-4 border-l border-[var(--color-bronze)] pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:mt-12">
            {chamadaAcao ? (
              <p className="max-w-[30rem] text-[1.125rem] leading-snug">{chamadaAcao}</p>
            ) : null}
            <AcaoLink
              acao={acao}
              className="botao botao-placa shrink-0"
              origem="areas"
              antes={acao.whatsapp ? <IconeWhatsapp tamanho={20} /> : null}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
