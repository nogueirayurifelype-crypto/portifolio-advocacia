/**
 * Camada fina sobre o gtag do GA4.
 *
 * Todo evento de conversão do site passa por aqui. Os nomes de evento são
 * fixos e iguais em todos os clientes — é isso que permite comparar a captação
 * entre sites diferentes sem reconfigurar relatório a cada cliente.
 */

type ParametrosEvento = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Eventos padronizados do pacote vendido. Não inventar nomes novos por cliente. */
export const EVENTOS = {
  /** Clique em qualquer link que leva ao WhatsApp. */
  cliqueWhatsapp: 'clique_whatsapp',
  /** Clique em um CTA que não é WhatsApp (telefone, e-mail, âncora). */
  cliqueCta: 'clique_cta',
  /** Envio bem-sucedido do formulário nativo. */
  envioFormulario: 'envio_formulario',
  /** Clique em "como chegar" no bloco de Localização. */
  cliqueComoChegar: 'clique_como_chegar',
  /** Abertura de uma pergunta do FAQ. */
  abriuFaq: 'abriu_faq',
} as const

export type NomeEvento = (typeof EVENTOS)[keyof typeof EVENTOS]

export function registrarEvento(nome: NomeEvento | string, parametros: ParametrosEvento = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  const limpos: ParametrosEvento = {}
  for (const [chave, valor] of Object.entries(parametros)) {
    if (valor !== undefined && valor !== '') {
      limpos[chave] = valor
    }
  }

  window.gtag('event', nome, limpos)
}

/** Atalho para o evento de WhatsApp, que é a conversão principal do pacote. */
export function registrarCliqueWhatsapp(origem: string, mensagem?: string): void {
  registrarEvento(EVENTOS.cliqueWhatsapp, {
    origem,
    mensagem_inicial: mensagem?.slice(0, 100),
  })
}
