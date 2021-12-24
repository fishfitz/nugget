export default {
  head: {
    title: '0w0 Q&A',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' }
    ]
  },

  css: ['@/assets/scss/main.scss'],

  plugins: [
    '@/plugins/getUser',
    { src: '@/plugins/axios.js', mode: 'server' }
  ],

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
    retry: { retries: 0 }
  },

  proxy: { '/api/': { target: process.env.API_URL, pathRewrite: { '^/api/': '' } } },

  build: {},

  ssr: true
};
