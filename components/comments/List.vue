<script setup lang="ts">
import type {Comment} from "~/types/comments/comment";

const {comments} = defineProps<{
    comments: Comment[]
}>()
</script>

<template>
    <div class="w-full h-full">
        <div class="flex flex-col">
            <template v-if="comments.length > 0">
                <div v-for="(comment, index) in comments" :key="index" class="min-h-[100px] !p-2 w-full" :data-test="'comment-'+index">
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