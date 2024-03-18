export default {
  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    routeNameSplitter: '/',
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
  },
  // Global page headers (https://go.nuxtjs.dev/config-head).
  head: {
    title: 'WPC Dinamo Tbilisi',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
      {
        name: 'facebook-domain-verification',
        content: 'q1uxoxc7y2bqd8cqtyke9n346p3588',
      },
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'frame-src *',
      },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
    ],
    script: [{ src: 'pixel.js', type: 'text/javascript' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#183041',
    continuous: true,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/scss/main.scss'],
  /*
   ** Global SCSS Variables
   */
  styleResources: {
    scss: [
      './assets/scss/base/functions.scss',
      './assets/scss/base/variables.scss',
      './assets/scss/base/mixins.scss',
      './node_modules/bootstrap/scss/_functions.scss',
      './node_modules/bootstrap/scss/_variables.scss',
      './node_modules/bootstrap/scss/_mixins.scss',
      './node_modules/bootstrap/scss/_grid.scss',
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/vue-awesome-countdown.client' },
    { src: '~/plugins/vue-ellipse-progress.client' },
    { src: '~/plugins/LocomotiveScroll.js' },
    { src: '~/plugins/LocomotiveScroll.client.js' },
    { src: '~/plugins/vue-moment.js' },
    { src: '~/plugins/i18nCountries.js' },
    { src: '~/plugins/vee-validate.js' },
    // { src: '~/plugins/vue-panzoom.js' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-gsap-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // visible styles variables in components style tags
    '@nuxtjs/style-resources',
    // SVG Sprite Module https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // https://www.npmjs.com/package/nuxt-vue-select?fbclid=IwAR12-pzut4dUNxPBoUzHngXGCPpXzh4qx_BNYkS96_kD5wb3oLWTlrxie9M
    'nuxt-vue-select',
    'nuxt-rfg-icon',
    '@nuxtjs/manifest',
  ],

  // Localization (https://i18n.nuxtjs.org/)
  i18n: {
    // strategy: 'prefix_except_default',
    locales: [
      {
        code: 'ka',
        name: 'ქართული',
        iso: 'ka-GE',
        file: 'ka-GE.js',
      },
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en-US.js',
      },
    ],
    // loadLanguagesAsync: false,
    detectBrowserLanguage: false,
    defaultLocale: 'ka',
    lazy: true,
    langDir: 'lang/',
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['gsap', 'vee-validate/dist/rules'],
    extend(config, ctx) {},
  },

  // /* Layout Transitions */
  layoutTransition: {
    name: 'fade',
    mode: 'out-in',
  },
  /* Page Transitions */
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
};
