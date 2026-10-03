import Image from 'next/image'
import { AcaoLink } from '@/components/AcaoLink'
import { HeroAssuntos } from '@/components/blocos/HeroAssuntos'
import { Icone, IconeWhatsapp } from '@/components/Icone'
import type { BlocoHero } from '@/site/types'

/**
 * Bloco 1 — Hero.
 *
 * Campo verde-pastilha contínuo com o header. À esquerda, o título e a ação
 * principal (a "placa" clara, única superfície invertida da tela); à direita,
 * a foto do atendimento, inteira, diante de uma parede de cobogó que desliza
 * de leve com a rolagem (ver `.parede-cobogo` em globals.css).
 *
 * Variantes:
 * - `foto-ambiente`: com a foto diante da parede de cobogó.
 * - `texto-first`: sem foto, título centralizado.
 */
export function Hero({ bloco }: { bloco: BlocoHero }) {
  const { conteudo, variante } = bloco
  const { titulo, subtitulo, acaoPrimaria, acaoSecundaria, imagem, selos, assuntosRapidos } =
    conteudo

  const secundaria = acaoSecundaria ? (
    <AcaoLink
      acao={acaoSecundaria}
      className="link-seta"
      origem="hero"
      depois={<Icone nome="seta-baixo" tamanho={18} />}
    />
  ) : null

  // A secundária fica ao lado da placa (empilhada no celular).
  const acoes =
    assuntosRapidos && acaoPrimaria.whatsapp ? (
      <HeroAssuntos
        rotulo={assuntosRapidos.rotulo}
        opcoes={assuntosRapidos.opcoes}
        rotuloBotao={acaoPrimaria.rotulo}
        mensagemPadrao={acaoPrimaria.whatsapp.mensagem}
      >
        {secundaria}
      </HeroAssuntos>
    ) : (
      <div className="flex flex-col gap-x-7 gap-y-3 sm:flex-row sm:items-center">
        <AcaoLink
          acao={acaoPrimaria}
          className="botao botao-placa"
          origem="hero"
          antes={acaoPrimaria.whatsapp ? <IconeWhatsapp tamanho={20} /> : null}
        />
        {secundaria}
      </div>
    )

  const textos = (
    <div className={variante === 'texto-first' ? 'mx-auto max-w-3xl text-center' : 'max-w-[40rem]'}>
      <h1 className="text-[clamp(2.5rem,1.6rem+4.2vw,4.75rem)] leading-[1.02] tracking-[-0.015em]">
        {titulo}
      </h1>

      <p className="mt-6 max-w-[34rem] text-[1.1875rem] leading-relaxed text-[var(--color-sobre-pastilha-suave)] lg:text-[1.3125rem]">
        {subtitulo}
      </p>

      <div className="mt-9">{acoes}</div>

      {selos && selos.length > 0 ? (
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-pastilha-media)] pt-5 text-[0.9375rem] text-[var(--color-sobre-pastilha-suave)]">
          {selos.map((selo) => (
            <li key={selo}>{selo}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )

  if (variante === 'texto-first' || !imagem) {
    return (
      <section id={bloco.id} className="campo-pastilha secao pb-20 pt-14 lg:pb-28 lg:pt-20">
        <div className="secao-interna">{textos}</div>
      </section>
    )
  }

  return (
    <section id={bloco.id} className="campo-pastilha secao relative z-10 overflow-x-clip pt-10 sm:pt-14 lg:pt-16">
      <div className="secao-interna grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pb-[calc(var(--spacing-modulo)*2)]">{textos}</div>

        {/*
          A tela avança um módulo sobre a seção seguinte: a margem negativa
          puxa o painel para baixo da borda do campo verde.
          Sem `priority`: o LCP é o título (texto). Pré-carregar a foto fazia
          ela disputar banda com a fonte do título no celular, onde a foto
          fica abaixo da dobra. `eager` mantém o carregamento imediato.
        */}
        <div className="relative -mb-[var(--spacing-modulo)] lg:col-span-5 lg:col-start-8 lg:self-stretch lg:pt-3">
          {/*
            Parede de cobogó atrás da foto, deslocada para baixo e para a
            direita: a foto fica inteira, "pendurada" na frente da parede.
          */}
          <div
            aria-hidden="true"
            className="absolute bottom-[calc(var(--spacing-modulo)*-0.5)] left-[calc(var(--spacing-modulo)*0.5)] right-0 top-[calc(var(--spacing-modulo)*0.5+0.75rem)] overflow-hidden lg:-right-[var(--spacing-modulo)] lg:bottom-[calc(var(--spacing-modulo)*-1)] lg:left-[var(--spacing-modulo)] lg:top-[calc(var(--spacing-modulo)+0.75rem)]"
          >
            <div className="parede-cobogo parede-deslizante absolute -inset-[var(--spacing-modulo)]" />
          </div>

          <div className="relative mr-[calc(var(--spacing-modulo)*0.5)] aspect-[4/3] overflow-hidden bg-[var(--color-pastilha-media)] sm:aspect-[16/11] lg:mr-0 lg:aspect-auto lg:h-full lg:min-h-[34rem]">
            <Image
              src={imagem.src}
              alt={imagem.alt}
              width={imagem.largura}
              height={imagem.altura}
              loading="eager"
              decoding="async"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
