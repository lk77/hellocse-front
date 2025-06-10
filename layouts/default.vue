<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const route = useRoute()

useHead({
    title: route.meta.title,
    meta: [
        { name: 'description', content: route.meta.description }
    ]
})
</script>

<template>
    <v-app theme="dark">
        <v-app-bar class="px-3">
            <v-app-bar-title>{{route.meta.title}}</v-app-bar-title>
        </v-app-bar>

        <v-main>
            <v-container class="h-100">
                <slot/>
            </v-container>
        </v-main>
    </v-app>
</template>