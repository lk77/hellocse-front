import { expect, it } from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import List from "~/components/movies/credits/crew/List.vue";


it('can display crew members in correct order', async () => {
    const component = await mountSuspended(List, {
        props: {
            items: [
                {
                    id: 1,
                    name: "assistant director name",
                    original_name: "assistant director name",
                    job: "assistant director",
                    department: 'Directing',
                    profile_path: 'profile_path',
                    popularity: 30,
                    adult: false,
                    gender: 0,
                    known_for_department: "directing",
                    cast_id: 1,
                    credit_id: "1",
                    order: 1
                },
                {
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
                    id: 1,
                    name: "assistant",
                    original_name: "assistant",
                    job: "assistant",
                    // should not appear
                    department: 'Support',
                    profile_path: 'profile_path',
                    popularity: 60,
                    adult: false,
                    gender: 0,
                    known_for_department: 'technical',
                    cast_id: 1,
                    credit_id: '1',
                    order: 0
                },
                {
                    id: 2,
                    name: "assistant director name",
                    original_name: "assistant director name",
                    job: "assistant director",
                    department: 'Directing',
                    profile_path: 'profile_path',
                    popularity: 30,
                    adult: false,
                    gender: 0,
                    known_for_department: 'directing',
                    cast_id: 2,
                    credit_id: '2',
                    order: 1
                },
                {
                    id: 3,
                    name: "director name",
                    original_name: "director name",
                    job: "director",
                    department: 'Directing',
                    profile_path: 'profile_path',
                    popularity: 50,
                    adult: false,
                    gender: 0,
                    known_for_department: 'directing',
                    cast_id: 3,
                    credit_id: '3',
                    order: 2
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
