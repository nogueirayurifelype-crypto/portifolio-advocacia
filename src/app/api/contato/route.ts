import { NextResponse } from 'next/server'
import { siteConfig } from '@/site/config'

/**
 * Formulário nativo → e-mail, via Resend.
 *
 * Não há banco de dados nem backend próprio neste projeto: a mensagem vira um
 * e-mail para a caixa do cliente e o ciclo termina aí.
 *
 * ⚠️ Esta rota exige runtime Node.js (Hostinger com Node.js: `npm run build`
 * + `npm start`). Se o site do cliente for publicado como export estático
 * (`npm run build:static`), APAGUE a pasta `src/app/api/` — o bloco de
 * Formulário deve então usar `fonte.tipo` 'google-forms', 'microsoft-forms'
 * ou 'iframe'.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LIMITE_CARACTERES = 4000

export async function POST(requisicao: Request) {
  let dados: Record<string, unknown>

  try {
    dados = (await requisicao.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ erro: 'Requisição inválida.' }, { status: 400 })
  }

  // Campo-armadilha preenchido = robô. Responde 200 para não ensinar o bot.
  if (typeof dados.empresa_site === 'string' && dados.empresa_site.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const chaveResend = process.env.RESEND_API_KEY
  const remetente = process.env.CONTATO_EMAIL_DE
  const destinatario = process.env.CONTATO_EMAIL_PARA

  if (!chaveResend || !remetente || !destinatario) {
    console.error('[contato] RESEND_API_KEY, CONTATO_EMAIL_DE ou CONTATO_EMAIL_PARA ausente.')
    return NextResponse.json(
      { erro: 'O formulário está temporariamente indisponível. Fale com a gente pelo WhatsApp.' },
      { status: 503 },
    )
  }

  const linhas = Object.entries(dados)
    .filter(([chave]) => chave !== 'empresa_site')
    .map(([chave, valor]) => `${chave}: ${String(valor).slice(0, LIMITE_CARACTERES)}`)

  if (linhas.length === 0) {
    return NextResponse.json({ erro: 'Formulário vazio.' }, { status: 400 })
  }

  const texto = [
    `Nova mensagem pelo site — ${siteConfig.nome}`,
    '',
    ...linhas,
    '',
    `Origem: ${siteConfig.url}`,
  ].join('\n')

  try {
    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${chaveResend}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: remetente,
        to: [destinatario],
        subject: `Contato pelo site — ${siteConfig.nome}`,
        text: texto,
        reply_to: typeof dados.email === 'string' ? dados.email : undefined,
      }),
    })

    if (!resposta.ok) {
      const detalhe = await resposta.text()
      console.error('[contato] Resend respondeu com erro:', resposta.status, detalhe)
      return NextResponse.json(
        { erro: 'Não conseguimos enviar agora. Tente pelo WhatsApp.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (erro) {
    console.error('[contato] Falha ao chamar o Resend:', erro)
    return NextResponse.json(
      { erro: 'Não conseguimos enviar agora. Tente pelo WhatsApp.' },
      { status: 502 },
    )
  }
}
