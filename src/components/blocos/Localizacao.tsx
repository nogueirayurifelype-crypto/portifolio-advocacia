'use client'

import { AcaoLink } from '@/components/AcaoLink'
import { registrarEvento, EVENTOS } from '@/lib/analytics'
import type { BlocoLocalizacao } from '@/site/types'

/**
 * Bloco 8 — Localização.
 *
 * Variantes: `mapa-lateral` (mapa ao lado dos dados) e `mapa-largo` (mapa em
 * faixa cheia abaixo dos dados).
 *
 * O iframe do Google Maps usa `loading="lazy"`: ele só carrega quando entra no
 * viewport, para não pesar no LCP da página.
 */
export function Localizacao({ bloco }: { bloco: BlocoLocalizacao }) {
  const { conteudo, variante } = bloco
  const { titulo, endereco, mapaEmbedUrl, linkComoChegar, horarios, referencias, acao } =
    conteudo

  const mapa = (
    <div
      className={`overflow-hidden ${
        variante === 'mapa-largo' ? 'mt-10 h-[22rem]' : 'h-full min-h-[22rem]'
      }`}
    >
      <iframe
        src={mapaEmbedUrl}
        title={`Mapa — ${endereco.logradouro}, ${endereco.cidade}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    </div>
  )

  const dados = (
    <div>
      <h2 className="titulo-secao">{titulo}</h2>

      <address className="mt-6 text-lg not-italic leading-relaxed">
        {endereco.logradouro}
        {endereco.complemento ? (
          <>
            <br />
            {endereco.complemento}
          </>
        ) : null}
        <br />
        {endereco.bairro} — {endereco.cidade}/{endereco.estado}
        <br />
        CEP {endereco.cep}
      </address>

      {referencias && referencias.length > 0 ? (
        <ul className="mt-5 space-y-2 text-[var(--color-grafite-suave)]">
          {referencias.map((referencia) => (
            <li key={referencia} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-pastilha)]" />
              {referencia}
            </li>
          ))}
        </ul>
      ) : null}

      {horarios && horarios.length > 0 ? (
        <dl className="mt-7 max-w-sm space-y-2 bg-[var(--color-cal-escura)] p-6">
          {horarios.map((item) => (
            <div key={item.dia} className="flex justify-between gap-4 text-sm">
              <dt className="font-semibold">{item.dia}</dt>
              <dd className="text-[var(--color-grafite-suave)]">{item.horario}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {acao ? <AcaoLink acao={acao} className="botao botao-placa" origem="localizacao" /> : null}

        {linkComoChegar ? (
          <a
            href={linkComoChegar}
            target="_blank"
            rel="noopener noreferrer"
            className="botao botao-contorno"
            onClick={() =>
              registrarEvento(EVENTOS.cliqueComoChegar, { origem: 'localizacao' })
            }
          >
            Como chegar
          </a>
        ) : null}
      </div>
    </div>
  )

  if (variante === 'mapa-largo') {
    return (
      <section id={bloco.id} className="secao bg-[var(--color-cal-escura)] py-16 lg:py-24">
        <div className="secao-interna [&_dl]:bg-[var(--color-cal)]">
          {dados}
          {mapa}
        </div>
      </section>
    )
  }

  return (
    <section id={bloco.id} className="secao bg-[var(--color-cal-escura)] py-16 lg:py-24">
      <div className="secao-interna grid gap-10 lg:grid-cols-2 lg:gap-16 [&_dl]:bg-[var(--color-cal)]">
        {dados}
        {mapa}
      </div>
    </section>
  )
}
