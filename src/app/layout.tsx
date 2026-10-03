import type { Metadata, Viewport } from 'next'
import { Gloock, Source_Sans_3 } from 'next/font/google'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { siteConfig } from '@/site/config'
import './globals.css'

/**
 * Layout raiz.
 *
 * Header, rodapé e botão flutuante de WhatsApp vivem aqui — são estrutura fixa
 * do site, existem em todas as páginas e NÃO fazem parte do array de blocos.
 */

// Gloock (display, contraste alto, letreiro de saguão modernista) + Source Sans 3
// (texto, legível no celular). Duas famílias, `swap`, servidas pelo próprio site.
// Só o subset `latin`: ele já cobre ç, ã, é etc. (Latin-1). Só o título é
// pré-carregado — é ele o LCP; o corpo entra com fallback métrico ajustado.
const fonteTitulo = Gloock({
  subsets: ['latin'],
  weight: '400',
  variable: '--fonte-titulo',
  display: 'swap',
})

const fonteTexto = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--fonte-texto',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.nome,
    template: `%s`,
  },
  description: siteConfig.descricaoCurta,
  applicationName: siteConfig.nome,
  authors: [{ name: siteConfig.nome }],
  robots: siteConfig.indexavel ? undefined : { index: false, follow: false },
  formatDetection: { telephone: true, address: true, email: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e4a3c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} className={`${fonteTitulo.variable} ${fonteTexto.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--color-cal)] focus:px-4 focus:py-3 focus:font-bold focus:text-[var(--color-pastilha)]"
        >
          Pular para o conteúdo
        </a>

        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppButton />

        <GoogleAnalytics measurementId={siteConfig.ga4Id} />
      </body>
    </html>
  )
}
