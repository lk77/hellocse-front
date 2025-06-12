<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { parser } from 'posthtml-parser'

const {comment} = defineProps<{
    comment: object
}>()

const elements = parser(comment.message);

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const isAllowed = (tag) => ['p', 'span', 'strong', 'em', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
</script>

<template>
    <DefineTemplate v-slot="{element, parentKey}">
        <component :is="element.tag" v-if="isAllowed(element.tag)" :style="element.attrs?.style">
            <template v-for="(content,index) in element.content">
                <template v-if="typeof content == 'string'">
                    <span :data-test="'element.' + parentKey + '.' + index">{{ content }}</span>
                </template>
                <ReuseTemplate v-else :key="parentKey + '.' + index" :parentKey="parentKey + '.' + index" :element="content"/>
            </template>
        </component>
    </DefineTemplate>

    <div class="flex flex-col w-full h-full rounded-xl overflow-hidden border-1 border-solid border-yellow-500">
        <div class="flex w-full h-full !p-3">
            <div class="flex flex-row h-[58px]">
                <div class="m-auto bg-black rounded-full border-1 border-solid border-yellow-500" data-test="comment.rating">
                    <v-icon color="yellow-darken-2" icon="mdi-star" size="x-small"/>
                    {{ comment.rating }}
                </div>
            </div>
            <div class="flex flex-col overflow-hidden w-full relative pl-5">
                <h1 class="text-left text-sm font-italic" data-test="comment.username">{{ comment.username }}</h1>
                <div class="font-sansfont-bold text-left text-white" data-test="comment.message">
                    <template v-for="(element, index) in elements">
                        <template v-if="typeof element == 'string'">
                            <span :data-test="'element.' + index">{{ element }}</span>
                        </template>
                        <ReuseTemplate v-else :key="index" :parentKey="index" :element="element"/>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>