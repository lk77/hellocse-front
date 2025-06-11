<script setup lang="ts">
import type {MovieDetails} from "~/types/tmdb/data/details/MovieDetails";
import type {MovieCredits} from "~/types/tmdb/data/credits/MovieCredits";

const {movie, credits} = defineProps<{
    movie: MovieDetails,
    credits: MovieCredits,
    comments: object[]
}>()

const imagePrefix = 'https://image.tmdb.org/t/p'

const fullStar = Math.floor(movie.vote_average);
const halfStar = movie.vote_average - fullStar > 0.15 ? 1 : 0;
const emptyStar = 10 - halfStar - fullStar;
</script>

<template>
    <div class="flex flex-col w-full h-full rounded-xl overflow-hidden border-1 border-solid border-yellow-500">
        <div class="flex flex-row w-full h-full" style="z-index:20;">
            <div class="flex flex-col !m-2 sm:!m-5 md:!m-8 overflow-hidden w-full">
                <div class="flex flex-column flex-sm-row flex-wrap">
                    <div class="xl:w-1/12 w-full">
                        <img :src="imagePrefix + '/w154' +  movie.poster_path" alt="movie poster" class="w-[154px] h-auto !m-auto object-cover pt-2 xl:pt-0"/>
                    </div>
                    <div class="flex flex-col xl:w-9/12 xs:w-full pl-5 pt-2 xl:pt-0">
                        <h1 class="font-sans font-bold text-left text-white" :class="movie.title.length < 20 ? 'text-4xl' : 'text-3xl'">
                            {{ movie.title }}
                        </h1>
                        <h3 class="font-sansfont-bold text-left text-white" :class="movie.tagline.length < 50 ? 'text-xl' : 'text-md'">
                            {{ movie.tagline }}
                        </h3>
                        <p class="font-sans font-semibold text-left text-white">
                            {{ (new Date(movie.release_date)).toLocaleDateString('en-US') }}
                        </p>
                        <ul class="flex flex-row flex-wrap flex-wrap py-3">
                            <li class="font-sans font-semibold mr-3 !px-2 bg-yellow-500 text-white rounded-sm text-center mt-1" v-for="genre in movie.genres">
                                {{ genre.name }}
                            </li>
                            <li class="font-sans font-semibold mr-3 !px-2 border-1 text-white rounded-sm text-center mt-1" v-for="companies in movie.production_companies">
                                {{ companies.name }}
                            </li>
                        </ul>
                        <div class="flex flex-row py-1">
                            <v-icon icon="mdi-star" color="yellow-darken-3" v-for="n in fullStar" :key="n"></v-icon>
                            <v-icon icon="mdi-star-half-full" color="yellow-darken-3" v-for="n in halfStar" :key="n"></v-icon>
                            <v-icon icon="mdi-star-outline" color="yellow-darken-3" v-for="n in emptyStar" :key="n"></v-icon>
                            <span class="text-yellow-darken-3 pl-2">({{ movie.vote_count }} votes)</span>
                        </div>
                        <div class="pt-5 xl:min-h-0 overflow-hidden">
                            <p class="!text-left pr-2 h-[100px]">
                                {{ movie.overview }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col w-full xl:w-2/12 p-1">
                        <div class="xl:absolute xl:right-0 -mr-6 w-full sm:w-auto">
                            <MoviesCreditsCrewList :items="credits.crew"></MoviesCreditsCrewList>
                            <MoviesCreditsCastList :items="credits.cast"></MoviesCreditsCastList>
                        </div>
                    </div>
                </div>
                <hr class="xl:hidden !m-2 text-yellow-darken-3"/>
                <div class="flex flex-row sm:w-full xl:w-10/12">
                    <div class="flex w-full">
                        <div class="flex flex-col-reverse xl:flex-row w-full">
                            <div class="w-full xl:w-1/2">
                                <CommentsForm :comments="comments"></CommentsForm>
                            </div>
                            <div class="w-full xl:w-1/2 sm:!pb-5 xl:!pl-5">
                                <ClientOnly>
                                    <CommentsList :comments="comments"></CommentsList>
                                    <template #fallback>
                                        <div>
                                            <v-skeleton-loader
                                                class="w-full"
                                                type="list-item-avatar-three-line,list-item-avatar-three-line,list-item-avatar-three-line"
                                            ></v-skeleton-loader>
                                        </div>
                                    </template>
                                </ClientOnly>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute w-full h-full bg-black backdrop_fade opacity-25 overflow-hidden rounded-xl" style="z-index:10;">
            <img :src="imagePrefix + '/original' + movie.backdrop_path" alt="movie backdrop" class="h-full w-full xs:hidden sm:hidden md:hidden lg:block object-cover"/>
        </div>
    </div>
</template>