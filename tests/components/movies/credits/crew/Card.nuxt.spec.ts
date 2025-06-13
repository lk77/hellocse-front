import { expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from "~/components/movies/credits/crew/Card.vue";


it('can display crew member', async () => {
    const component = await mountSuspended(Card, {
        props: {
            crew: {
                id: 2,
                name: "director name",
                original_name: "director name",
                job: "director",
                department: 'Directing',
                profile_path: 'profile_path',
                popularity: 50,
                adult: false,
                gender: 0,
                known_for_department: "directing",
                cast_id: 2,
                credit_id: "1",
                order: 2
            }
        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test="crew.name"]').text()).toBe('director name');
    expect(component.find('[data-test="crew.job"]').text()).toBe('director');
})