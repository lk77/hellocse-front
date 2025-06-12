
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from "~/components/movies/credits/crew/Card.vue";


it('can display crew member', async () => {
    const component = await mountSuspended(Card, {
        props: {
            crew: {
                name: "director name",
                job: "director",
                profile_path: 'profile_path'
            }

        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test="crew.name"]').text()).toBe('director name');
    expect(component.find('[data-test="crew.job"]').text()).toBe('director');
})