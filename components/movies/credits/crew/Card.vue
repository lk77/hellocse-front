<script setup lang="ts">
import type {MovieCredit} from "~/types/tmdb/data/credits/MovieCredit";

const {cast} = defineProps<{
    cast: MovieCredit
}>()

const imagePrefix = 'https://image.tmdb.org/t/p/w45/'
</script>

<template>
    <div class="flex flex-row w-full h-full rounded-xl overflow-hidden border-1 border-solid border-black">
        <div class="w-[20%] h-full bg-yellow-500">
            <img :src="imagePrefix + cast.profile_path" alt="profile poster" class="h-full w-auto">
        </div>
        <div class="flex h-full bg-yellow-500 !p-3" :class="cast.profile_path ? 'w-[80%]' : 'w-full'">
            <div class="flex flex-col overflow-hidden w-full relative">
                <h1 class="font-sans font-bold  font-bold text-left text-black text-md">
                    {{ cast.name }}
                </h1>
                <h3 class="font-sansfont-bold text-left text-black truncate">
                    {{ cast.job }}
                </h3>
            </div>
        </div>
    </div>
</template>