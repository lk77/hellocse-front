<script setup lang="ts">
const {comment} = defineProps<{
    comment: object
}>()
</script>

<template>
    <div class="flex flex-col w-full h-full rounded-xl overflow-hidden border-1 border-solid border-yellow-500">
        <div class="flex w-full h-full !p-3">
            <div class="flex flex-col overflow-hidden w-full relative">
                <h3 class="font-sansfont-bold text-left text-white">
                   comment: {{ comment.message }}
                </h3>
            </div>
        </div>
    </div>
</template>