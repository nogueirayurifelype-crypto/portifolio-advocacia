# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primário:** pessoas físicas da região de Jundiaí (SP) com uma demanda jurídica do dia a dia (trabalhista, família, consumidor, previdenciário, cível). Muitas nunca contrataram advogado, chegam ansiosas, com medo do custo e do "juridiquês", em geral pelo celular, depois de uma busca no Google ou de uma indicação. O trabalho delas na página: entender rápido se o escritório cuida do seu tipo de problema, sentir que vai ser tratado com atenção, e dar o primeiro passo sem compromisso (WhatsApp ou formulário).

**Secundário:** pequenos empresários e autônomos procurando apoio jurídico para contratos e regularização.

## Product Purpose

Landing page única, institucional, do escritório **Valença & Moraes Advocacia**: transmitir confiança rapidamente, explicar em linguagem simples o que o escritório faz e converter o visitante em contato (WhatsApp como canal principal, formulário como alternativa). Sucesso = clique em WhatsApp / envio do formulário (eventos `clique_whatsapp` e `envio_formulario` no GA4).

**Contexto real do projeto:** é uma peça de portfólio da Laminy. O escritório, os sócios, os depoimentos, os números e os contatos são **fictícios** e precisam estar identificados como demonstração. O site também serve de estudo de caso: mostra como o template Laminy atende um nicho regulado.

## Positioning

Advocacia generalista de bairro, para quem não sabe por onde começar: o diferencial declarado é o **processo de atendimento explicado antes de começar** (primeiro contato → análise do caso → estratégia definida em conjunto, com prazos e custos transparentes → acompanhamento), e não promessas de resultado, que a OAB proíbe.

## Operating Context

- Visitante majoritariamente mobile, chegando por busca local ("advogado trabalhista Jundiaí") ou indicação.
- Conversa de fato acontece no WhatsApp; o site qualifica e abre a conversa com uma mensagem pré-preenchida.
- Áreas de atuação: Direito Cível, Trabalhista, Família e Sucessões, Consumidor, Previdenciário, Empresarial.
- Dois sócios fictícios: Dr. Rafael Valença e Dra. Helena Moraes.

## Capabilities and Constraints

- Stack herdada do template Laminy: Next.js App Router + TypeScript + Tailwind v4, conteúdo em blocos tipados (`src/site/`), deploy na Hostinger. Sem Vercel, sem banco de dados.
- **Formulário:** valida os campos e abre o WhatsApp com nome, assunto e mensagem pré-preenchidos (decisão confirmada). Sem backend → o site pode sair como export estático (`npm run build:static`).
- **WhatsApp:** número fictício de demonstração (+55 11 90000-0000), trocar em `src/site/config.ts`.
- Escopo fixo: landing única com 8 seções na ordem do briefing (`docs/briefing-valenca-moraes.md`). Fora do escopo: blog, área do cliente, páginas por área, chatbot, agendamento online, multi-idioma, tema escuro.
- Idioma pt-BR, apenas tema claro.
- **Publicidade na advocacia (Código de Ética da OAB, Provimento 205/2021):** não prometer nem garantir resultado; não divulgar preço, promoção ou brinde; sem superlativos ("o melhor", "número 1") nem captação agressiva; sem resultados de causas, valores ganhos ou nomes de clientes; sem imagens/símbolos que sugiram poder do Estado; depoimentos só sobre o atendimento, nunca sobre resultado. Honorários explicados só em termos gerais.

## Brand Commitments

- Nome: **Valença & Moraes Advocacia** (logotipo textual "Valença & Moraes"), consistente em header, title, rodapé e JSON-LD.
- Tom: acolhedor, claro e profissional, com pouco juridiquês.
- Aviso visível no rodapé: *"Projeto de demonstração. Escritório, profissionais, depoimentos e dados são fictícios."*
- Restrições visuais vindas do briefing (ponto de partida, não regra rígida): evitar o clichê de balança/martelo/colunas gregas; evitar sinais de "cara de IA". Sem tema escuro.

## Evidence on Hand

- Fotografia do Unsplash (licença gratuita), baixada para `public/imagens/unsplash/` com créditos em `CREDITOS.md`. Lista do briefing curada: clichês (martelo, estátua da Justiça, colunas, fachada de tribunal) substituídos; duas fotos do briefing indisponíveis (Unsplash+). Os sócios usam retratos de banco de imagens, só ilustrativos.
- **Tudo é fictício:** sócios, OAB (formato "OAB/SP 000.000"), endereço, telefone, e-mail, indicadores e depoimentos. Precisam vir rotulados como demonstração/ilustrativos. Nada disso pode ser apresentado como dado real.
- Não existe: logotipo gráfico, fotos reais do escritório, depoimentos reais, números reais.

## Product Principles

1. **Clareza antes de autoridade.** O visitante ansioso precisa entender primeiro, e só depois ser impressionado. Linguagem simples vence a solenidade.
2. **Processo é a prova.** Como o escritório trabalha (etapas, transparência de custos e prazos) é o argumento central, porque a OAB veda prometer resultado.
3. **O primeiro passo é leve.** O WhatsApp está sempre a um toque, com mensagem pronta e sem compromisso.
4. **Honestidade de demonstração.** Todo dado fictício é rotulado; nada imita um escritório real.

## Accessibility & Inclusion

WCAG 2.1 AA: contraste mínimo de 4,5:1, navegação por teclado com foco visível, acordeão com `aria-expanded`, formulário com rótulos e erros claros, respeito a `prefers-reduced-motion`. Corpo de texto com no mínimo 16px e entrelinha de 1,5 a 1,7. Público inclui pessoas mais velhas e de baixa familiaridade digital (benefícios do INSS), então os toques precisam ser grandes e a leitura confortável no celular.
