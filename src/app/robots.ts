import type { MetadataRoute } from 'next'
import { siteConfig } from '@/site/config'

/**
 * robots.txt. Site institucional pequeno: tudo liberado, menos as rotas de API,
 * que não têm nada para indexar.
 */
/** Garante geração estática também no modo `npm run build:static`. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // Portfólio: mantém o rastreio liberado de propósito, para o Google conseguir ler o
  // `noindex` (um Disallow total impediria isso). Sem sitemap e sem `host`.
  if (!siteConfig.indexavel) {
    return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }] }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
