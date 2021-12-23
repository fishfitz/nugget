export default {
  head: {
    title: 'nugget',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.png' }
    ]
  },

  css: ['@/assets/scss/main.scss'],

  plugins: [],

  components: true,

  buildModules: [],

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios'
  ],

  buefy: { css: false },

  axios: {
    proxy: true,
    prefix: '/api/',
    retry: { retries: 2 }
  },

  proxy: { '/api/': { target: process.env.API_URL, pathRewrite: { '^/api/': '' } } },

  build: {},

  ssr: false
};
