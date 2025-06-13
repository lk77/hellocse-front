import { expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from "~/components/movies/credits/cast/Card.vue";


it('can display a cast member', async () => {
    const component = await mountSuspended(Card, {
        props: {
            cast: {
                id: 1,
                adult: false,
                name: "actor name",
                original_name: "actor name",
                character: "character name",
                profile_path: 'profile_path',
                popularity: 30,
                gender: 0,
                known_for_department: 'acting',
                cast_id: 1,
                credit_id: "1",
                order: 1
            }
        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test="cast.name"]').text()).toBe('actor name');
    expect(component.find('[data-test="cast.character"]').text()).toBe('character name');
})