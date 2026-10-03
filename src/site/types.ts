/**
 * Modelo de página do site.
 *
 * Regra central: uma página é uma lista ordenada de blocos + metadados de SEO.
 * Cada bloco separa `conteudo` (varia por cliente) de `variante` (escolhida
 * conforme o brief de cada cliente).
 *
 * Header, rodapé e botão flutuante de WhatsApp NÃO são blocos — são estrutura
 * fixa do site, definida em `src/site/config.ts` e renderizada no layout raiz.
 */

// ── SEO ───────────────────────────────────────────────────────────────────────

export interface Seo {
  /** Caminho da rota, começando com "/". A home é "/". */
  slug: string
  /** <title> da página. Até ~60 caracteres. */
  titulo: string
  /** <meta name="description">. Entre 120 e 158 caracteres. */
  metaDescription: string
  /** Caminho da imagem de Open Graph em `public/` (1200x630). */
  ogImage?: string
  /** Fora do sitemap e com noindex (ex.: página de obrigado). */
  naoIndexar?: boolean
  /** Prioridade no sitemap.xml. Padrão: 0.7 (home usa 1). */
  prioridadeSitemap?: number
}

// ── Blocos ────────────────────────────────────────────────────────────────────

export interface Imagem {
  src: string
  alt: string
  largura: number
  altura: number
  /** true quando a imagem foi gerada por IA — obrigatório declarar na entrega ao cliente. */
  geradaPorIa?: boolean
}

export interface Acao {
  rotulo: string
  /** Link direto. Ignorado quando `whatsapp` está presente. */
  href?: string
  /** Quando presente, o botão vira um link wa.me com a mensagem pré-preenchida. */
  whatsapp?: { mensagem: string }
  /** Nome do evento GA4 disparado no clique. Padrão: "clique_cta". */
  eventoGa4?: string
  /**
   * Assunto pré-selecionado no formulário de contato ao clicar. Usado com
   * `href: '#contato'` — o formulário escuta e marca a opção correspondente.
   */
  assunto?: string
}

interface BlocoBase {
  /** Âncora usada pelo menu do header (`#servicos`, `#contato`, ...). */
  id?: string
}

/** 1. Hero — primeira dobra. */
export interface BlocoHero extends BlocoBase {
  tipo: 'hero'
  variante: 'foto-ambiente' | 'texto-first'
  conteudo: {
    /** Linha curta acima do título (especialidade, cidade, registro profissional). */
    sobretitulo?: string
    titulo: string
    subtitulo: string
    acaoPrimaria: Acao
    acaoSecundaria?: Acao
    /** Obrigatório na variante "foto-ambiente". */
    imagem?: Imagem
    /** Selos de credibilidade (CRO, OAB, anos de atuação). Texto curto. */
    selos?: string[]
    /**
     * Atalhos de assunto acima do CTA principal: o visitante escolhe o tema e o
     * botão de WhatsApp já abre com a mensagem daquele assunto.
     */
    assuntosRapidos?: {
      rotulo: string
      opcoes: { rotulo: string; mensagem: string }[]
    }
  }
}

/** 2. Sobre. */
export interface BlocoSobre extends BlocoBase {
  tipo: 'sobre'
  variante: 'foto-lateral' | 'texto-centrado' | 'perfis'
  conteudo: {
    sobretitulo?: string
    titulo: string
    paragrafos: string[]
    /** Obrigatório na variante "perfis": as pessoas que atendem (sócios, equipe). */
    pessoas?: {
      nome: string
      /** Formação/especialidade em uma linha. */
      formacao: string
      /** Registro profissional (OAB, CRO...). Nunca inventado em cliente real. */
      registro?: string
      bio: string[]
      foto: Imagem
    }[]
    /** Frase de valores, exibida em destaque. */
    citacao?: string
    /** Obrigatório na variante "foto-lateral". */
    imagem?: Imagem
    /** Dados objetivos e verificáveis. Nunca número inventado. */
    destaques?: { valor: string; rotulo: string }[]
    acao?: Acao
  }
}

