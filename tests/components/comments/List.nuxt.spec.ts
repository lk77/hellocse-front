import { expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import List from "~/components/comments/List.vue";


it('can display comments', async () => {
    const component = await mountSuspended(List, {
        props: {
            comments: [
                {
                    username: 'userone',
                    rating: 5,
                    message: 'average comment',
                },
                {
                    username: 'usertwo',
                    rating: 7,
                    message: 'better comment',
                }
            ]

        }
    })

    // We should see the comment
    expect(component.find('[data-test=comment-0] [data-test="comment.username"]').text()).toBe('userone')
    expect(component.find('[data-test=comment-0] [data-test="comment.rating"]').text()).toBe('5')
    expect(component.find('[data-test=comment-0] [data-test="element.0"]').text()).toBe('average comment')

    // We should see the other comment
    expect(component.find('[data-test=comment-1] [data-test="comment.username"]').text()).toBe('usertwo')
    expect(component.find('[data-test=comment-1] [data-test="comment.rating"]').text()).toBe('7')
    expect(component.find('[data-test=comment-1] [data-test="element.0"]').text()).toBe('better comment')
})