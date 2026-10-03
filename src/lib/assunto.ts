/**
 * Ponte entre os links "Saber mais" das áreas e o formulário de contato.
 *
 * O link dispara um evento com o assunto; o formulário escuta e marca a opção
 * correspondente no campo de seleção. Sem estado global, sem biblioteca.
 */
export const EVENTO_ASSUNTO = 'site:selecionar-assunto'

export function selecionarAssunto(assunto: string): void {
  if (typeof window === 'undefined') {
    return
  }
  window.dispatchEvent(new CustomEvent<string>(EVENTO_ASSUNTO, { detail: assunto }))
}
