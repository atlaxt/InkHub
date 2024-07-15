export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    "@nuxtjs/i18n",
    '@nuxt/image',
    'nuxt-module-eslint-config',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },
  
  i18n: {
    vueI18n: './i18n.config.ts',
  },

  eslintConfig: {
    setup: false,
  }
  
})