<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import { useVuelidate } from '@vuelidate/core'
import { required, alpha, alphaNum, numeric, minLength, maxLength, minValue, maxValue, helpers } from '@vuelidate/validators'

const {comments} = defineProps<{
    comments: object[]
}>();
const emit = defineEmits(['update:comments']);

alphaNum.$validator = helpers.regex(/^[\d\D\w\W\s\S]*$/);

const textField = ref();
const starWidth = ref(60);
const mounted = ref(false);

onMounted(() => {
    starWidth.value = textField.value.clientWidth/10;
    mounted.value = true
})

const initialState = {
    username: '',
    rating: 1,
    message: ''
}

const state = reactive({
    ...initialState,
})

const rules = {
    username: { required, alpha, minLength: minLength(3), maxLength: maxLength(50) },
    rating: { required, numeric, minValue: minValue(1), maxValue: maxValue(10) },
    message: { required, alphaNum, minLength: minLength(3), maxLength: maxLength(500) },
}

const v$ = useVuelidate(rules, state);

function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
    }
}

const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return

    const newComments = [...comments, {
        username: state.username,
        rating: state.rating,
        message: state.message
    }];

    emit('update:comments', newComments);

    clear();
}
</script>

<template>
    <form class="flex flex-row w-full h-full">
        <div class="flex flex-col h-full w-full">
            <div class="flex flex-col h-[100px]">
                <v-text-field
                    ref="textField"
                    v-model="state.username"
                    hide-details="auto"
                    label="Username"
                    required
                    :error-messages="v$.username.$errors.map(e => e.$message)"
                />
            </div>
            <div v-if="starWidth" class="flex flex-col h-[100px] w-full pt-5">
                <v-rating
                    v-model="state.rating"
                    hover
                    length="10"
                    :size="starWidth"
                />
            </div>
            <div class="flex flex-col pt-5 h-[300px] v-input--error">
                <LazyClientOnly>
                    <Editor
                        v-model="state.message"
                        :tinymce-script-src="'/assets/tinymce/tinymce.js'"
                        license-key="3YvmGFw,dfr,@pQ(vQz3yFUBNJweE2x66NPM#{xW1u$%Vv7zh.LpQQeX%p{6T5Ty0"
                        :init="{
                        skin: 'oxide-dark',
                        toolbar_mode: 'sliding',
                        plugins: [],
                        height: 300,
                        valid_elements: '',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | removeformat',
                  }"
                    />
                </LazyClientOnly>
                <div v-if="v$.message.$errors.length > 0" class="v-input__details" role="alert" aria-live="polite">
                    <div class="v-messages">
                        <div class="v-messages__message">{{ v$.message.$errors[0].$message }}</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row pt-5">
                <v-btn
                    class="text-none mb-4 w-2/3"
                    color="yellow-darken-3"
                    size="x-large"
                    variant="flat"
                    block
                    @click="submit"
                >
                    Add a Comment
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