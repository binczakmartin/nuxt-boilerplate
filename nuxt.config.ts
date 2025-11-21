import crypto, { type BinaryLike, type BinaryToTextEncoding } from 'node:crypto'

// Polyfill for Node < 20.12.0
if (!crypto.hash) {
  Object.assign(crypto, {
    hash(algorithm: string, data: BinaryLike, outputEncoding?: BinaryToTextEncoding) {
      const digest = crypto.createHash(algorithm).update(data)
      return outputEncoding ? digest.digest(outputEncoding) : digest.digest()
    }
  })
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/eslint'],
  css: ['~/assets/css/theme.css'],
  alias: {
    'pixi.js': 'pixi.js/dist/pixi.mjs'
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    public: {
      apiBase: '/api'
    }
  }
})
