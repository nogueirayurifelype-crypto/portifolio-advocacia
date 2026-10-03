import type { Metadata } from 'next'
import { PaginaTextoLivre } from '@/components/PaginaTextoLivre'
import { JsonLd } from '@/components/seo/JsonLd'
import { paginaPoliticaDePrivacidade } from '@/site/paginas'
import { metadataDaPagina } from '@/site/seo'

export const metadata: Metadata = metadataDaPagina(paginaPoliticaDePrivacidade)

export default function PoliticaDePrivacidade() {
  return (
    <>
      <JsonLd pagina={paginaPoliticaDePrivacidade} />
      <PaginaTextoLivre pagina={paginaPoliticaDePrivacidade} />
    </>
  )
}
