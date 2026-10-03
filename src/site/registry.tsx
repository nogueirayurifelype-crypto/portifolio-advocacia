import { CtaFinal } from '@/components/blocos/CtaFinal'
import { Depoimentos } from '@/components/blocos/Depoimentos'
import { Diferenciais } from '@/components/blocos/Diferenciais'
import { Faq } from '@/components/blocos/Faq'
import { Formulario } from '@/components/blocos/Formulario'
import { Galeria } from '@/components/blocos/Galeria'
import { Hero } from '@/components/blocos/Hero'
import { Localizacao } from '@/components/blocos/Localizacao'
import { Servicos } from '@/components/blocos/Servicos'
import { Sobre } from '@/components/blocos/Sobre'
import type { Bloco } from '@/site/types'

/**
 * Renderizador do array de blocos.
 *
 * O `switch` é exaustivo: adicionar um tipo em `Bloco` sem tratar aqui quebra
 * o `tsc --noEmit` na linha do `never` abaixo. É de propósito — é o que impede
 * um bloco novo de ser esquecido silenciosamente no site de um cliente.
 */
export function RenderizarBloco({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case 'hero':
      return <Hero bloco={bloco} />
    case 'sobre':
      return <Sobre bloco={bloco} />
    case 'servicos':
      return <Servicos bloco={bloco} />
    case 'diferenciais':
      return <Diferenciais bloco={bloco} />
    case 'depoimentos':
      return <Depoimentos bloco={bloco} />
    case 'galeria':
      return <Galeria bloco={bloco} />
    case 'faq':
      return <Faq bloco={bloco} />
    case 'localizacao':
      return <Localizacao bloco={bloco} />
    case 'formulario':
      return <Formulario bloco={bloco} />
    case 'cta-final':
      return <CtaFinal bloco={bloco} />
    default: {
      const naoTratado: never = bloco
      throw new Error(`Bloco sem componente registrado: ${JSON.stringify(naoTratado)}`)
    }
  }
}

export function RenderizarBlocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <>
      {blocos.map((bloco, indice) => (
        <RenderizarBloco key={`${bloco.tipo}-${bloco.id ?? indice}`} bloco={bloco} />
      ))}
    </>
  )
}
