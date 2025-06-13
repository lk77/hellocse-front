<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import type {MovieResponse} from "~/types/tmdb/response/MovieResponse";
import debounce from 'debounce';

definePageMeta({
    title: 'Movies',
    description: 'List of comments.'
})

const page = await useStorage('movie_page', 0);
const totalPages = await useStorage('movie_total_pages', 1);
const totalResults = await useStorage('movie_total_results', 0);

const items = await useStorage('movie_items', []);

const search = await useStorage('movie_search', "");
const searchKey = await useStorage('movie_search_key', "");


/**
 * Discover popular movie
 */
async function discoverMovie(): Promise<array> {
    const data: MovieResponse = await $fetch('/api/tmdb/discover/movie', {
        query: {
            page: page.value + 1
        }
    })

    page.value = data.page;
    totalPages.value = data.total_pages;
    totalResults.value = data.total_results;

    return data.results;
}

/**
 * Search comments by title
 */
async function searchMovie(): Promise<array> {
    const data: MovieResponse = await $fetch('/api/tmdb/search/movie', {
        query: {
            query: search.value,
            page: page.value + 1
        }
    })

    page.value = data.page;
    totalPages.value = data.total_pages;
    totalResults.value = data.total_results;

    return data.results;
}

/**
 * Search or discover comments as needed
 */
async function api(): Promise<array> {
    if(search.value && search.value.length > 3) {
        return await searchMovie();
    }

    return await discoverMovie();
}

/**
 * Load new comments when needed
 *
 * @param done
 */
async function load({ done }) {
    if(page.value < totalPages.value) {
        // Perform API call
        api().then((res) => {
            items.value.push(...res)

            done('ok')
        }).catch(() => {
            done('error')
        })
    } else {
        done('empty')
    }
}

watch(search, debounce((value) => {
    if(value && value.length > 3) {
        // We empty the movie list when the search change
        // load function will be automatically called
        items.value = [];
        page.value = 0;
        searchKey.value = value;
    } else if(searchKey.value.length > 3) {
        // We go back to discover
        searchKey.value = '';
        items.value = [];
        page.value = 0;
    }
}, 500))
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
            <div class="w-full bg-black border-b-1 border-yellow-500 h-12">
                <v-text-field
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    color="yellow-darken-2"
                    clearable
                    density="compact"
                    tile
                    single-line
                    class="!m-1"
                />
            </div>
            <div class="flex flex-grow w-full h-auto px-4 pt-4">
                <MoviesList :key="searchKey ? searchKey : 'discover'" :items="items" :load="load" :total-pages="totalPages" :total-results="totalResults" />
            </div>

        </div>
    </v-sheet>
</template>