import {mountSuspended} from '@nuxt/test-utils/runtime'
import List from "~/components/movies/credits/crew/List.vue";


it('can display crew members in correct order', async () => {
    const component = await mountSuspended(List, {
        props: {
            items: [
                {
                    name: "assistant director name",
                    job: "assistant director",
                    department: 'Directing',
                    profile_path: 'profile_path',
                    popularity: 30
                },
                {
                    name: "director name",
                    job: "director",
                    department: 'Directing',
                    profile_path: 'profile_path',
                    popularity: 50
                },

            ]

        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test=crew-1] [data-test="crew.name"]').text()).toBe('assistant director name');
    expect(component.find('[data-test=crew-1] [data-test="crew.job"]').text()).toBe('assistant director');

    expect(component.find('[data-test=crew-0] [data-test="crew.name"]').text()).toBe('director name');
    expect(component.find('[data-test=crew-0] [data-test="crew.job"]').text()).toBe('director');
})

it('can only display directing department', async () => {
    const component = await mountSuspended(List, {
        props: {
            items: [
                {
                    name: "assistant",
                    job: "assistant",
                    // should not appear
                    department: 'Support',
                    profile_path: 'profile_path',
                    popularity: 60
                },
                {
                    name: "assistant director name",
                    job: "assistant director",
                    department: 'Directing',
                    profile_path: 'profile_path',
                    popularity: 30
                },
                {
                    name: "director name",
                    job: "director",
                    department: 'Directing',
                    profile_path: 'profile_path',
                    popularity: 50
                },

            ]

        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test=crew-1] [data-test="crew.name"]').text()).toBe('assistant director name');
    expect(component.find('[data-test=crew-1] [data-test="crew.job"]').text()).toBe('assistant director');

    // We order of the crew members should not change
    expect(component.find('[data-test=crew-0] [data-test="crew.name"]').text()).toBe('director name');
    expect(component.find('[data-test=crew-0] [data-test="crew.job"]').text()).toBe('director');
})
