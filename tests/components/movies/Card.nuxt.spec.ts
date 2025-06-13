import { expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from "~/components/movies/Card.vue";


it('can display a movie', async () => {
    const component = await mountSuspended(Card, {
        props: {
            movie: {
                id: 1,
                vote_average: 5.3,
                release_date: '2025-06-12',
                poster_path: "poster_path",
                title: "movie title",
                vote_count: 77,
                original_language: 'en-US',
                overview: 'movie overview text',
                adult: false,
                backdrop_path: 'backdrop_path',
                original_title: 'original_title',
                popularity: 50,
                video : false
            },
            imgQuality: 'w300',
            imgWidth: 300,
            imgHeight: 450
        }
    })

    // We check the text
    expect(component.find('[data-test="movie.title"]').text()).toBe('movie title')
    expect(component.find('[data-test="releaseYear"]').text()).toBe('2025')
    expect(component.find('[data-test="movie.vote_count"]').text()).toBe('77 votes')
    expect(component.find('[data-test="movie.original_language"]').text()).toBe('American English')
    expect(component.find('[data-test="movie.overview"]').text()).toBe('movie overview text')

    // We check the stars
    expect(component.findAll('.mdi-star').length).toBe(5)
    expect(component.findAll('.mdi-star-half-full').length).toBe(1)
    expect(component.findAll('.mdi-star-outline').length).toBe(4)
})