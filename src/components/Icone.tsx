/**
 * Ícones de linha do site — desenhados à mão, um traço só (1.5 em 24px),
 * pontas arredondadas. Sem balança, martelo ou coluna: o briefing pede fugir
 * do clichê jurídico, então cada área é representada pelo objeto do dia a dia
 * da pessoa atendida (contrato, carteira de trabalho, casa, sacola...).
 */

const TRACOS: Record<string, React.ReactNode> = {
  // Contrato com linha de assinatura.
  civel: (
    <>
      <path d="M6.5 3.5h8l3 3v14h-11z" />
      <path d="M14.5 3.5v3h3" />
      <path d="M9 10h6M9 13h6" />
      <path d="M9 17.2c.8-.9 1.4-.9 1.9 0s1.1.9 1.9 0 1.2-.6 2.2 0" />
    </>
  ),
  // Carteira de trabalho.
  trabalhista: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M8 3.5v17" />
      <circle cx="13.5" cy="10" r="2.2" />
      <path d="M10.8 16c.5-1.6 1.5-2.4 2.7-2.4s2.2.8 2.7 2.4" />
    </>
  ),
  // Casa com duas pessoas.
  familia: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5v11h13v-11" />
      <circle cx="9.7" cy="13" r="1.4" />
      <circle cx="14.3" cy="13.6" r="1.1" />
      <path d="M7.6 20.5c.2-2.2 1-3.6 2.1-3.6s1.9 1.4 2.1 3.6M12.6 20.5c.2-1.7.9-2.7 1.7-2.7s1.5 1 1.7 2.7" />
    </>
  ),
  // Sacola com nota fiscal.
  consumidor: (
    <>
      <path d="M4.5 8h11l-.8 12.5H5.3z" />
      <path d="M7.5 8V6.5a2.5 2.5 0 0 1 5 0V8" />
      <path d="M15.5 11.5h4v9h-4" />
      <path d="M17 14.5h1M17 17h1" />
    </>
  ),
  // Calendário com marca de benefício mensal.
  previdenciario: (
    <>
      <rect x="4" y="5" width="16" height="15.5" rx="1.5" />
      <path d="M4 9.5h16M8.5 3v4M15.5 3v4" />
      <path d="m9.2 14.8 2 2 3.8-4" />
    </>
  ),
  // Fachada de pequeno comércio.
  empresarial: (
    <>
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M4 9.5c0 1.4 1 2.3 2.3 2.3s2.3-.9 2.3-2.3c0 1.4 1 2.3 2.3 2.3h.2c1.3 0 2.3-.9 2.3-2.3 0 1.4 1 2.3 2.3 2.3S20 10.9 20 9.5" />
      <path d="M5.5 12v8.5h13V12" />
      <path d="M10 20.5v-5h4v5" />
    </>
  ),
  seta: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'seta-baixo': (
    <>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  local: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </>
  ),
  telefone: (
    <path d="M6.6 3.5h2.6l1.5 4-2 1.3a10.5 10.5 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  alerta: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
}

export function Icone({
  nome,
  tamanho = 24,
  className,
}: {
  nome: string
  tamanho?: number
  className?: string
}) {
  const tracos = TRACOS[nome]
  if (!tracos) {
    return null
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {tracos}
    </svg>
  )
}

/** Logotipo do WhatsApp (marca preenchida, não é ícone de linha). */
export function IconeWhatsapp({ tamanho = 20, className }: { tamanho?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.34 5L2 22l5.19-1.36a9.93 9.93 0 0 0 4.85 1.24h.01c5.5 0 9.97-4.47 9.97-9.97 0-2.66-1.04-5.17-2.92-7.05A9.9 9.9 0 0 0 12.04 2Zm0 18.13h-.01a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.24 8.24 0 0 1-1.27-4.4c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.29.86 5.86 2.43a8.24 8.24 0 0 1 2.42 5.87c0 4.57-3.72 8.28-8.29 8.28Z" />
    </svg>
  )
}
