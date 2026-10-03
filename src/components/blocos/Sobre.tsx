import Image from 'next/image'
import { AcaoLink } from '@/components/AcaoLink'
import type { BlocoSobre } from '@/site/types'

/**
 * Bloco 2 — Sobre.
 *
 * Variantes:
 * - `perfis`: as pessoas que atendem, lado a lado — retrato em P&B dentro de
 *   um caixilho de bronze, nome, formação, registro e mini-biografia.
 * - `foto-lateral`: imagem do lugar ao lado do texto.
 * - `texto-centrado`: sem imagem.
 *
 * `destaques` e `registro` só aceitam dado confirmado pelo cliente. Neste site
 * (escritório fictício) os registros vêm marcados como fictícios.
 */
export function Sobre({ bloco }: { bloco: BlocoSobre }) {
  const { conteudo, variante } = bloco
  const { titulo, paragrafos, imagem, destaques, acao, pessoas, citacao } = conteudo

  const textos = (
    <div className="space-y-4 text-[1.125rem] leading-relaxed text-[var(--color-grafite-suave)]">
      {paragrafos.map((paragrafo) => (
        <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>
      ))}
    </div>
  )

  const listaDestaques =
    destaques && destaques.length > 0 ? (
      <dl className="mt-10 grid grid-cols-2 border-t border-[var(--color-rejunte)] sm:grid-cols-3">
        {destaques.map((destaque) => (
          <div key={destaque.rotulo} className="border-b border-[var(--color-rejunte)] py-5 pr-4">
            <dt className="sr-only">{destaque.rotulo}</dt>
            <dd>
              <span className="block font-[family-name:var(--font-titulo)] text-[2.5rem] leading-none text-[var(--color-bronze)]">
                {destaque.valor}
              </span>
              <span className="mt-2 block text-[0.9375rem] font-semibold text-[var(--color-grafite-suave)]">
                {destaque.rotulo}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    ) : null

  const botao = acao ? (
    <div className="mt-9">
      <AcaoLink acao={acao} className="botao botao-placa" origem="sobre" />
    </div>
  ) : null

  if (variante === 'perfis' && pessoas && pessoas.length > 0) {
    return (
      <section id={bloco.id} className="secao secao-ritmo bg-[var(--color-cal)]">
        <div className="secao-interna">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h2 className="titulo-secao lg:col-span-6">{titulo}</h2>
            <div className="lg:col-span-5 lg:col-start-8">{textos}</div>
          </div>

          <ul className="mt-14 grid gap-16 md:grid-cols-2 md:gap-10 lg:mt-16 lg:gap-16">
            {pessoas.map((pessoa, indice) => (
              <li
                key={pessoa.nome}
                className={`grid gap-7 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-7 md:grid-cols-1 xl:grid-cols-[minmax(0,15rem)_1fr] xl:gap-8 ${
                  indice % 2 === 1 ? 'md:mt-[var(--spacing-modulo)]' : ''
                }`}
              >
                <div className="caixilho mr-3 max-w-[18rem] self-start sm:mr-0 md:mr-3 md:max-w-[17rem] xl:mr-0">
                  <Image
                    src={pessoa.foto.src}
                    alt={pessoa.foto.alt}
                    width={pessoa.foto.largura}
                    height={pessoa.foto.altura}
                    loading="lazy"
                    sizes="(max-width: 640px) 18rem, 15rem"
                    className="aspect-[4/5] w-full bg-[var(--color-cal-escura)] object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-[2rem] leading-tight">{pessoa.nome}</h3>
                  <p className="mt-2 text-[1rem] font-semibold leading-snug text-[var(--color-pastilha)]">
                    {pessoa.formacao}
                  </p>
                  {pessoa.registro ? (
                    <p className="mt-1 text-[0.9375rem] text-[var(--color-grafite-suave)]">{pessoa.registro}</p>
                  ) : null}
                  <div className="mt-5 space-y-3 border-t border-[var(--color-rejunte)] pt-5 text-[1.0625rem] leading-relaxed text-[var(--color-grafite-suave)]">
                    {pessoa.bio.map((linha) => (
                      <p key={linha.slice(0, 40)}>{linha}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {citacao ? (
            <blockquote className="mt-16 border-t border-[var(--color-bronze)] pt-8 lg:mt-20">
              <p className="max-w-[52rem] font-[family-name:var(--font-titulo)] text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] leading-[1.12] text-[var(--color-pastilha)]">
                &ldquo;{citacao}&rdquo;
              </p>
            </blockquote>
          ) : null}

          {listaDestaques}
          {botao}
        </div>
      </section>
    )
  }

  if (variante === 'texto-centrado' || !imagem) {
    return (
      <section id={bloco.id} className="secao secao-ritmo">
        <div className="secao-interna max-w-3xl text-center [&_dl]:text-left">
          <h2 className="titulo-secao">{titulo}</h2>
          <div className="mt-6">{textos}</div>
          {listaDestaques}
          {botao}
        </div>
      </section>
    )
  }

  return (
    <section id={bloco.id} className="secao secao-ritmo">
      <div className="secao-interna grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="caixilho mr-3 lg:col-span-5 lg:mr-0">
          <Image
            src={imagem.src}
            alt={imagem.alt}
            width={imagem.largura}
            height={imagem.altura}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="titulo-secao">{titulo}</h2>
          <div className="mt-6">{textos}</div>
          {listaDestaques}
          {botao}
        </div>
      </div>
    </section>
  )
}
