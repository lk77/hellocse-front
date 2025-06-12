
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from "~/components/comments/Card.vue";


it('can display a comment', async () => {
    const component = await mountSuspended(Card, {
        props: {
            comment: {
                username: 'test',
                message: '<p>test message<span>child message <strong>gran child</strong></span><h1>another sibling element<br>another</h1></p>',
                rating: 9
            }
        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test="comment.username"]').text()).toBe('test');
    expect(component.find('[data-test="comment.rating"]').text()).toBe('9');

    expect(component.find('[data-test="element.0.0"]').text()).toBe('test message');
    expect(component.find('[data-test="element.0.1.0"]').text()).toBe('child message');
    expect(component.find('[data-test="element.0.1.1.0"]').text()).toBe('gran child');
    expect(component.find('[data-test="element.1.0"]').text()).toBe('another sibling element');
    expect(component.find('[data-test="element.1.2"]').text()).toBe('another');
})

it('is safe from xss injection', async () => {
    const component = await mountSuspended(Card, {
        props: {
            comment: {
                username: 'test',
                message: '<script>alert(\'xss\')</script><img src="x" onerror="alert(\'xss\')">',
                rating: 9
            }
        }
    })

    // no script element should be present
    expect(component.find('[data-test="comment.message"]').html()).toBe('<div class="font-sansfont-bold text-left text-white" data-test="comment.message">\n' +
        '  <!--v-if-->\n' +
        '  <!--v-if-->\n' +
        '</div>')
})