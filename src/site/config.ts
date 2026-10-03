/**
 * Configuração do site de UM cliente.
 *
 * Tudo aqui é estrutura fixa do site — existe em todas as páginas, fora do
 * array de blocos: header/menu, rodapé e botão flutuante de WhatsApp.
 *
 * ⚠️ Valença & Moraes Advocacia é um escritório FICTÍCIO (peça de portfólio da
 * Laminy). Número, endereço, e-mail e registros da OAB são inventados e estão
 * marcados como tal. O domínio `.example` é reservado (RFC 2606) de propósito:
 * nenhum e-mail ou link aponta para alguém real.
 */

export interface ItemMenu {
  rotulo: string
  /** Âncora na home ("#servicos") ou rota interna ("/politica-de-privacidade"). */
  href: string
}

export interface SiteConfig {
  /** Nome do negócio, como aparece no header e no <title>. */
  nome: string
  /** Forma curta do nome, usada como logotipo textual no header e no rodapé. */
  nomeCurto?: string
  /** Descrição curta do negócio, usada no rodapé e no JSON-LD. */
  descricaoCurta: string
  /**
   * Nicho do cliente, em texto livre — informativo (aparece só como contexto de
   * negócio). Não seleciona preset nem muda nada neste template: a estética e
   * o conteúdo de cada cliente são decididos no projeto de cada cliente.
   */
  nicho: string
  /** URL canônica do site em produção. Sem barra no final. */
  url: string
  /** Locale e região. */
  locale: string
  /** Telefone em formato E.164, só dígitos, com DDI. Ex.: 5511999999999. */
  whatsapp: {
    numero: string
    /** Mensagem padrão do botão flutuante. */
    mensagemPadrao: string
    /** Opções mostradas no painel de retenção antes de abrir o WhatsApp. */
    opcoesRapidas: { rotulo: string; mensagem: string }[]
    /** Texto curto exibido no painel, acima das opções. */
    tituloPainel: string
    subtituloPainel: string
  }
  telefone?: string
  email?: string
  endereco: {
    logradouro: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    pais: string
    /** Observação exibida junto ao endereço (ex.: "endereço fictício"). */
    nota?: string
  }
  /** Horários usados no rodapé e no JSON-LD (openingHours). */
  horarios: { dia: string; horario: string }[]
  redes?: { rotulo: string; href: string }[]
  menu: ItemMenu[]
  rodape: {
    /** Linha de responsabilidade técnica/legal exigida pelo nicho, se houver (CRO, OAB, CRECI, CAU/CREA...). */
    registroProfissional?: string
    /** Aviso exibido em destaque no rodapé (ex.: projeto de demonstração). */
    aviso?: string
    /** Texto legal curto do rodapé (ex.: caráter informativo do conteúdo). */
    avisoLegal?: string
    links: ItemMenu[]
    /** Texto de copyright, sem o ano (o ano é calculado no build). */
    assinatura: string
  }
  /** Measurement ID do GA4 deste cliente. Vem de env, nunca fixo no código. */
  ga4Id: string
  /** Tipo de negócio no schema.org. Ex.: LocalBusiness, Dentist, LegalService, RealEstateAgent. */
  schemaTipo: string
}

export const siteConfig: SiteConfig = {
  nome: 'Valença & Moraes Advocacia',
  nomeCurto: 'Valença & Moraes',
  descricaoCurta:
    'Escritório de advocacia generalista em Jundiaí (SP): cível, trabalhista, família e sucessões, consumidor, previdenciário e empresarial. Projeto de demonstração.',
  nicho: 'advocacia generalista (escritório fictício, peça de portfólio)',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://valencaemoraes.example',
  locale: 'pt-BR',
  whatsapp: {
    // Número fictício de demonstração. Trocar pelo número real em E.164.
    numero: '5511900000000',
    mensagemPadrao: 'Olá, gostaria de agendar uma conversa.',
    tituloPainel: 'Vamos conversar',
    subtituloPainel: 'Escolha um assunto e a mensagem já sai pronta. Respondemos em horário comercial.',
    opcoesRapidas: [
      {
        rotulo: 'Quero agendar uma conversa',
        mensagem: 'Olá, gostaria de agendar uma conversa.',
      },
      {
        rotulo: 'Tenho uma dúvida sobre o meu caso',
        mensagem: 'Olá, tenho uma dúvida sobre uma situação e gostaria de uma orientação.',
      },
      {
        rotulo: 'Não sei qual área cuida do meu problema',
        mensagem: 'Olá, não sei bem qual área cuida do meu problema. Posso explicar a situação?',
      },
    ],
  },
  telefone: '(11) 0000-0000',
  email: 'contato@valencaemoraes.example',
  endereco: {
    logradouro: 'Rua das Paineiras, 410 — sala 52',
    bairro: 'Centro',
    cidade: 'Jundiaí',
    estado: 'SP',
    cep: '13201-000',
    pais: 'BR',
    nota: 'Endereço fictício de demonstração',
  },
  horarios: [
    { dia: 'Segunda a sexta', horario: '9h às 18h' },
    { dia: 'Sábado e domingo', horario: 'Fechado' },
  ],
  menu: [
    { rotulo: 'Áreas', href: '#areas' },
    { rotulo: 'Sobre', href: '#sobre' },
    { rotulo: 'Atendimento', href: '#atendimento' },
    { rotulo: 'Dúvidas', href: '#duvidas' },
    { rotulo: 'Contato', href: '#contato' },
  ],
  rodape: {
    registroProfissional:
      'Valença & Moraes Sociedade de Advogados · OAB/SP 00.000 (registro fictício). Responsáveis: Dr. Rafael Valença, OAB/SP 000.000, e Dra. Helena Moraes, OAB/SP 000.001 (registros fictícios).',
    aviso: 'Projeto de demonstração. Escritório, profissionais, depoimentos e dados são fictícios.',
    avisoLegal:
      'O conteúdo deste site é informativo e não substitui a análise individual de cada caso. Nenhuma informação aqui constitui promessa de resultado.',
    links: [
      { rotulo: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { rotulo: 'Termos de Uso', href: '/termos-de-uso' },
    ],
    assinatura: 'Valença & Moraes Advocacia (demonstração).',
  },
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? '',
  schemaTipo: 'LegalService',
}
