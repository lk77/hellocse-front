// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    css: ['~/assets/scss/main.scss'],
    modules: [
        '@nuxt/eslint',
        '@nuxt/test-utils',
        'vuetify-nuxt-module',
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
        '@pinia/nuxt'
    ],
    vuetify: {
        moduleOptions: {
            /* module specific options */
        },
        vuetifyOptions: {
            /* vuetify options */
        },
        tailwindcss: {
            // Options
        }
    }
})