import {mountSuspended} from '@nuxt/test-utils/runtime'
import List from "~/components/movies/credits/cast/List.vue";


it('can display cast members in correct order', async () => {
    const component = await mountSuspended(List, {
        props: {
            items: [
                {
                    name: "actor name",
                    character: "character name",
                    profile_path: 'profile_path',
                    popularity: 30
                },
                {
                    name: "another actor name",
                    character: "another character name",
                    profile_path: 'profile_path',
                    popularity: 50
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