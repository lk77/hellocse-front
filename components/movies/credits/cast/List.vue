<script setup lang="ts">
import type {MovieCredits} from "~/types/tmdb/data/credits/MovieCredits";

const {items} = defineProps<{
    items: MovieCredits[]
}>()

const orderedItems = computed(() => [...items]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0,5))
</script>

<template>
    <div class="w-full">
        <div class="flex flex-xs-row flex-sm-row flex-lg-column flex-wrap w-full">
            <template v-for="(item, index) in orderedItems">
                <div v-if="item.profile_path" :key="item" class="h-[100px] sm:w-[270px] w-full !p-2 !m-auto sm:!m-0" :data-test="'cast-'+index">
                    <MoviesCreditsCastCard :cast="item" :index="index"/>
                </div>
            </template>
        </div>
    </div>
</template>