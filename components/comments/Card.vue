<script setup lang="ts">
const {comment} = defineProps<{
    comment: object
}>()
</script>

<template>
    <div class="flex flex-col w-full h-full rounded-xl overflow-hidden border-1 border-solid border-yellow-500">
        <div class="flex w-full h-full !p-3">
            <div class="flex flex-row">
                <div class="m-auto bg-black rounded-full border-1 border-solid border-yellow-500">
                    <v-icon color="yellow-darken-2" icon="mdi-star" size="x-small"></v-icon>
                    {{ comment.rating }}
                </div>
            </div>
            <div class="flex flex-col overflow-hidden w-full relative pl-5">
                <h1 class="text-left text-sm font-italic">{{ comment.username }}</h1>
                <div class="font-sansfont-bold text-left text-white" v-html="comment.message">
                </div>
            </div>
        </div>
    </div>
</template>