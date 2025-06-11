<script setup lang="ts">
const {comments} = defineProps<{
    comments: object[]
}>()
</script>

<template>
    <div class="w-full h-full">
        <div class="flex flex-col">
            <template v-if="comments.length > 0">
                <div class=" h-[100px] !p-2 w-full" v-for="(comment, index) in comments" :key="index">
                    <CommentsCard :comment="comment"/>
                </div>
            </template>
            <template v-else>
                <h3 class="text-left font-italic text-sm">
                    There is no comment for that movie
                </h3>
            </template>
        </div>
    </div>
</template>