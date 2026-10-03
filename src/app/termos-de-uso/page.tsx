import type { Metadata } from 'next'
import { PaginaTextoLivre } from '@/components/PaginaTextoLivre'
import { JsonLd } from '@/components/seo/JsonLd'
import { paginaTermosDeUso } from '@/site/paginas'
import { metadataDaPagina } from '@/site/seo'

export const metadata: Metadata = metadataDaPagina(paginaTermosDeUso)

export default function TermosDeUso() {
  return (
    <>
      <JsonLd pagina={paginaTermosDeUso} />
      <PaginaTextoLivre pagina={paginaTermosDeUso} />
    </>
  )
}