/** 3. Serviços. */
export interface BlocoServicos extends BlocoBase {
  tipo: 'servicos'
  variante: 'grid-cards' | 'lista-detalhada'
  conteudo: {
    sobretitulo?: string
    titulo: string
    descricao?: string
    itens: {
      nome: string
      descricao: string
      /** Ex.: "a partir de R$ 250". Só quando o cliente confirmar o valor. */
      precoApartirDe?: string
      imagem?: Imagem
      /** Chave de um ícone de linha de `src/components/Icone.tsx`. */
      icone?: string
      acao?: Acao
    }[]
    acao?: Acao
    /** Frase curta ao lado do CTA do bloco. */
    chamadaAcao?: string
  }
}

/** 4. Diferenciais. */
export interface BlocoDiferenciais extends BlocoBase {
  tipo: 'diferenciais'
  variante: 'icones-grid' | 'numeros-destaque' | 'linha-do-tempo'
  conteudo: {
    sobretitulo?: string
    titulo: string
    descricao?: string
    itens: {
      titulo: string
      descricao: string
      /** Usado na variante "numeros-destaque". Ex.: "12 anos", "+400". */
      numero?: string
    }[]
    /** CTA ao fim do bloco (usado na variante "linha-do-tempo"). */
    acao?: Acao
    imagem?: Imagem
  }
}

/** 5. Depoimentos. Nunca inventar depoimento, nome ou foto. */
export interface BlocoDepoimentos extends BlocoBase {
  tipo: 'depoimentos'
  variante: 'cards' | 'carrossel'
  conteudo: {
    sobretitulo?: string
    titulo: string
    itens: {
      texto: string
      autor: string
      /** Ex.: "paciente desde 2021", "cliente — reforma residencial". */
      contexto?: string
      foto?: Imagem
      /** Origem do depoimento (Google, formulário, WhatsApp). Para rastreabilidade interna. */
      origem?: string
    }[]
    /** Link para as avaliações públicas (Google Meu Negócio), quando existir. */
    linkAvaliacoes?: { rotulo: string; href: string }
    /** Indicadores objetivos exibidos acima dos depoimentos. Nunca número inventado em cliente real. */
    indicadores?: { valor: string; rotulo: string }[]
    /** Nota de procedência exibida junto ao bloco (ex.: "depoimentos ilustrativos"). */
    aviso?: string
  }
}

/** 6. Galeria. */
export interface BlocoGaleria extends BlocoBase {
  tipo: 'galeria'
  variante: 'grid-uniforme' | 'mosaico'
  conteudo: {
    sobretitulo?: string
    titulo: string
    descricao?: string
    itens: {
      imagem: Imagem
      titulo?: string
      legenda?: string
      /** Destaca o item em célula maior na variante "mosaico". */
      destaque?: boolean
    }[]
    acao?: Acao
  }
}

/** 7. FAQ. Alimenta o JSON-LD de FAQPage. */
export interface BlocoFaq extends BlocoBase {
  tipo: 'faq'
  variante: 'acordeao' | 'lista-aberta'
  conteudo: {
    sobretitulo?: string
    titulo: string
    itens: { pergunta: string; resposta: string }[]
  }
}

/** 8. Localização. */
export interface BlocoLocalizacao extends BlocoBase {
  tipo: 'localizacao'
  variante: 'mapa-lateral' | 'mapa-largo'
  conteudo: {
    sobretitulo?: string
    titulo: string
    endereco: {
      logradouro: string
      bairro: string
      cidade: string
      estado: string
      cep: string
      complemento?: string
    }
    /** URL de embed do Google Maps (modo "place", sem chave de API). */
    mapaEmbedUrl: string
    /** Link para abrir a rota no app de mapas. */
    linkComoChegar?: string
    horarios?: { dia: string; horario: string }[]
    referencias?: string[]
    acao?: Acao
  }
}

