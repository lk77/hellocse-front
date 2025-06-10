<script setup lang="ts">
import type {MovieCredits} from "~/types/tmdb/data/credits/MovieCredits";

const {items, load} = defineProps<{
    items: MovieCredits[]
}>()

const orderedItems = computed(() => items
    .filter((i) => i.department == 'Directing')
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0,3))
</script>

<template>
    <div class="w-full">
        <div class="flex flex-xs-row flex-sm-row flex-lg-column flex-wrap w-full">
            <template v-for="(item, index) in orderedItems">
                <div class="h-[100px] w-[270px] !p-2 !m-auto sm:!m-0" v-if="item.profile_path" :key="item">
                    <MoviesCreditsCrewCard :cast="item" :index="index"/>
                </div>
            </template>
        </div>
    </div>
</template>