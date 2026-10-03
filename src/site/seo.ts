import type { Metadata } from 'next'
import { siteConfig } from '@/site/config'
import type { Pagina } from '@/site/types'

/**
 * Converte o bloco de SEO do modelo de página em `Metadata` do Next.
 *
 * Toda página do site passa por aqui — é o que garante que nenhuma vá ao ar
 * sem title, description, canonical e Open Graph.
 */
export function metadataDaPagina(pagina: Pagina): Metadata {
  const { seo } = pagina
  const url = `${siteConfig.url}${seo.slug === '/' ? '' : seo.slug}`
  const imagem = seo.ogImage ?? '/imagens/og-valenca-moraes.jpg'

  return {
    title: seo.titulo,
    description: seo.metaDescription,
    alternates: {
      canonical: url,
    },
    robots: seo.naoIndexar || !siteConfig.indexavel
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url,
      siteName: siteConfig.nome,
      title: seo.titulo,
      description: seo.metaDescription,
      images: [{ url: imagem, alt: siteConfig.nome }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.titulo,
      description: seo.metaDescription,
      images: [imagem],
    },
  }
}
