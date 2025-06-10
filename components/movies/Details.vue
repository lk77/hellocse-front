<script setup lang="ts">
import type {MovieDetails} from "~/types/tmdb/data/details/MovieDetails";
import type {MovieCredits} from "~/types/tmdb/data/credits/MovieCredits";

const {movie, credits} = defineProps<{
    movie: MovieDetails,
    credits: MovieCredits
}>()

const imagePrefix = 'https://image.tmdb.org/t/p'

const fullStar = Math.floor(movie.vote_average);
const halfStar = movie.vote_average - fullStar > 0.15 ? 1 : 0;
const emptyStar = 10 - halfStar - fullStar;
</script>

<template>
    <div class="flex flex-col w-full h-full rounded-xl overflow-hidden border-1 border-solid border-yellow-500">
        <div class="flex flex-row w-full h-full" style="z-index:20;">
            <div class="flex flex-col !m-8 overflow-hidden w-full">
                <div class="flex flex-row">
                    <div class="w-1/12">
                        <img :src="imagePrefix + '/w154' +  movie.poster_path" alt="movie poster" class="w-[154px] h-auto m-auto"/>
                    </div>
                    <div class="flex flex-col w-9/12 pl-5">
                        <h1 class="font-sans font-bold text-left text-white" :class="movie.title.length < 20 ? 'text-4xl' : 'text-3xl'">
                            {{ movie.title }}
                        </h1>
                        <h3 class="font-sansfont-bold text-left text-white" :class="movie.tagline.length < 50 ? 'text-xl' : 'text-md'">
                            {{ movie.tagline }}
                        </h3>
                        <p class="font-sans font-semibold text-left text-white">
                            {{ (new Date(movie.release_date)).toLocaleDateString('en-US') }}
                        </p>
                        <ul class="flex flex-row py-3">
                            <li class="font-sans font-semibold mr-3 !px-2 bg-yellow-500 text-white rounded-sm text-center" v-for="genre in movie.genres">
                                {{ genre.name }}
                            </li>
                            <li class="font-sans font-semibold mr-3 !px-2 border-1 text-white rounded-sm text-center" v-for="companies in movie.production_companies">
                                {{ companies.name }}
                            </li>
                        </ul>
                        <div class="flex flex-row py-1">
                            <v-icon icon="mdi-star" color="yellow-darken-3" v-for="n in fullStar" :key="n"></v-icon>
                            <v-icon icon="mdi-star-half-full" color="yellow-darken-3" v-for="n in halfStar" :key="n"></v-icon>
                            <v-icon icon="mdi-star-outline" color="yellow-darken-3" v-for="n in emptyStar" :key="n"></v-icon>
                            <span class="text-yellow-darken-3 pl-2">({{ movie.vote_count }} votes)</span>
                        </div>
                        <div class="pt-5">
                            <p class="!text-left pr-2 h-[100px]">
                                {{ movie.overview }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col w-2/12 p-1">
                        <div class="absolute right-0 -mr-6 w-[300px]" style="margin-right: -50px;">
                            <MoviesCreditsCrewList :items="credits.crew"></MoviesCreditsCrewList>
                            <MoviesCreditsCastList :items="credits.cast"></MoviesCreditsCastList>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row w-10/12">
                    <div class="flex w-full">
                        <div class="flex flex-row w-full ">
                            <div class="w-1/2">
                                <CommentsForm></CommentsForm>
                            </div>
                            <div class="w-1/2 pl-5">
                                <CommentsList></CommentsList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute w-full h-full bg-black backdrop_fade opacity-25" style="z-index:10;">
            <img :src="imagePrefix + '/original' + movie.backdrop_path" alt="movie backdrop" class="h-auto w-full"/>
        </div>
    </div>
</template>