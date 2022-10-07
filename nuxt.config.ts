// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // ...
  ],
  runtimeConfig: {
    VUE_APP_STRAPI_API_KEY: process.env.VUE_APP_STRAPI_API_KEY,
    VUE_APP_STRAPI_API_URL: process.env.VUE_APP_STRAPI_API_URL,
    public: {
      VUE_APP_STRAPI_IMAGE_URL: process.env.VUE_APP_STRAPI_IMAGE_URL,
    }
  },
  css: ['@/assets/scss/_main.scss'],
})