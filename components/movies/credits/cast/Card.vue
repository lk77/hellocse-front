<script setup lang="ts">
const {cast} = defineProps<{
    cast: MovieCredit
}>()

const imagePrefix = 'https://image.tmdb.org/t/p/w45/'
</script>

<template>
    <div class="flex flex-row w-full h-full rounded-xl overflow-hidden border-1 border-solid border-yellow-500 xs:m-auto">
        <div class="w-[20%] h-full bg-black">
            <img :src="imagePrefix + cast.profile_path" alt="profile poster" class="h-full w-auto">
        </div>
        <div class="flex w-[80%] h-full bg-black !p-3">
            <div class="flex flex-col overflow-hidden w-full relative">
                <h1 class="font-sans font-bold  font-bold text-left text-white text-md">
                    {{ cast.name }}
                </h1>
                <h3 class="font-sansfont-bold text-left text-white truncate">
                    {{ cast.character }}
                </h3>
            </div>
        </div>
    </div>
</template>