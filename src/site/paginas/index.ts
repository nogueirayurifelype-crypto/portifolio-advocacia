import type { Pagina } from '@/site/types'
import { paginaHome } from '@/site/paginas/home'
import { paginaPoliticaDePrivacidade } from '@/site/paginas/politica-de-privacidade'
import { paginaTermosDeUso } from '@/site/paginas/termos-de-uso'

/**
 * Todas as páginas do site, em um só lugar.
 *
 * Quem consome esta lista:
 * - `src/app/sitemap.ts` — gera o sitemap.xml a partir dos slugs.
 * - cada `page.tsx` — pega sua página pelo slug e monta metadata + blocos.
 *
 * Página nova = um arquivo em `src/site/paginas/`, uma entrada aqui e um
 * `page.tsx` correspondente em `src/app/`.
 */
export const paginas: Pagina[] = [paginaHome, paginaPoliticaDePrivacidade, paginaTermosDeUso]

export function buscarPagina(slug: string): Pagina {
  const pagina = paginas.find((item) => item.seo.slug === slug)

  if (!pagina) {
    throw new Error(
      `Nenhuma página registrada para o slug "${slug}". Adicione-a em src/site/paginas/index.ts.`,
    )
  }

  return pagina
}

export { paginaHome, paginaPoliticaDePrivacidade, paginaTermosDeUso }
