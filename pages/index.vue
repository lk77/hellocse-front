<script setup lang="ts">
import {ref} from 'vue';
import type {MovieResponse} from "~/types/tmdb/response/MovieResponse";
import type {Movie} from "~/types/tmdb/data/Movie";

definePageMeta({
    title: 'Movies',
    description: 'List of movies.'
})


const page = ref(0);
const totalPages = ref(1);
const totalResults = ref(0);

const items = ref([])

async function api(): Promise<array> {
    const data: MovieResponse = await $fetch('/api/tmdb/discover/movie', {
        query: {
            page: page.value + 1
        }
    })

    page.value = data.page;
    //totalPages.value = data.total_pages;
    totalResults.value = data.total_results;

    return data.results;
}

async function load({ done }) {
    if(page.value < totalPages.value) {
        // Perform API call
        api().then((res) => {
            items.value.push(...res)

            done('ok')
        }).catch((err) => {
            done('error')
        })
    } else {
        done('empty')
    }
}
</script>

<template>
    <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center m-auto"
        elevation="4"
        height="100%"
        width="100%"
        rounded
    >
        <div class="flex flex-col w-full h-full">
            <div class="w-full bg-gray-300 h-12">

            </div>
            <div class="flex flex-grow w-full h-auto px-4 pt-4">
                <MoviesList :items="items" :load="load" :totalPages="totalPages" :totalResults="totalResults" />
            </div>

        </div>
    </v-sheet>
</template>