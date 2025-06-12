import {mountSuspended} from '@nuxt/test-utils/runtime'
import List from "~/components/movies/List.vue";


it('can display movies', async () => {
    const component = await mountSuspended(List, {
        props: {
            items: [
                {
                    id: 1,
                    vote_average: 5.3,
                    release_date: '2025-06-12',
                    poster_path: "poster_path",
                    title: "movie title",
                    vote_count: 77,
                    original_language: 'en-US',
                    overview: 'movie overview text'
                },
                {
                    id: 2,
                    vote_average: 8.0,
                    release_date: '2024-06-12',
                    poster_path: "poster_path",
                    title: "another movie title",
                    vote_count: 703,
                    original_language: 'en',
                    overview: 'another movie overview text'
                }
            ],
            load: ({done}) => {
                done('ok')
            }
        }
    })

    // We check the text of the first movie
    expect(component.find('[data-test=movie-0] [data-test="movie.title"]').text()).toBe('movie title')
    expect(component.find('[data-test=movie-0] [data-test="releaseYear"]').text()).toBe('2025')
    expect(component.find('[data-test=movie-0] [data-test="movie.vote_count"]').text()).toBe('77 votes')
    expect(component.find('[data-test=movie-0] [data-test="movie.original_language"]').text()).toBe('American English')
    expect(component.find('[data-test=movie-0] [data-test="movie.overview"]').text()).toBe('movie overview text')

    // We check the stars of the first movie
    expect(component.findAll('[data-test=movie-0] .mdi-star').length).toBe(5)
    expect(component.findAll('[data-test=movie-0] .mdi-star-half-full').length).toBe(1)
    expect(component.findAll('[data-test=movie-0] .mdi-star-outline').length).toBe(4)

    // We check the text of the second movie
    expect(component.find('[data-test=movie-1] [data-test="movie.title"]').text()).toBe('another movie title')
    expect(component.find('[data-test=movie-1] [data-test="releaseYear"]').text()).toBe('2024')
    expect(component.find('[data-test=movie-1] [data-test="movie.vote_count"]').text()).toBe('703 votes')
    expect(component.find('[data-test=movie-1] [data-test="movie.original_language"]').text()).toBe('English')
    expect(component.find('[data-test=movie-1] [data-test="movie.overview"]').text()).toBe('another movie overview text')

    // We check the stars of the second movie
    expect(component.findAll('[data-test=movie-1] .mdi-star').length).toBe(8)
    expect(component.findAll('[data-test=movie-1] .mdi-star-half-full').length).toBe(0)
    expect(component.findAll('[data-test=movie-1] .mdi-star-outline').length).toBe(2)
})