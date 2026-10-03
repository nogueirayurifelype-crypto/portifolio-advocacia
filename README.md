# Valença & Moraes Advocacia — landing page (demonstração)

> **Projeto de demonstração para o portfólio da Laminy.** O escritório, os
> sócios, os registros da OAB, os números, os depoimentos e os contatos são
> **fictícios** e estão rotulados como tal na própria página.

Landing page única, responsiva, para um escritório de advocacia generalista em
Jundiaí (SP). Construída a partir do template de sites institucionais da
Laminy (Next.js + Tailwind).

## O que tem na página

Oito seções, na ordem do briefing: header fixo com menu de âncoras (item ativo
acompanha a rolagem), Hero, Áreas de atuação, Sócios, Como funciona o
atendimento, Provas de confiança, Dúvidas frequentes e Contato + rodapé.

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

Evitado de propósito: balança, martelo, colunas gregas e estátua da Justiça
(clichê e "símbolos de poder do Estado", vetados pelo próprio briefing).

## Conformidade (OAB)

Sem promessa de resultado, sem preço, sem superlativos, sem resultado de causa.
Depoimentos falam só do atendimento e são marcados como ilustrativos. O rodapé
traz o aviso de demonstração e um aviso legal. Isto não é orientação jurídica.

## Rodando

```bash
npm install
npm run dev            # desenvolvimento
npm run build && npm start   # produção (Node.js)
npm run typecheck
```

### Deploy (Hostinger, export estático)

Como o formulário abre o WhatsApp (não usa `/api/contato`), o site pode ir como
HTML estático: **apague `src/app/api/`** e rode `npm run build:static`; suba a
pasta `out/`. Antes, defina `NEXT_PUBLIC_SITE_URL` (domínio final, com
`https://`) e, se houver, `NEXT_PUBLIC_GA4_ID`.

## Dados fictícios a trocar num cliente real

Tudo em `src/site/config.ts` (WhatsApp `5511900000000`, telefone, e-mail no
domínio reservado `.example`, endereço, registros da OAB) e
`src/site/paginas/home.ts` (sócios, indicadores, depoimentos).

## Imagens

Fotos do Unsplash (licença gratuita) e mapa do OpenStreetMap, com créditos e a
curadoria feita sobre a lista do briefing em
[`public/imagens/unsplash/CREDITOS.md`](public/imagens/unsplash/CREDITOS.md).
Os retratos são ilustrativos: as pessoas fotografadas não são os "sócios".

## Resultado de performance (Lighthouse, build de produção local)

| | Performance | Acessibilidade | Boas práticas | SEO | LCP |
|---|---|---|---|---|---|
| Mobile (simulado, 4G lento) | 96 | 100 | 100 | 100 | 2,8 s |
| Desktop | 100 | 100 | 100 | 100 | 0,6 s |

CLS 0 nos dois. O LCP mobile fica um pouco acima da meta de 2,5 s do briefing:
o elemento é o título (texto, FCP 1,1 s) e o atraso restante vem do custo de
JavaScript do framework no modelo simulado — testado e descartado como causa:
fonte (`swap` vs `optional`), preload da foto do Hero e CSS inline.

