import type { NextConfig } from 'next'

/**
 * Deploy: Hostinger (Node.js hosting). Não há configuração de Vercel neste projeto.
 *
 * Dois modos de build:
 * - `npm run build` + `npm start` — Node.js na Hostinger. Necessário quando o site usa
 *   o formulário nativo (rota /api/contato com Resend).
 * - `npm run build:static` — exporta HTML estático em `out/`, para subir em hosting
 *   comum da Hostinger. Só funciona se o site NÃO usar o formulário nativo
 *   (usar Google Forms / Microsoft Forms / iframe no bloco de Formulário).
 */
const isStaticExport = process.env.NEXT_OUTPUT === 'export'

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // A Hostinger não oferece CDN de otimização de imagem como um edge provider.
    // As imagens entram já otimizadas em `public/` (WebP/AVIF, dimensões corretas).
    unoptimized: true,
  },
}

export default nextConfig
