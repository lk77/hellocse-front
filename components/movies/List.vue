<script setup lang="ts">
import type {Movie} from "~/types/tmdb/data/Movie";

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

const groupedItems = computed(() => groupItemsBy(items, nbItems.value));

if (import.meta.client) {
    const computeNbItems = () => {
        if(window.innerWidth < 1280) {
            return 1;
        }

        if(window.innerWidth > 1920) {
            return 3;
        }

        return 2;
    };

    onMounted(() => {
        nbItems.value = computeNbItems();
        window.addEventListener("resize", () => {
            nbItems.value = computeNbItems();
        });
    })
}
</script>

<template>
    <div class="w-full h-full">
        <v-infinite-scroll height="auto" :items="groupedItems"  @load="load" class="flex flex-col flex-wrap">
            <template v-for="(groupedItem, index) in groupedItems" :key="'group-'+index">
                <div class="flex flex-row w-full h-[350px] md:h-[400px]" v-if="groupedItem.length > nbItems - 1">
                    <div class="h-[350px] md:h-[400px] !p-2" v-for="(item, index) in groupedItem" :key="item" :class="{
                        'w-1/3': nbItems === 3,
                        'w-1/2': nbItems === 2,
                        'w-full': nbItems === 1

                    }">
                        <MoviesCard :movie="item" :index="index"/>
                    </div>
                </div>
            </template>
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