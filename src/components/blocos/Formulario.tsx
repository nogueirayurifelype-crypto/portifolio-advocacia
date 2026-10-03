import Image from 'next/image'
import { AcaoLink } from '@/components/AcaoLink'
import { FormularioNativo } from '@/components/blocos/FormularioNativo'
import { FormularioWhatsapp } from '@/components/blocos/FormularioWhatsapp'
import { Icone, IconeWhatsapp } from '@/components/Icone'
import { siteConfig } from '@/site/config'
import type { BlocoFormulario } from '@/site/types'

/**
 * Bloco 9 — Formulário (plugável).
 *
 * Cinco fontes possíveis, escolhidas por cliente:
 * - `whatsapp`      → valida e abre o WhatsApp com a mensagem montada (sem backend).
 * - `nativo`        → formulário próprio, enviado por e-mail via Resend (exige Node.js).
 * - `google-forms`  → embed de um formulário que o cliente já usa.
 * - `microsoft-forms` → idem, para clientes no ecossistema Microsoft.
 * - `iframe`        → embed genérico (agenda online, CRM do cliente etc.).
 *
 * Com `localizacao`, a seção vira o "Contato" completo: coluna verde-pastilha
 * com WhatsApp, endereço, horário, e-mail e mapa estático; formulário ao lado.
 *
 * Variantes: `card` (formulário sobre placa de cal) e `inline` (no fluxo).
 */
