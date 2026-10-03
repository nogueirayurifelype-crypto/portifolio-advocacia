import Link from 'next/link'
import { siteConfig } from '@/site/config'
import { linkWhatsapp } from '@/lib/whatsapp'

export default function NaoEncontrada() {
  return (
    <section className="secao py-24 lg:py-32">
      <div className="secao-interna max-w-xl text-center">
        <h1 className="titulo-secao">Esta página não existe</h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-grafite-suave)]">
          O endereço pode ter mudado ou o link estar incompleto (erro 404). Volte para a página
          inicial ou fale com a gente diretamente.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="botao botao-placa">
            Voltar para o início
          </Link>
          <a
            href={linkWhatsapp(siteConfig.whatsapp.mensagemPadrao)}
            target="_blank"
            rel="noopener noreferrer"
            className="botao botao-contorno"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
