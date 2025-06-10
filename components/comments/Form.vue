<script setup>
import Editor from '@tinymce/tinymce-vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minLength } from '@vuelidate/validators'

const textField = ref();
const starWidth = ref(60);

onMounted(() => {
    starWidth.value = textField.value.clientWidth/10;
})

const initialState = {
    username: '',
    rating: 0,
    message: 'Welcome to TinyMCE!'
}

const state = reactive({
    ...initialState,
})

const rules = {
    username: { required, minLength: minLength(3) },
    rating: { required, numeric },
    message: { required }
}

const v$ = useVuelidate(rules, state);
</script>

<template>
    <form class="flex flex-row w-full h-full">
        <div class="flex flex-col h-full w-full">
            <div class="flex flex-col h-[100px]">
                <v-text-field
                    hide-details="auto"
                    label="Username"
                    ref="textField"
                    v-model="state.username"
                    required
                    :error-messages="v$.username.$errors.map(e => e.$message)"
                ></v-text-field>
            </div>
            <div class="flex flex-col h-[100px] w-full pt-5" v-if="starWidth">
                <v-rating
                    hover
                    length="10"
                    :size="starWidth"
                    v-model="state.rating"
                ></v-rating>
            </div>
            <div class="flex flex-col pt-5 h-[300px]">
                <Editor
                    :tinymceScriptSrc="'/assets/tinymce/tinymce.js'"
                    licenseKey="3YvmGFw,dfr,@pQ(vQz3yFUBNJweE2x66NPM#{xW1u$%Vv7zh.LpQQeX%p{6T5Ty0"
                    :init="{
                        skin: 'oxide-dark',
                        toolbar_mode: 'sliding',
                        plugins: [],
                        height: 300,
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | removeformat',
                  }"
                    v-model="state.message"
                />
            </div>
            <div class="flex flex-row pt-5">
                <v-btn
                    class="text-none mb-4 w-2/3"
                    color="yellow-darken-3"
                    size="x-large"
                    variant="flat"
                    block
                    @click="v$.$validate"
                >
                    Submit
                </v-btn>
            </div>
        </div>
    </form>
</template>

<style lang="css">
.tox-promotion {
    display: none!important
}
</style>