/** 9. Formulário — plugável: nativo (Resend), Google Forms, Microsoft Forms ou iframe. */
export type FonteFormulario =
  | {
      tipo: 'nativo'
      /** Campos do formulário nativo, enviados por e-mail via Resend. */
      campos: {
        nome: string
        rotulo: string
        tipo: 'texto' | 'email' | 'telefone' | 'textarea' | 'selecao'
        obrigatorio?: boolean
        opcoes?: string[]
        placeholder?: string
      }[]
      rotuloEnvio: string
      mensagemSucesso: string
      /** Texto da LGPD exibido abaixo do botão. */
      avisoPrivacidade: string
    }
  | {
      tipo: 'whatsapp'
      /**
       * Formulário sem backend: valida os campos e abre o WhatsApp com a
       * mensagem montada. Funciona em export estático.
       */
      campos: {
        nome: string
        rotulo: string
        tipo: 'texto' | 'telefone' | 'textarea' | 'selecao'
        obrigatorio?: boolean
        opcoes?: string[]
        placeholder?: string
        dica?: string
      }[]
      rotuloEnvio: string
      /** Texto do checkbox de consentimento (LGPD), obrigatório para enviar. */
      consentimento: string
      /** Primeira linha da mensagem montada no WhatsApp. */
      saudacao: string
      mensagemSucesso: string
    }
  | { tipo: 'google-forms'; embedUrl: string; altura?: number }
  | { tipo: 'microsoft-forms'; embedUrl: string; altura?: number }
  | { tipo: 'iframe'; embedUrl: string; altura?: number; titulo: string }

export interface BlocoFormulario extends BlocoBase {
  tipo: 'formulario'
  variante: 'card' | 'inline'
  conteudo: {
    sobretitulo?: string
    titulo: string
    descricao?: string
    fonte: FonteFormulario
    /** Alternativa de contato exibida ao lado do formulário. */
    alternativaWhatsapp?: { rotulo: string; mensagem: string }
    /**
     * Endereço, horário e mapa estático ao lado do formulário (dados de
     * `siteConfig`). Usado quando a página junta contato e localização numa
     * só seção.
     */
    localizacao?: {
      mapa: Imagem
      /** Atribuição exigida pela fonte do mapa (ex.: OpenStreetMap). */
      creditoMapa: string
      linkMapa: string
    }
  }
}

/** 10. CTA final — último bloco da página. */
export interface BlocoCtaFinal extends BlocoBase {
  tipo: 'cta-final'
  variante: 'faixa' | 'bloco-destaque'
  conteudo: {
    titulo: string
    descricao?: string
    acaoPrimaria: Acao
    acaoSecundaria?: Acao
    /** Só na variante "bloco-destaque". */
    imagemFundo?: Imagem
  }
}

export type Bloco =
  | BlocoHero
  | BlocoSobre
  | BlocoServicos
  | BlocoDiferenciais
  | BlocoDepoimentos
  | BlocoGaleria
  | BlocoFaq
  | BlocoLocalizacao
  | BlocoFormulario
  | BlocoCtaFinal

export type TipoBloco = Bloco['tipo']

// ── Páginas ───────────────────────────────────────────────────────────────────

/** Página montada por blocos (home e páginas institucionais). */
export interface PaginaDeBlocos {
  tipo: 'blocos'
  seo: Seo
  blocos: Bloco[]
}

/** Página de texto livre: Política de Privacidade, Termos de Uso, avisos legais. */
export interface PaginaDeTexto {
  tipo: 'texto-livre'
  seo: Seo
  titulo: string
  /** Data no formato ISO (YYYY-MM-DD). Exibida como "Atualizado em". */
  atualizadoEm: string
  introducao?: string
  secoes: {
    titulo: string
    /** Cada item vira um <p>. Para listas, usar `itens`. */
    paragrafos?: string[]
    itens?: string[]
  }[]
}

export type Pagina = PaginaDeBlocos | PaginaDeTexto
