
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from "~/components/movies/credits/cast/Card.vue";


it('can display a cast member', async () => {
    const component = await mountSuspended(Card, {
        props: {
            cast: {
                name: "actor name",
                character: "character name",
                profile_path: 'profile_path'
            }

        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test="cast.name"]').text()).toBe('actor name');
    expect(component.find('[data-test="cast.character"]').text()).toBe('character name');
})