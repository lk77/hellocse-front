
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Form from "~/components/comments/Form.vue";


it('can add a comment', async () => {
    const component = await mountSuspended(Form, {
        props: {
            comments: []

        },
        emits: ['update:comments']
    })

    component.vm.state.username = 'test'
    component.vm.state.rating = 9
    component.vm.state.message = 'my message';

    await component.vm.$nextTick();

    expect(component.find('[data-test="state.username"] input[type=text]').wrapperElement._value).toBe('test');

    await component.vm.submit()

    await component.vm.$nextTick();

    expect(component.emitted('update:comments')).toBeTruthy()
})

it('can validate wrong comment', async () => {
    const component = await mountSuspended(Form, {
        props: {
            comments: []

        },
        emits: ['update:comments']
    })

    component.vm.state.username = 'test7'
    component.vm.state.rating = 9
    component.vm.state.message = 'my message';

    await component.vm.$nextTick();

    expect(component.find('[data-test="state.username"] input[type=text]').wrapperElement._value).toBe('test7');

    await component.vm.submit()

    await component.vm.$nextTick();

    expect(component.emitted('update:comments')).toBeFalsy()

    expect(component.find('.v-messages__message').text()).toBe('The value is not alphabetical')
})

it('can clear form', async () => {
    const component = await mountSuspended(Form, {
        props: {
            comments: []

        },
        emits: ['update:comments']
    })

    component.vm.state.username = 'test'
    component.vm.state.rating = 9
    component.vm.state.message = 'my message';

    await component.vm.submit()

    await component.vm.$nextTick();

    // form should be reset by now
    expect(component.vm.state.username).toBe('')
    expect(component.vm.state.rating).toBe(1)
    expect(component.vm.state.message).toBe('')
})