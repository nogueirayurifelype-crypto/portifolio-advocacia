'use client'

import Link from 'next/link'
import { registrarCliqueWhatsapp, registrarEvento, EVENTOS } from '@/lib/analytics'
import { selecionarAssunto } from '@/lib/assunto'
import { linkWhatsapp } from '@/lib/whatsapp'
import type { Acao } from '@/site/types'

/**
 * Renderiza uma `Acao` do modelo de página e rastreia o clique no GA4.
 *
 * Toda conversão do site passa por aqui: se a ação aponta para o WhatsApp,
 * o clique vira `clique_whatsapp`; caso contrário, `clique_cta`. É assim que a
 * métrica de captação fica consistente entre todos os sites de cliente.
 */
export function AcaoLink({
  acao,
  className,
  origem,
  antes,
  depois,
  rotuloAcessivel,
}: {
  acao: Acao
  className?: string
  /** Nome do bloco de onde o clique partiu. Vira parâmetro do evento GA4. */
  origem: string
  /** Ícone (decorativo) antes do rótulo. */
  antes?: React.ReactNode
  /** Ícone (decorativo) depois do rótulo. */
  depois?: React.ReactNode
  /** Complemento só para leitor de tela, quando o rótulo visível se repete (ex.: "Saber mais"). */
  rotuloAcessivel?: string
}) {
  const conteudo = (
    <>
      {antes}
      <span>
        {acao.rotulo}
        {rotuloAcessivel ? <span className="sr-only"> {rotuloAcessivel}</span> : null}
      </span>
      {depois}
    </>
  )

  if (acao.whatsapp) {
    const mensagem = acao.whatsapp.mensagem

    return (
      <a
        href={linkWhatsapp(mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => registrarCliqueWhatsapp(origem, mensagem)}
      >
        {conteudo}
      </a>
    )
  }

  const href = acao.href ?? '#'
  const aoClicar = () => {
    registrarEvento(acao.eventoGa4 ?? EVENTOS.cliqueCta, {
      origem,
      rotulo: acao.rotulo,
      destino: href,
    })
    if (acao.assunto) {
      selecionarAssunto(acao.assunto)
    }
  }

  const externo = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')

  if (externo) {
    return (
      <a
        href={href}
        className={className}
        onClick={aoClicar}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {conteudo}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={aoClicar}>
      {conteudo}
    </Link>
  )
}
