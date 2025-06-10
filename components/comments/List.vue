<script setup lang="ts">
const comments = [
    {username: '', message: 'first comment'},
    {username: '', message: 'second comment'},
    {username: '', message: 'third comment'},
]
</script>

<template>
    <div class="w-full h-full pt-5">
        <h1 class="text-left">
            Comments
        </h1>
        <div class="flex flex-col h-[100px] pt-5">
            <div class=" h-[100px] !p-2 w-[300px]" v-for="(comment, index) in comments" :key="index">
                <CommentsCard :comment="comment"/>
            </div>
        </div>
    </div>
</template>