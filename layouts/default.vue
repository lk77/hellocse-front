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

watch(route, value => {
    useHead({
        title: value.meta.title,
        meta: [
            { name: 'description', content: value.meta.description }
        ]
    })
}, {deep: true, immediate: true})
</script>

<template>
    <v-app theme="dark">
        <v-app-bar class="px-3" :elevation="2" border="b-lg" color="black" style="border-bottom: 1px solid #e2b000!important;">
            <v-app-bar-title>
                <div  class="flex flex-row">
                    <NuxtLink to="/">
                        <h1 class="">
                            <span class="!pl-1 !py-1 text-white bg-yellow-darken-3">movie</span>
                            <span class="!pr-1 !py-1 text-yellow-darken-3 bg-white">viewer</span>
                        </h1>
                    </NuxtLink>

                    <div class="flex h-[28px]">
                        <p class="flex pl-2  text-sm !m-auto leading-[20px] h-[20px]">
                            <span class="font-italic whitespace-pre">  >  </span>
                            <span class="pl-1">{{route.meta.title}}</span>
                        </p>
                    </div>
                </div>


            </v-app-bar-title>
        </v-app-bar>

        <v-main>
            <v-container class="wh-100 h-100" style="max-width: unset!important">
                <slot/>
            </v-container>
        </v-main>
    </v-app>
</template>