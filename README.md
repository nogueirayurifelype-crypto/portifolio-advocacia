# Valença & Moraes Advocacia — site institucional (projeto de portfólio)

> **Projeto de demonstração.** O escritório, os sócios, os registros da OAB, os
> números, os depoimentos e os contatos são **fictícios** e estão rotulados
> como tal na própria página.

Site institucional de página única para um escritório de advocacia generalista
em Jundiaí (SP). O objetivo é mostrar, num caso completo, como eu construo um
site para pequenos negócios: rápido, bem posicionado no Google, acessível,
medido e pensado para gerar contato pelo WhatsApp.

## O que este projeto demonstra

- **Front-end moderno**: Next.js 16 (App Router), React 19, TypeScript e
  Tailwind CSS v4, sem bibliotecas pesadas.
- **Arquitetura de conteúdo**: a página é uma lista tipada de blocos
  (`src/site/`), separada dos componentes. Trocar texto, ordem de seções ou
  dados do negócio não exige mexer em componente.
- **Performance**: Lighthouse 96–100 no mobile e 100 no desktop, CLS 0,
  imagens otimizadas (WebP, dimensões declaradas, só o Hero com prioridade).
- **SEO técnico**: metadados por página, canonical, Open Graph, `sitemap.xml`,
  `robots.txt` e dados estruturados (JSON-LD).
- **Acessibilidade**: contraste AA medido, navegação por teclado, ARIA correto
  e respeito a `prefers-reduced-motion`.
- **Conversão e analytics**: fluxo de contato via WhatsApp com eventos de
  conversão no Google Analytics 4.
- **Design de identidade**: um mundo visual próprio, criado a partir do
  contexto do cliente, e não um tema pronto.
- **Conteúdo com responsabilidade**: textos escritos dentro das regras de
  publicidade da OAB.

## O que tem na página

Oito seções: header fixo com menu de âncoras (o item ativo acompanha a
rolagem), Hero, Áreas de atuação, Sócios, Como funciona o atendimento, Provas
de confiança, Dúvidas frequentes e Contato + rodapé.

- **Conversão por WhatsApp** (`wa.me`, sem API): atalhos de assunto no Hero
  que mudam a mensagem pré-preenchida, CTAs repetidos depois das Áreas e do
  Atendimento, botão flutuante com painel de intenções (some quando a seção de
  Contato está na tela).
- **Formulário sem backend**: valida nome, WhatsApp (com máscara), assunto,
  mensagem e consentimento LGPD; ao enviar, abre o WhatsApp com a mensagem
  montada. Os links "Saber mais" das áreas pré-selecionam o assunto.
- **SEO**: title/description próprios, canonical, Open Graph 1200×630,
  `sitemap.xml`, `robots.txt`, JSON-LD com `LegalService`, `FAQPage` e
  `OfferCatalog`, um único `<h1>`.
- **Acessibilidade**: acordeão com `aria-expanded`/`aria-controls`, erros de
  formulário ligados aos campos (`aria-describedby`, foco no primeiro erro),
  contraste AA medido, foco visível, `prefers-reduced-motion` respeitado.
- **GA4**: eventos `clique_whatsapp` (com a origem do clique),
  `envio_formulario` e `abriu_faq` via `src/lib/analytics.ts`.

## Mundo visual: "Edifício Modernista Paulista"

O escritório "mora" num prédio comercial modernista do centro: campo
verde-pastilha, concreto caiado, bronze só em caixilhos e números, e o
**cobogó** (luz passa, privacidade fica) como figura de sigilo + transparência.
No Hero, a foto do atendimento aparece inteira, diante de uma parede de
cobogó que desliza de leve com a rolagem (CSS scroll-driven, sem
JavaScript); a mesma parede volta, estática, acima do rodapé. Tipografia: Gloock
(títulos) + Source Sans 3 (texto). Decisões completas em `DESIGN.md`;
contexto de produto em `PRODUCT.md`.

Evitado de propósito: balança, martelo, colunas gregas e estátua da Justiça,
clichês do segmento e símbolos de poder do Estado.

## Conformidade (OAB)

Sem promessa de resultado, sem preço, sem superlativos, sem resultado de causa.
Depoimentos falam só do atendimento e são marcados como ilustrativos. O rodapé
traz o aviso de demonstração e um aviso legal. Isto não é orientação jurídica.

## Resultado de performance (Lighthouse, build de produção local)

| | Performance | Acessibilidade | Boas práticas | SEO | LCP |
|---|---|---|---|---|---|
| Mobile (simulado, 4G lento) | 96 | 100 | 100 | 100 | 2,8 s |
| Desktop | 100 | 100 | 100 | 100 | 0,6 s |

CLS 0 nos dois. O LCP mobile fica um pouco acima da meta de 2,5 s: o elemento
é o título (texto, FCP 1,1 s) e o atraso restante vem do custo de JavaScript do
framework no modelo simulado — testado e descartado como causa: fonte (`swap`
vs `optional`), preload da foto do Hero e CSS inline.

## Rodando

```bash
npm install
npm run dev                  # desenvolvimento
npm run build && npm start   # produção (Node.js)
npm run typecheck
```

### Deploy (export estático)

Como o formulário abre o WhatsApp (não usa `/api/contato`), o site pode ir como
HTML estático: **apague `src/app/api/`** e rode `npm run build:static`; suba a
pasta `out/` em qualquer hospedagem estática. Antes, defina
`NEXT_PUBLIC_SITE_URL` (domínio final, com `https://`) e, se houver,
`NEXT_PUBLIC_GA4_ID`.

## Onde estão os dados fictícios

Tudo em `src/site/config.ts` (WhatsApp `5511900000000`, telefone, e-mail no
domínio reservado `.example`, endereço, registros da OAB) e
`src/site/paginas/home.ts` (sócios, indicadores, depoimentos). Num site real,
esses são os únicos arquivos de conteúdo a trocar.

## Imagens

Fotos do Unsplash (licença gratuita) e mapa do OpenStreetMap, com créditos em
[`public/imagens/unsplash/CREDITOS.md`](public/imagens/unsplash/CREDITOS.md).
Na seção dos sócios as fotos mostram só mãos trabalhando, sem rosto: nenhum rosto
real fica associado a um sócio fictício.
