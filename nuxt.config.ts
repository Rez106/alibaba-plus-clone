// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-swiper",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
    "nuxt3-leaflet",
  ],
});
