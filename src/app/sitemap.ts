import type { MetadataRoute } from 'next'
import { siteConfig } from '@/site/config'
import { paginas } from '@/site/paginas'

/**
 * sitemap.xml gerado a partir do registro de páginas — páginas marcadas com
 * `naoIndexar` ficam de fora. Adicionar página nova ao registro é suficiente;
 * não existe lista de URLs duplicada em lugar nenhum.
 */
/** Garante geração estática também no modo `npm run build:static`. */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  return paginas
    .filter((pagina) => !pagina.seo.naoIndexar)
    .map((pagina) => ({
      url: `${siteConfig.url}${pagina.seo.slug === '/' ? '' : pagina.seo.slug}`,
      lastModified: agora,
      changeFrequency: pagina.seo.slug === '/' ? ('monthly' as const) : ('yearly' as const),
      priority: pagina.seo.prioridadeSitemap ?? 0.7,
    }))
}
