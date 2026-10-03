import { siteConfig } from '@/site/config'

/**
 * Monta o link wa.me com a mensagem pré-preenchida.
 *
 * Não há integração com a API do WhatsApp neste template — por decisão de
 * produto. É apenas um link `wa.me`; o que existe de "produto" em volta é a UX
 * de retenção (painel com opções de mensagem) e o rastreio do clique no GA4.
 */
export function linkWhatsapp(mensagem?: string): string {
  const texto = mensagem ?? siteConfig.whatsapp.mensagemPadrao
  return `https://wa.me/${siteConfig.whatsapp.numero}?text=${encodeURIComponent(texto)}`
}

/** Formata o número E.164 para exibição: 5511999999999 → +55 (11) 99999-9999. */
export function numeroFormatado(numero: string = siteConfig.whatsapp.numero): string {
  const digitos = numero.replace(/\D/g, '')
  const ddi = digitos.slice(0, 2)
  const ddd = digitos.slice(2, 4)
  const resto = digitos.slice(4)

  if (resto.length === 9) {
    return `+${ddi} (${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`
  }
  if (resto.length === 8) {
    return `+${ddi} (${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`
  }
  return `+${ddi} (${ddd}) ${resto}`
}
