// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    css: ['~/assets/scss/main.scss'],
    modules: [
        '@nuxt/eslint',
        '@nuxt/test-utils/module',
        'vuetify-nuxt-module',
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
        '@pinia/nuxt'
    ],
    eslint: {
        // options here
    },
    vuetify: {
        moduleOptions: {
            /* module specific options */
        },
        vuetifyOptions: {
            /* vuetify options */
        },
    },
    tailwindcss: {
        theme: {
            screens: {
                'xs': {maxWidth: '599px'},
                'sm': '600x',
                'md': '960px',
                'lg': '1280px',
                'xl': '1920px',
                '2xl': '2560px',
            }
        }
    },
    runtimeConfig: {
        tmdbApiKey: process.env.TMDB_API_KEY,
        tmdbAuthKey: process.env.TMDB_AUTH_KEY,
    },
    nitro: {
        publicAssets: [
            {dir: "./../node_modules/tinymce", baseURL: "/assets/tinymce"}
        ]
    }
})