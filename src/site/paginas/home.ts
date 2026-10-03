import type { PaginaDeBlocos } from '@/site/types'

/**
 * Home — Valença & Moraes Advocacia.
 *
 * ⚠️ Escritório FICTÍCIO (peça de portfólio). Sócios, registros da
 * OAB, indicadores e depoimentos são inventados e estão rotulados na própria
 * página como demonstração/ilustrativos. Em um cliente real, nada disso entra
 * sem confirmação e autorização.
 *
 * Publicidade na advocacia (Código de Ética da OAB, Provimento 205/2021): sem
 * promessa de resultado, sem preço, sem superlativo, sem resultado de causa,
 * depoimento só sobre o atendimento. Toda alteração de texto passa por isso.
 *
 * Ordem fixa das seções (briefing): Hero, Áreas, Sócios, Atendimento, Provas
 * de confiança, Dúvidas, Contato. Header e rodapé ficam no layout.
 */

const AREAS = [
  'Direito Cível',
  'Direito Trabalhista',
  'Família e Sucessões',
  'Direito do Consumidor',
  'Direito Previdenciário',
  'Direito Empresarial',
]

export const paginaHome: PaginaDeBlocos = {
  tipo: 'blocos',
  seo: {
    slug: '/',
    titulo: 'Advocacia Generalista em Jundiaí | Valença & Moraes',
    metaDescription:
      'Escritório em Jundiaí com atendimento claro em direito cível, trabalhista, família, consumidor, previdenciário e empresarial. Converse pelo WhatsApp.',
    ogImage: '/imagens/og-valenca-moraes.jpg',
    prioridadeSitemap: 1,
  },
  blocos: [
    {
      tipo: 'hero',
      variante: 'foto-ambiente',
      id: 'inicio',
      conteudo: {
        titulo: 'Orientação jurídica clara, do primeiro contato à solução.',
        subtitulo:
          'Atendimento personalizado em direito cível, trabalhista, família e mais.',
        acaoPrimaria: {
          rotulo: 'Falar no WhatsApp',
          whatsapp: { mensagem: 'Olá, gostaria de agendar uma conversa.' },
        },
        acaoSecundaria: {
          rotulo: 'Conhecer as áreas de atuação',
          href: '#areas',
        },
        imagem: {
          src: '/imagens/unsplash/atendimento-conversa-1600.webp',
          alt: 'Duas pessoas conversam com uma advogada em uma mesa de reunião enquanto uma delas assina um documento.',
          largura: 1600,
          altura: 900,
        },
        selos: ['OAB/SP 00.000 (exemplo fictício)'],
        assuntosRapidos: {
          rotulo: 'Sobre o que você quer conversar?',
          opcoes: [
            {
              rotulo: 'Trabalho',
              mensagem:
                'Olá, gostaria de agendar uma conversa sobre uma questão trabalhista.',
            },
            {
              rotulo: 'Família',
              mensagem:
                'Olá, gostaria de agendar uma conversa sobre uma questão de família (divórcio, guarda, pensão ou inventário).',
            },
            {
              rotulo: 'INSS',
              mensagem:
                'Olá, gostaria de agendar uma conversa sobre aposentadoria ou benefício do INSS.',
            },
            {
              rotulo: 'Consumidor',
              mensagem:
                'Olá, gostaria de agendar uma conversa sobre um problema como consumidor.',
            },
            {
              rotulo: 'Outro assunto',
              mensagem: 'Olá, gostaria de agendar uma conversa.',
            },
          ],
        },
      },
    },
    {
      tipo: 'servicos',
      variante: 'grid-cards',
      id: 'areas',
      conteudo: {
        titulo: 'Áreas de atuação',
        descricao:
          'Uma atuação generalista, com o mesmo cuidado em cada área. Se você não sabe onde o seu caso se encaixa, tudo bem: essa é uma das primeiras coisas que a gente resolve juntos.',
        itens: [
          {
            nome: 'Direito Cível',
            descricao: 'Contratos, indenizações, cobranças e questões patrimoniais.',
            icone: 'civel',
            acao: { rotulo: 'Saber mais', href: '#contato', assunto: 'Direito Cível' },
          },
          {
            nome: 'Direito Trabalhista',
            descricao: 'Orientação para trabalhadores e empresas nas relações de trabalho.',
            icone: 'trabalhista',
            acao: { rotulo: 'Saber mais', href: '#contato', assunto: 'Direito Trabalhista' },
          },
          {
            nome: 'Família e Sucessões',
            descricao: 'Divórcio, guarda, pensão, inventário e planejamento sucessório.',
            icone: 'familia',
            acao: { rotulo: 'Saber mais', href: '#contato', assunto: 'Família e Sucessões' },
          },
          {
            nome: 'Direito do Consumidor',
            descricao: 'Cobranças indevidas, falhas de serviço e problemas com produtos.',
            icone: 'consumidor',
            acao: { rotulo: 'Saber mais', href: '#contato', assunto: 'Direito do Consumidor' },
          },
          {
            nome: 'Direito Previdenciário',
            descricao: 'Aposentadorias, benefícios e revisões junto ao INSS.',
            icone: 'previdenciario',
            acao: { rotulo: 'Saber mais', href: '#contato', assunto: 'Direito Previdenciário' },
          },
          {
            nome: 'Direito Empresarial',
            descricao: 'Apoio jurídico a pequenos negócios, contratos e regularização.',
            icone: 'empresarial',
            acao: { rotulo: 'Saber mais', href: '#contato', assunto: 'Direito Empresarial' },
          },
        ],
        chamadaAcao: 'Não sabe em qual área o seu caso se encaixa? Conte a situação do seu jeito.',
        acao: {
          rotulo: 'Explicar meu caso no WhatsApp',
          whatsapp: {
            mensagem:
              'Olá, gostaria de agendar uma conversa. Não sei bem em qual área o meu caso se encaixa.',
          },
        },
      },
    },
    {
      tipo: 'sobre',
      variante: 'perfis',
      id: 'sobre',
      conteudo: {
        titulo: 'Quem vai cuidar do seu caso',
        paragrafos: [
          'O escritório tem dois sócios e nenhum intermediário: quem conversa com você no primeiro contato é quem acompanha o caso até o fim.',
        ],
        citacao: 'Cada caso é único e merece atenção individual.',
        pessoas: [
          {
            nome: 'Dr. Rafael Valença',
            formacao: 'Bacharel em Direito, especialista em Direito do Trabalho e Processo Civil',
            registro: 'OAB/SP 000.000 (fictício)',
            bio: [
              'Atende nas áreas trabalhista, cível e empresarial, com atenção especial a trabalhadores e pequenos empresários da região.',
              'Antes de qualquer decisão, explica o que pode acontecer em cada caminho, inclusive quando a melhor saída é um acordo.',
            ],
            foto: {
              src: '/imagens/unsplash/socio-rafael-valenca.webp',
              alt: 'Foto em preto e branco de mãos escrevendo com caneta sobre um documento, numa mesa de trabalho.',
              largura: 800,
              altura: 1000,
            },
          },
          {
            nome: 'Dra. Helena Moraes',
            formacao: 'Bacharel em Direito, especialista em Família e Sucessões e Direito Previdenciário',
            registro: 'OAB/SP 000.001 (fictício)',
            bio: [
              'Conduz divórcios, guarda, pensão, inventários e pedidos de benefício junto ao INSS.',
              'Sabe que esses assuntos chegam num momento difícil, e por isso cuida para que cada etapa seja entendida antes de ser feita.',
            ],
            foto: {
              src: '/imagens/unsplash/socia-helena-moraes.webp',
              alt: 'Foto em preto e branco de mãos usando um carimbo de relevo sobre uma folha de papel.',
              largura: 800,
              altura: 1000,
            },
          },
        ],
      },
    },
    {
      tipo: 'diferenciais',
      variante: 'linha-do-tempo',
      id: 'atendimento',
      conteudo: {
        titulo: 'Como funciona o atendimento',
        descricao:
          'Você sabe o que vai acontecer antes de cada passo. Sem surpresa no meio do caminho.',
        itens: [
          {
            numero: '1',
            titulo: 'Primeiro contato',
            descricao:
              'Você descreve a situação pelo WhatsApp ou pelo formulário, do seu jeito e sem precisar saber termos jurídicos.',
          },
          {
            numero: '2',
            titulo: 'Análise do caso',
            descricao:
              'Avaliamos os seus documentos e explicamos com clareza quais são as possibilidades, inclusive as que não valem a pena.',
          },
          {
            numero: '3',
            titulo: 'Estratégia',
            descricao:
              'O caminho é definido em conjunto, com prazos estimados e custos apresentados por escrito antes de começar.',
          },
          {
            numero: '4',
            titulo: 'Acompanhamento',
            descricao:
              'Você recebe atualizações durante todo o processo e sabe com quem falar quando surgir uma dúvida.',
          },
        ],
        acao: {
          rotulo: 'Começar pelo primeiro contato',
          whatsapp: { mensagem: 'Olá, gostaria de agendar uma conversa.' },
        },
      },
    },
    {
      tipo: 'depoimentos',
      variante: 'cards',
      id: 'confianca',
      conteudo: {
        titulo: 'Quem já passou por aqui',
        indicadores: [
          { valor: '12', rotulo: 'anos de atuação' },
          { valor: '800+', rotulo: 'pessoas atendidas' },
        ],
        aviso:
          'Números e depoimentos ilustrativos, criados para esta demonstração. Os relatos falam do atendimento, nunca do resultado de uma causa.',
        itens: [
          {
            texto:
              'Eu não entendia nada de inventário. A Dra. Helena explicou cada documento com paciência e sempre respondeu as minhas mensagens.',
            autor: 'M. S.',
            contexto: 'Família e Sucessões',
            origem: 'depoimento fictício de demonstração',
          },
          {
            texto:
              'Saí da primeira conversa sabendo quais eram as opções e como seriam os honorários. Foi a primeira vez que um advogado me explicou tudo sem complicar.',
            autor: 'J. P.',
            contexto: 'Direito Trabalhista',
            origem: 'depoimento fictício de demonstração',
          },
          {
            texto:
              'Tenho uma oficina pequena e precisava de alguém que falasse a minha língua. Hoje eu entendo o que assino.',
            autor: 'R. A.',
            contexto: 'Direito Empresarial',
            origem: 'depoimento fictício de demonstração',
          },
        ],
      },
    },
    {
      tipo: 'faq',
      variante: 'acordeao',
      id: 'duvidas',
      conteudo: {
        titulo: 'Dúvidas frequentes',
        itens: [
          {
            pergunta: 'Como funciona a primeira consulta?',
            resposta:
              'É uma conversa para entender a sua situação, presencial no escritório ou por videochamada. Ao final, você sabe quais caminhos existem e, se fizer sentido seguir, recebe uma proposta de honorários por escrito. Você decide com calma.',
          },
          {
            pergunta: 'Quais documentos devo levar?',
            resposta:
              'Documento com foto, CPF, comprovante de residência e tudo o que tiver relação com o problema: contratos, carteira de trabalho, holerites, cartas do INSS, notificações, prints de conversas. Se não tiver tudo, não tem problema: a gente ajuda a descobrir o que falta.',
          },
          {
            pergunta: 'Como são definidos os honorários?',
            resposta:
              'Os honorários consideram a complexidade do caso, o tempo de trabalho estimado e a fase em que o processo está, tendo como referência a tabela da OAB/SP. Eles são sempre combinados por escrito, em contrato, antes de qualquer trabalho começar.',
          },
          {
            pergunta: 'Quanto tempo demora um processo?',
            resposta:
              'Não existe prazo garantido: depende do tipo de ação, do andamento na Justiça, de recursos e da possibilidade de acordo. O que garantimos é explicar uma estimativa realista no início e manter você informado a cada mudança.',
          },
          {
            pergunta: 'Posso ser atendido online?',
            resposta:
              'Sim. A conversa pode ser por videochamada, os documentos podem ser enviados por e-mail ou WhatsApp e os contratos podem ser assinados eletronicamente.',
          },
          {
            pergunta: 'As minhas informações ficam em sigilo?',
            resposta:
              'Sim. O sigilo profissional é um dever do advogado previsto no Estatuto da Advocacia. Os seus dados são tratados conforme a LGPD e usados apenas para o seu atendimento. Os detalhes estão na Política de Privacidade.',
          },
        ],
      },
    },
    {
      tipo: 'formulario',
      variante: 'inline',
      id: 'contato',
      conteudo: {
        titulo: 'Vamos conversar sobre o seu caso',
        descricao:
          'Conte em poucas palavras o que está acontecendo. Ao enviar, o WhatsApp abre com a sua mensagem pronta: nada é enviado sem você confirmar lá.',
        fonte: {
          tipo: 'whatsapp',
          saudacao: 'Olá, gostaria de agendar uma conversa.',
          campos: [
            {
              nome: 'nome',
              rotulo: 'Seu nome',
              tipo: 'texto',
              obrigatorio: true,
              placeholder: 'Como prefere ser chamado',
            },
            {
              nome: 'whatsapp',
              rotulo: 'Seu WhatsApp',
              tipo: 'telefone',
              obrigatorio: true,
              placeholder: '(11) 90000-0000',
              dica: 'Com DDD. Usamos só para responder este contato.',
            },
            {
              nome: 'assunto',
              rotulo: 'Assunto',
              tipo: 'selecao',
              obrigatorio: true,
              placeholder: 'Escolha uma área',
              opcoes: [...AREAS, 'Não sei / outro assunto'],
            },
            {
              nome: 'mensagem',
              rotulo: 'O que está acontecendo?',
              tipo: 'textarea',
              obrigatorio: true,
              placeholder: 'Conte com as suas palavras, sem se preocupar com termos jurídicos.',
            },
          ],
          rotuloEnvio: 'Continuar no WhatsApp',
          consentimento:
            'Concordo que os meus dados sejam usados apenas para responder a este contato.',
          mensagemSucesso:
            'Abrimos o WhatsApp com a sua mensagem pronta.',
        },
        alternativaWhatsapp: {
          rotulo: 'Falar direto no WhatsApp',
          mensagem: 'Olá, gostaria de agendar uma conversa.',
        },
        localizacao: {
          mapa: {
            src: '/imagens/mapa-jundiai-centro.webp',
            alt: 'Mapa estático do centro de Jundiaí, com um marcador na região do escritório.',
            largura: 800,
            altura: 500,
          },
          creditoMapa: '© colaboradores do OpenStreetMap',
          linkMapa: 'https://www.openstreetmap.org/?mlat=-23.1866&mlon=-46.8845#map=16/-23.1866/-46.8845',
        },
      },
    },
  ],
}
