import Link from 'next/link'
import { siteConfig } from '@/site/config'
import { numeroFormatado } from '@/lib/whatsapp'

/**
 * Rodapé — estrutura fixa, existe em todas as páginas, fora do array de blocos.
 *
 * Server component de propósito: nada aqui precisa de JavaScript no cliente.
 * O aviso de demonstração (`rodape.aviso`) fica no topo, em destaque, porque
 * o briefing exige que ele seja visível — não uma linha miúda no fim.
 * Acima do rodapé, uma faixa de parede de cobogó (`.parede-cobogo`) retoma a parede do Hero.
 */
export function Footer() {
  const { endereco, horarios, rodape, redes, menu } = siteConfig
  const ano = new Date().getFullYear()
  const ancora = (href: string) => (href.startsWith('#') ? `/${href}` : href)

  return (
    <>
      {/* A parede de cobogó do Hero volta aqui, estática, antes do rodapé. */}
      <div
        aria-hidden="true"
        className="parede-cobogo h-[var(--spacing-modulo)] lg:h-[calc(var(--spacing-modulo)*2)]"
      />
      <footer className="campo-pastilha secao bg-[var(--color-pastilha-funda)] pb-28 pt-12 lg:pb-12 lg:pt-14">
        <div className="secao-interna">
          {rodape.aviso ? (
            <p className="flex items-start gap-3 border border-[var(--color-bronze-claro)] px-4 py-3 text-[1rem] font-semibold leading-snug text-[var(--color-cal)] sm:items-center">
              <span
                aria-hidden="true"
                className="mt-[0.4rem] h-2 w-2 shrink-0 bg-[var(--color-bronze-claro)] sm:mt-0"
              />
              {rodape.aviso}
            </p>
          ) : null}

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="font-[family-name:var(--font-titulo)] text-[2rem] leading-none"
              >
                {siteConfig.nomeCurto ?? siteConfig.nome}
              </Link>
              <p className="mt-4 max-w-[22rem] text-[0.9375rem] leading-relaxed text-[var(--color-sobre-pastilha-suave)]">
                {siteConfig.descricaoCurta}
              </p>
            </div>

            <nav aria-label="Seções da página" className="lg:col-span-2 lg:col-start-6">
              <h2 className="font-[family-name:var(--font-texto)] text-[0.9375rem] font-bold text-[var(--color-bronze-claro)]">
                Navegação
              </h2>
              <ul className="mt-4 space-y-2 text-[1rem]">
                {menu.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={ancora(item.href)}
                      className="hover:text-[var(--color-bronze-claro)]"
                    >
                      {item.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h2 className="font-[family-name:var(--font-texto)] text-[0.9375rem] font-bold text-[var(--color-bronze-claro)]">
                Contato
              </h2>
              <ul className="mt-4 space-y-2 text-[1rem]">
                <li>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.numero}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-bronze-claro)]"
                  >
                    WhatsApp {numeroFormatado()}
                  </a>
                </li>
                {siteConfig.email ? (
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="break-all hover:text-[var(--color-bronze-claro)]"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                ) : null}
                {redes?.map((rede) => (
                  <li key={rede.href}>
                    <a
                      href={rede.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-bronze-claro)]"
                    >
                      {rede.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
              <address className="mt-5 text-[0.9375rem] not-italic leading-relaxed text-[var(--color-sobre-pastilha-suave)]">
                {endereco.logradouro}
                <br />
                {endereco.bairro}, {endereco.cidade}/{endereco.estado}
                <br />
                {horarios
                  .filter((h) => !/fechado/i.test(h.horario))
                  .map((h) => `${h.dia}, ${h.horario}`)
                  .join(' · ')}
              </address>
            </div>

            <div className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-texto)] text-[0.9375rem] font-bold text-[var(--color-bronze-claro)]">
                Institucional
              </h2>
              <ul className="mt-4 space-y-2 text-[1rem]">
                {rodape.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[var(--color-bronze-claro)]">
                      {link.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 space-y-3 border-t border-[var(--color-pastilha-media)] pt-6 text-[0.875rem] leading-relaxed text-[var(--color-sobre-pastilha-suave)]">
            {rodape.registroProfissional ? <p>{rodape.registroProfissional}</p> : null}
            {rodape.avisoLegal ? <p>{rodape.avisoLegal}</p> : null}
            <p>
              © {ano} {rodape.assinatura}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
