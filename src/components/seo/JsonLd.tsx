import { siteConfig } from '@/site/config'
import type { Bloco, Pagina } from '@/site/types'

/**
 * Dados estruturados (schema.org) em JSON-LD.
 *
 * Gerado a partir do mesmo modelo de página que renderiza os blocos — o FAQ do
 * site e o FAQPage do Google nunca saem de sincronia porque vêm da mesma fonte.
 */

function localBusiness() {
  const { endereco, horarios } = siteConfig

  return {
    '@type': siteConfig.schemaTipo,
    '@id': `${siteConfig.url}/#negocio`,
    name: siteConfig.nome,
    description: siteConfig.descricaoCurta,
    url: siteConfig.url,
    telephone: siteConfig.telefone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.estado,
      postalCode: endereco.cep,
      addressCountry: endereco.pais,
    },
    areaServed: `${endereco.cidade} — ${endereco.estado}`,
    openingHours: horarios
      .filter((h) => !/fechado/i.test(h.horario))
      .map((h) => `${h.dia}: ${h.horario}`),
    sameAs: siteConfig.redes?.map((rede) => rede.href) ?? [],
  }
}

function faqPage(blocos: Bloco[]) {
  const faq = blocos.find((bloco) => bloco.tipo === 'faq')
  if (!faq || faq.conteudo.itens.length === 0) {
    return null
  }

  return {
    '@type': 'FAQPage',
    mainEntity: faq.conteudo.itens.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  }
}

function servicos(blocos: Bloco[]) {
  const bloco = blocos.find((b) => b.tipo === 'servicos')
  if (!bloco || bloco.conteudo.itens.length === 0) {
    return null
  }

  return {
    '@type': 'OfferCatalog',
    name: bloco.conteudo.titulo,
    itemListElement: bloco.conteudo.itens.map((item, indice) => ({
      '@type': 'Offer',
      position: indice + 1,
      itemOffered: {
        '@type': 'Service',
        name: item.nome,
        description: item.descricao,
      },
    })),
  }
}

export function JsonLd({ pagina }: { pagina: Pagina }) {
  const grafo: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#site`,
      url: siteConfig.url,
      name: siteConfig.nome,
      inLanguage: siteConfig.locale,
      publisher: { '@id': `${siteConfig.url}/#negocio` },
    },
    {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${pagina.seo.slug}#pagina`,
      url: `${siteConfig.url}${pagina.seo.slug}`,
      name: pagina.seo.titulo,
      description: pagina.seo.metaDescription,
      isPartOf: { '@id': `${siteConfig.url}/#site` },
      inLanguage: siteConfig.locale,
    },
    localBusiness(),
  ]

  if (pagina.tipo === 'blocos') {
    const faq = faqPage(pagina.blocos)
    if (faq) {
      grafo.push(faq)
    }

    const catalogo = servicos(pagina.blocos)
    if (catalogo) {
      grafo.push(catalogo)
    }
  }

  const json = { '@context': 'https://schema.org', '@graph': grafo }

  return (
    <script
      type="application/ld+json"
      // O conteúdo vem do próprio modelo de página, não de entrada de usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
