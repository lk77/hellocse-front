<script setup lang="ts">
import type {Movie} from "~/types/tmdb/data/Movie";
import debounce from 'debounce';

const {items, load} = defineProps<{
    items: Movie[],
    load: ({ done }) => void
}>()

const nbItems = ref(3);
const imgQuality = ref('w300');
const imgWidth = ref(300);
const imgHeight = ref(imgWidth.value*1.5);


if (import.meta.client) {
    /**
     * Poster qualities
     */
    const qualities = [
        92,
        154,
        185
    ];

    const computeImageProps = () => {
        nbItems.value = Math.floor(window.innerWidth/500);
        imgWidth.value = window.innerWidth / (8 * nbItems.value);

        // ratio 3/2
        imgHeight.value = imgWidth.value*1.5;

        // We find the correct image quality for the image size
        imgQuality.value = 'w' + qualities.find((val) => {
            return val > imgWidth.value;
        })
    }

    onMounted(() => {
        computeImageProps()
        window.addEventListener("resize", debounce(() => {
            computeImageProps()
        }, 100));
    })
}
</script>

<template>
    <div class="w-full h-full">
        <v-infinite-scroll height="auto" :items="items"  class="flex flex-col flex-wrap" @load="load">
            <div class="flex flex-row flex-wrap w-full">
                <div
v-for="(item, index) in items" :key="item" class="!p-2 h-[400px]" :class="{
                        'w-1/3': nbItems === 3,
                        'w-1/2': nbItems === 2,
                        'w-full': nbItems === 1

                    }">
                    <MoviesCard :movie="item" :index="index" :img-quality="imgQuality" :img-width="imgWidth" :img-height="imgHeight"/>
                </div>
            </div>
            <template #empty>
                <v-alert type="warning">No more movies!</v-alert>
            </template>
            <template #error="{ props }">
                <v-alert type="error">
                    <div class="d-flex justify-space-between align-center">
                        Something went wrong...
                        <v-btn
                            color="white"
                            size="small"
                            variant="outlined"
                            v-bind="props"
                        >
                            Retry
                        </v-btn>
                    </div>
                </v-alert>
            </template>
        </v-infinite-scroll>
    </div>
</template>