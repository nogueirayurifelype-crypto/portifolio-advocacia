import Image from 'next/image'
import { AcaoLink } from '@/components/AcaoLink'
import type { BlocoCtaFinal } from '@/site/types'

/**
 * Bloco 10 — CTA final. Sempre o último bloco da página.
 *
 * Variantes: `faixa` (campo verde-pastilha em largura total) e `bloco-destaque`
 * (foto de fundo sob véu verde-pastilha, mais peso visual).
 */
export function CtaFinal({ bloco }: { bloco: BlocoCtaFinal }) {
  const { conteudo, variante } = bloco
  const { titulo, descricao, acaoPrimaria, acaoSecundaria, imagemFundo } = conteudo

  const acoes = (
    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <AcaoLink acao={acaoPrimaria} className="botao botao-placa" origem="cta-final" />
      {acaoSecundaria ? (
        <AcaoLink acao={acaoSecundaria} className="link-seta" origem="cta-final" />
      ) : null}
    </div>
  )

  if (variante === 'bloco-destaque' && imagemFundo) {
    return (
      <section id={bloco.id} className="secao secao-ritmo">
        <div className="secao-interna">
          <div className="relative overflow-hidden">
            <Image
              src={imagemFundo.src}
              alt={imagemFundo.alt}
              width={imagemFundo.largura}
              height={imagemFundo.altura}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 72rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[var(--color-pastilha-funda)]/80" />

            <div className="campo-pastilha relative bg-transparent px-6 py-16 text-center sm:px-12 lg:py-20">
              <h2 className="titulo-secao mx-auto max-w-2xl">{titulo}</h2>
              {descricao ? (
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-sobre-pastilha-suave)]">
                  {descricao}
                </p>
              ) : null}
              {acoes}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={bloco.id} className="campo-pastilha secao secao-ritmo">
      <div className="secao-interna">
        <div className="text-center">
          <h2 className="titulo-secao mx-auto max-w-2xl">{titulo}</h2>
          {descricao ? (
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-sobre-pastilha-suave)]">
              {descricao}
            </p>
          ) : null}
          {acoes}
        </div>
      </div>
    </section>
  )
}