export function Formulario({ bloco }: { bloco: BlocoFormulario }) {
  const { conteudo, variante } = bloco
  const { titulo, descricao, fonte, alternativaWhatsapp, localizacao } = conteudo
  const { endereco, horarios, email, telefone } = siteConfig

  const corpoFormulario = (() => {
    if (fonte.tipo === 'whatsapp') {
      return <FormularioWhatsapp fonte={fonte} />
    }
    if (fonte.tipo === 'nativo') {
      return <FormularioNativo fonte={fonte} />
    }

    const titulosEmbed = {
      'google-forms': 'Formulário de contato (Google Forms)',
      'microsoft-forms': 'Formulário de contato (Microsoft Forms)',
    } as const

    const tituloIframe = fonte.tipo === 'iframe' ? fonte.titulo : titulosEmbed[fonte.tipo]

    return (
      <iframe
        src={fonte.embedUrl}
        title={tituloIframe}
        loading="lazy"
        height={fonte.altura ?? 720}
        className="w-full border-0"
      />
    )
  })()

  const botaoWhatsapp = alternativaWhatsapp ? (
    <AcaoLink
      acao={{ rotulo: alternativaWhatsapp.rotulo, whatsapp: { mensagem: alternativaWhatsapp.mensagem } }}
      className="botao botao-placa w-full text-[1.125rem] sm:w-auto"
      origem="contato"
      antes={<IconeWhatsapp tamanho={22} />}
    />
  ) : null

  if (localizacao) {
    return (
      <section id={bloco.id} className="relative overflow-x-clip bg-[var(--color-cal-escura)]">
        <div className="secao">
          <div className="secao-interna grid lg:grid-cols-12">
            {/* Coluna verde: o pseudo-elemento estende o campo até a borda esquerda da tela. */}
            <div className="campo-pastilha relative -mx-5 px-5 py-[calc(var(--spacing-modulo)*1.5)] before:absolute before:inset-y-0 before:right-full before:w-[100vw] before:bg-[var(--color-pastilha)] sm:-mx-8 sm:px-8 lg:col-span-5 lg:mx-0 lg:py-[calc(var(--spacing-modulo)*2)] lg:pl-0 lg:pr-12">
              <h2 className="titulo-secao">{titulo}</h2>
              {descricao ? <p className="texto-apoio mt-5">{descricao}</p> : null}

              {botaoWhatsapp ? <div className="mt-8">{botaoWhatsapp}</div> : null}

              <dl className="mt-10 grid gap-5 border-t border-[var(--color-pastilha-media)] pt-8 text-[1.0625rem]">
                <div className="flex gap-4">
                  <dt className="mt-0.5 text-[var(--color-bronze-claro)]">
                    <Icone nome="local" tamanho={22} />
                    <span className="sr-only">Endereço</span>
                  </dt>
                  <dd>
                    <address className="not-italic leading-snug">
                      {endereco.logradouro}
                      <br />
                      {endereco.bairro}, {endereco.cidade}/{endereco.estado} · CEP {endereco.cep}
                    </address>
                    {endereco.nota ? (
                      <span className="mt-1 block text-[0.9375rem] text-[var(--color-sobre-pastilha-suave)]">
                        {endereco.nota}
                      </span>
                    ) : null}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="mt-0.5 text-[var(--color-bronze-claro)]">
                    <Icone nome="relogio" tamanho={22} />
                    <span className="sr-only">Horário de atendimento</span>
                  </dt>
                  <dd>
                    <ul className="space-y-0.5 leading-snug">
                      {horarios.map((item) => (
                        <li key={item.dia}>
                          {item.dia}: <span className="text-[var(--color-sobre-pastilha-suave)]">{item.horario}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {email ? (
                  <div className="flex gap-4">
                    <dt className="mt-0.5 text-[var(--color-bronze-claro)]">
                      <Icone nome="email" tamanho={22} />
                      <span className="sr-only">E-mail</span>
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${email}`}
                        className="underline decoration-[var(--color-bronze-claro)] decoration-1 underline-offset-4 hover:decoration-current"
                      >
                        {email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {telefone ? (
                  <div className="flex gap-4">
                    <dt className="mt-0.5 text-[var(--color-bronze-claro)]">
                      <Icone nome="telefone" tamanho={22} />
                      <span className="sr-only">Telefone</span>
                    </dt>
                    <dd>
                      <a
                        href={`tel:+55${telefone.replace(/\D/g, '')}`}
                        className="underline decoration-[var(--color-bronze-claro)] decoration-1 underline-offset-4 hover:decoration-current"
                      >
                        {telefone}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              <figure className="caixilho mr-3 mt-10">
                <a
                  href={localizacao.linkMapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden"
                >
                  <Image
                    src={localizacao.mapa.src}
                    alt={localizacao.mapa.alt}
                    width={localizacao.mapa.largura}
                    height={localizacao.mapa.altura}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 30rem"
                    className="aspect-[8/5] w-full object-cover transition-transform duration-700 ease-[var(--ease-saida)] group-hover:scale-[1.03]"
                  />
                  {/* Marcador desenhado por cima do mapa, no ponto central. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 flex h-9 w-9 items-center justify-center rounded-full rounded-br-none bg-[var(--color-pastilha)] ring-2 ring-[var(--color-cal)]"
                    style={{ transform: 'translate(-50%, -115%) rotate(45deg)' }}
                  >
                    <span className="h-3 w-3 rounded-full bg-[var(--color-bronze-claro)]" />
                  </span>
                  <span className="absolute bottom-0 right-0 bg-[var(--color-cal)]/90 px-2 py-1 text-[0.75rem] text-[var(--color-grafite)]">
                    {localizacao.creditoMapa}
                  </span>
                  <span className="sr-only"> (abre o mapa em nova aba)</span>
                </a>
              </figure>
            </div>

            <div className="py-[calc(var(--spacing-modulo)*1.5)] lg:col-span-7 lg:py-[calc(var(--spacing-modulo)*2)] lg:pl-12 xl:pl-16">
              <div
                className={
                  variante === 'card'
                    ? 'border border-[var(--color-rejunte)] bg-[var(--color-cal)] p-6 sm:p-9'
                    : ''
                }
              >
                {corpoFormulario}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={bloco.id} className="secao secao-ritmo bg-[var(--color-cal-escura)]">
      <div className="secao-interna grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="titulo-secao">{titulo}</h2>
          {descricao ? <p className="texto-apoio mt-5">{descricao}</p> : null}
          {botaoWhatsapp ? <div className="mt-8">{botaoWhatsapp}</div> : null}
        </div>

        <div
          className={`lg:col-span-7 ${
            variante === 'card' ? 'border border-[var(--color-rejunte)] bg-[var(--color-cal)] p-6 sm:p-9' : ''
          }`}
        >
          {corpoFormulario}
        </div>
      </div>
    </section>
  )
}
