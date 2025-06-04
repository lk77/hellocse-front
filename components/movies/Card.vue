<script setup lang="ts">
import type {Movie} from "~/types/tmdb/data/Movie";

const {movie, index} = defineProps<{
    movie: Movie,
    index: number
}>()

const imagePrefix = 'https://image.tmdb.org/t/p/w300/'

const fullStar = Math.floor(movie.vote_average);
const halfStar = movie.vote_average - fullStar > 0.15 ? 1 : 0;
const emptyStar = 10 - halfStar - fullStar;

const releaseYear = (new Date(movie.release_date)).getFullYear();

const languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
</script>

<template>
    <div class="flex flex-row w-full h-full rounded-xl overflow-hidden border-1 border-solid border-yellow-500">
        <div class="w-[30%] h-full bg-yellow-300">
            <img :src="imagePrefix + movie.poster_path" alt="movie poster" class="h-full w-auto"/>
        </div>
        <div class="flex w-[70%] h-full bg-black">
            <div class="flex flex-col !m-8 overflow-hidden w-full relative">
                <h1 class="font-sans font-bold  font-bold text-left text-white" :class="movie.title.length < 20 ? 'text-4xl' : 'text-3xl'">
                    {{ movie.title }}
                </h1>
                <ul class="flex flex-row py-3">
                    <li class="font-sans font-semibold mr-3 !px-2 bg-yellow-500 text-white rounded-sm text-center">{{ releaseYear }}</li>
                    <li class="font-sans font-semibold mr-3 !px-2 bg-yellow-500 text-white rounded-sm text-center">{{ movie.vote_count }} votes</li>
                    <li class="font-sans font-semibold mr-3 !px-2 bg-yellow-500 text-white rounded-sm text-center">{{ languageNames.of(movie.original_language) }}</li>
                </ul>
                <div class="flex flex-row py-1">
                    <v-icon icon="mdi-star" color="yellow-darken-3" v-for="n in fullStar" :key="n"></v-icon>
                    <v-icon icon="mdi-star-half-full" color="yellow-darken-3" v-for="n in halfStar" :key="n"></v-icon>
                    <v-icon icon="mdi-star-outline" color="yellow-darken-3" v-for="n in emptyStar" :key="n"></v-icon>
                </div>
                <div class="fade">
                    <p class="!text-left pr-2 h-[100px]">
                        {{ movie.overview }}
                    </p>
                </div>
                <div class="flex absolute bottom-[20px]">
                    <div class="text-center">
                        <NuxtLink :to="'/details/'+movie.id">
                            <v-btn
                                color="yellow-darken-3"
                                variant="outlined"
                                prepend-icon="mdi-play-outline"
                            >
                                <template v-slot:prepend>
                                    <v-icon color="yellow-darken-3"></v-icon>
                                </template>

                                See More
                            </v-btn>
                        </NuxtLink>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>