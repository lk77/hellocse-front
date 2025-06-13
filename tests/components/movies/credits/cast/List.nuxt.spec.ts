import { expect, it } from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import List from "~/components/movies/credits/cast/List.vue";


it('can display cast members in correct order', async () => {
    const component = await mountSuspended(List, {
        props: {
            items: [
                {
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
                },
                {
                    id: 2,
                    adult: false,
                    name: "another actor name",
                    original_name: "another actor name",
                    character: "another character name",
                    profile_path: 'profile_path',
                    popularity: 50,
                    gender: 0,
                    known_for_department: 'acting',
                    cast_id: 2,
                    credit_id: "1",
                    order: 2
                }
            ]

        }
    })

    //  We verify the html of the component
    expect(component.find('[data-test=cast-1] [data-test="cast.name"]').text()).toBe('actor name');
    expect(component.find('[data-test=cast-1] [data-test="cast.character"]').text()).toBe('character name');

    expect(component.find('[data-test=cast-0] [data-test="cast.name"]').text()).toBe('another actor name');
    expect(component.find('[data-test=cast-0] [data-test="cast.character"]').text()).toBe('another character name');
})