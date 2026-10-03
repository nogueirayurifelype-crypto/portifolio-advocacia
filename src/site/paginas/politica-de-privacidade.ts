import type { PaginaDeTexto } from '@/site/types'
import { siteConfig } from '@/site/config'

/**
 * Página de texto livre — Política de Privacidade.
 *
 * ⚠️ MODELO DE PARTIDA, NÃO PARECER JURÍDICO. Escritório fictício (portfólio).
 * Em um cliente real, confirmar com ele quais dados são coletados, para onde
 * vão e quem é o responsável pelo tratamento antes de publicar.
 */
export const paginaPoliticaDePrivacidade: PaginaDeTexto = {
  tipo: 'texto-livre',
  seo: {
    slug: '/politica-de-privacidade',
    titulo: `Política de Privacidade — ${siteConfig.nome}`,
    metaDescription:
      'Como os dados enviados por este site são coletados, usados e armazenados, e como solicitar a exclusão deles.',
    prioridadeSitemap: 0.3,
  },
  titulo: 'Política de Privacidade',
  atualizadoEm: '2026-10-02',
  introducao:
    'Este documento explica quais dados este site coleta, para que eles são usados e como solicitar a exclusão. Este é um projeto de demonstração: o escritório e os dados de contato são fictícios.',
  secoes: [
    {
      titulo: 'Quem é o responsável pelos dados',
      paragrafos: [
        `${siteConfig.nome}, com endereço em ${siteConfig.endereco.logradouro}, ${siteConfig.endereco.bairro}, ${siteConfig.endereco.cidade}/${siteConfig.endereco.estado}, é o responsável pelo tratamento dos dados enviados por este site.`,
        `Para qualquer solicitação relacionada a dados pessoais, o contato é ${siteConfig.email ?? 'o e-mail informado no rodapé'}.`,
      ],
    },
    {
      titulo: 'Quais dados são coletados',
      paragrafos: [
        'Este site não tem cadastro, login nem área restrita. Os dados coletados se limitam a:',
      ],
      itens: [
        'Dados que você mesmo escreve no formulário de contato (nome, WhatsApp, assunto e mensagem). O site não guarda esses dados: eles são apenas usados para montar a mensagem que abre no seu WhatsApp, e só chegam ao escritório se você enviar a mensagem por lá.',
        'Dados de navegação agregados e anônimos, coletados pelo Google Analytics 4: páginas visitadas, tempo de permanência, origem do acesso, tipo de dispositivo e cidade aproximada.',
        'Ao clicar no botão de WhatsApp, você é levado ao aplicativo. A conversa a partir daí acontece no WhatsApp e é regida pela política de privacidade da Meta, não por este site.',
      ],
    },
    {
      titulo: 'Para que os dados são usados',
      itens: [
        'Responder ao contato que você iniciou e dar seguimento ao atendimento.',
        'Entender como as pessoas usam o site para melhorá-lo (dados agregados, sem identificar você individualmente).',
      ],
      paragrafos: [
        'Os dados enviados no formulário não são vendidos, alugados nem compartilhados com terceiros para fins de marketing.',
      ],
    },
    {
      titulo: 'Onde os dados ficam',
      paragrafos: [
        'Este site não tem banco de dados nem servidor de formulário: as mensagens existem apenas na conversa de WhatsApp que você iniciar com o escritório.',
        'Informações sobre o seu caso são protegidas também pelo sigilo profissional do advogado, previsto no Estatuto da Advocacia (Lei 8.906/1994).',
        'Os dados de navegação ficam na conta do Google Analytics 4 do escritório, sujeitos aos prazos de retenção configurados nessa conta.',
      ],
    },
    {
      titulo: 'Cookies',
      paragrafos: [
        'Este site usa cookies do Google Analytics 4 para medir audiência. Eles não identificam você pelo nome e podem ser bloqueados nas configurações do seu navegador, sem prejuízo ao uso do site.',
      ],
    },
    {
      titulo: 'Seus direitos (LGPD)',
      paragrafos: [
        'A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante a você, entre outros, os direitos abaixo. Para exercer qualquer um deles, basta entrar em contato pelos canais do rodapé.',
      ],
      itens: [
        'Confirmar se tratamos algum dado seu e acessar esses dados.',
        'Corrigir dados incompletos, inexatos ou desatualizados.',
        'Solicitar a exclusão dos dados enviados por você.',
        'Revogar o consentimento a qualquer momento.',
      ],
    },
    {
      titulo: 'Mudanças nesta política',
      paragrafos: [
        'Esta política pode ser atualizada. A data de atualização no topo da página sempre indica a versão vigente.',
      ],
    },
  ],
}
