<script setup lang="ts">
import type {MovieDetails} from "~/types/tmdb/data/details/MovieDetails";
import type {MovieCredits} from "~/types/tmdb/data/credits/MovieCredits";

definePageMeta({
    title: 'Movie Details',
    description: 'Details of a movie.'
})

const route = useRoute()
const data = await useFetch('/api/tmdb/movie/'+route.params.movie_id);
const movie: MovieDetails = data.data.value;

const creditsData = await useFetch('/api/tmdb/movie/'+route.params.movie_id+'/credits');
const credits: MovieCredits = creditsData.data.value;
</script>

<template>
    <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center m-auto relative"
        elevation="4"
        height="100%"
        width="100%"
        rounded="xl"
    >
        <div class="flex flex-col w-full h-full">
            <div class="flex flex-grow w-full h-auto">
                <MoviesDetails :movie="movie" :credits="credits"/>
            </div>
        </div>
    </v-sheet>
</template>