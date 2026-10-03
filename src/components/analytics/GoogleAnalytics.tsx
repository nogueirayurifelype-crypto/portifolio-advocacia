import Script from 'next/script'

/**
 * GA4 — um Measurement ID por cliente, vindo de `NEXT_PUBLIC_GA4_ID`.
 *
 * Sem ID configurado (desenvolvimento, preview), nada é injetado: o site não
 * carrega script de terceiro à toa e o Lighthouse local mede o site de verdade.
 *
 * `afterInteractive` mantém o GA4 fora do caminho crítico de renderização —
 * velocidade de carregamento é a prioridade número um do pacote vendido.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: true });
        `}
      </Script>
    </>
  )
}
