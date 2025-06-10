<script setup lang="ts">
import type {MovieCredits} from "~/types/tmdb/data/credits/MovieCredits";

const {items, load} = defineProps<{
    items: MovieCredits[]
}>()

const orderedItems = computed(() => items
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0,5))
</script>

<template>
    <div class="w-full">
        <div class="flex flex-col w-full">
            <div class="h-[100px] !p-2" v-for="(item, index) in orderedItems" :key="item">
                <MoviesCreditsCastCard :cast="item" :index="index"/>
            </div>
        </div>
    </div>
</template>