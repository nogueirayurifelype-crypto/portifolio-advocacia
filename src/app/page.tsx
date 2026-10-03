import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { paginaHome } from '@/site/paginas'
import { RenderizarBlocos } from '@/site/registry'
import { metadataDaPagina } from '@/site/seo'

/**
 * Home — montada 100% a partir do modelo de página em
 * `src/site/paginas/home.ts`. Nenhum conteúdo é escrito direto neste arquivo.
 */

export const metadata: Metadata = metadataDaPagina(paginaHome)

export default function Home() {
  return (
    <>
      <JsonLd pagina={paginaHome} />
      <RenderizarBlocos blocos={paginaHome.blocos} />
    </>
  )
}
