import type { PaginaDeTexto } from '@/site/types'
import { siteConfig } from '@/site/config'

/**
 * Página de texto livre — Termos de Uso.
 *
 * ⚠️ MODELO DE PARTIDA, NÃO PARECER JURÍDICO. Escritório fictício (portfólio).
 * Em um cliente real, revisar com o advogado responsável e conferir as regras
 * de publicidade da OAB (Provimento 205/2021).
 */
export const paginaTermosDeUso: PaginaDeTexto = {
  tipo: 'texto-livre',
  seo: {
    slug: '/termos-de-uso',
    titulo: `Termos de Uso — ${siteConfig.nome}`,
    metaDescription:
      'Condições de uso deste site: finalidade das informações publicadas, limites de responsabilidade e direitos sobre o conteúdo.',
    prioridadeSitemap: 0.3,
  },
  titulo: 'Termos de Uso',
  atualizadoEm: '2026-10-02',
  introducao:
    'Ao navegar neste site, você concorda com as condições abaixo. Este é um projeto de demonstração: o escritório, os profissionais e os dados de contato são fictícios.',
  secoes: [
    {
      titulo: 'Finalidade do site',
      paragrafos: [
        `Este site é institucional: apresenta ${siteConfig.nome}, os serviços oferecidos e as formas de contato.`,
        'O conteúdo publicado aqui é informativo e não constitui consultoria jurídica. Cada situação depende de análise individual dos fatos e documentos, e nenhuma informação deste site representa promessa ou garantia de resultado.',
      ],
    },
    {
      titulo: 'Agendamentos e contato',
      paragrafos: [
        'Mensagens enviadas pelo formulário ou pelo WhatsApp não confirmam, por si só, um agendamento nem criam relação entre cliente e advogado. Essa relação começa apenas com a contratação formal, por escrito.',
        'O formulário do site não armazena dados: ele apenas monta a mensagem e abre o WhatsApp, onde você decide se envia.',
        'O tempo de resposta segue o horário de atendimento informado no rodapé.',
      ],
    },
    {
      titulo: 'Honorários',
      paragrafos: [
        'Por regra de publicidade da advocacia, este site não divulga valores. Os honorários são apresentados por escrito, em contrato, depois da análise do caso e antes do início de qualquer trabalho.',
      ],
    },
    {
      titulo: 'Conteúdo e propriedade',
      paragrafos: [
        'Textos, marca e identidade visual deste site não podem ser reproduzidos sem autorização prévia.',
        'As fotografias são de bancos de imagens (Unsplash) e têm caráter ilustrativo: as pessoas retratadas não são os profissionais do escritório.',
      ],
    },
    {
      titulo: 'Links para outros sites',
      paragrafos: [
        'Este site contém links para serviços de terceiros, como WhatsApp, Google Maps e redes sociais. O conteúdo e as políticas desses serviços são de responsabilidade de quem os opera.',
      ],
    },
    {
      titulo: 'Mudanças nestes termos',
      paragrafos: [
        'Estes termos podem ser atualizados a qualquer momento. A data de atualização no topo da página indica a versão vigente.',
      ],
    },
  ],
}
