<script setup lang="ts">
import type {Movie} from "~/types/tmdb/data/Movie";
import debounce from 'debounce';

const {items, load} = defineProps<{
    items: Movie[],
    load: Function
}>()

function groupItemsBy(items, size) {
    const groupedItems = [];

    for (let i = 0; i < items.length; i += size) {
        groupedItems.push(items.slice(i, i + size));
    }

    return groupedItems;
}

const nbItems = ref(3);
const imgQuality = ref('w300');
const imgWidth = ref(300);
const imgHeight = ref(imgWidth.value*1.5);

const groupedItems = computed(() => groupItemsBy(items, nbItems.value));


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
        <v-infinite-scroll height="auto" :items="items"  @load="load" class="flex flex-col flex-wrap">
            <div class="flex flex-row flex-wrap w-full">
                <div class="!p-2 h-[400px]" v-for="(item, index) in items" :key="item" :class="{
                        'w-1/3': nbItems === 3,
                        'w-1/2': nbItems === 2,
                        'w-full': nbItems === 1

                    }">
                    <MoviesCard :movie="item" :index="index" :imgQuality="imgQuality" :imgWidth="imgWidth" :imgHeight="imgHeight"/>
                </div>
            </div>
            <!--<template v-for="(groupedItem, index) in groupedItems" :key="'group-'+index">
                <div class="flex flex-row w-full h-[400px]" v-if="groupedItem.length > nbItems - 1">
                    <div class="!p-2" v-for="(item, index) in groupedItem" :key="item" :class="{
                        'w-1/3': nbItems === 3,
                        'w-1/2': nbItems === 2,
                        'w-full': nbItems === 1

                    }">
                        <MoviesCard :movie="item" :index="index" :imgQuality="imgQuality" :imgWidth="imgWidth" :imgHeight="imgHeight"/>
                    </div>
                </div>
            </template>-->
            <template v-slot:empty>
                <v-alert type="warning">No more movies!</v-alert>
            </template>
            <template v-slot:error="{ props }">
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