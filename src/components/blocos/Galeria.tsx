import Image from 'next/image'
import { AcaoLink } from '@/components/AcaoLink'
import type { BlocoGaleria } from '@/site/types'

/**
 * Bloco 6 — Galeria.
 *
 * Variantes: `grid-uniforme` (todas as células do mesmo tamanho) e `mosaico`
 * (itens marcados com `destaque: true` ocupam célula dupla).
 *
 * O peso deste bloco (central ou secundário) depende do negócio do cliente —
 * decidido no brief de cada projeto.
 *
 * Quando a foto documenta um produto/imóvel real que o visitante vai conferir
 * pessoalmente, ela é sempre foto real — nunca substituir por imagem gerada.
 */
export function Galeria({ bloco }: { bloco: BlocoGaleria }) {
  const { conteudo, variante } = bloco
  const { titulo, descricao, itens, acao } = conteudo

  return (
    <section id={bloco.id} className="secao py-16 lg:py-24">
      <div className="secao-interna">
        <div className="max-w-2xl">
          <h2 className="titulo-secao">{titulo}</h2>
          {descricao ? (
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-grafite-suave)]">
              {descricao}
            </p>
          ) : null}
        </div>

        <ul
          className={`mt-12 grid gap-4 sm:grid-cols-2 ${
            variante === 'mosaico' ? 'lg:auto-rows-[15rem] lg:grid-cols-3' : 'lg:grid-cols-3'
          }`}
        >
          {itens.map((item) => {
            const destacado = variante === 'mosaico' && item.destaque

            return (
              <li
                key={item.imagem.src}
                className={`group relative overflow-hidden ${
                  destacado ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <Image
                  src={item.imagem.src}
                  alt={item.imagem.alt}
                  width={item.imagem.largura}
                  height={item.imagem.altura}
                  loading="lazy"
                  sizes={
                    destacado
                      ? '(max-width: 1024px) 100vw, 66vw'
                      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  }
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                    variante === 'mosaico' ? 'h-full min-h-[15rem]' : 'aspect-[4/3] h-auto'
                  }`}
                />

                {item.titulo || item.legenda ? (
                  <div className="absolute inset-x-0 bottom-0 bg-black/55 p-5 text-white">
                    {item.titulo ? <p className="font-bold">{item.titulo}</p> : null}
                    {item.legenda ? (
                      <p className="mt-1 text-sm text-white/85">{item.legenda}</p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>

        {acao ? (
          <div className="mt-10">
            <AcaoLink acao={acao} className="botao botao-contorno" origem="galeria" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
