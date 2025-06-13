import { expect, it } from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import Details from "~/components/movies/Details.vue";


it('can display details of a movie', async () => {
    const component = await mountSuspended(Details, {
        props: {
            movie: {
                id: 1,
                imdb_id: '1',
                adult: false,
                vote_average: 5.3,
                release_date: '2025-06-12',
                poster_path: "poster_path",
                title: "movie title",
                original_title: "movie title",
                tagline: "movie tagline",
                vote_count: 77,
                original_language: 'en-US',
                overview: 'movie overview text',
                genres: [
                    {
                        id: 1,
                        name: 'genre1'
                    },
                    {
                        id: 2,
                        name: 'genre2'
                    }
                ],
                production_companies: [
                    {
                        id: 1,
                        name: 'production_company1',
                        logo_path: 'logo_path',
                        origin_country: 'en'
                    },
                    {
                        id: 2,
                        name: 'production_company2',
                        logo_path: 'logo_path',
                        origin_country: 'en'
                    }
                ],
                backdrop_path: 'backdrop_path',
                belongs_to_collection: null,
                budget: 1000,
                homepage: '/home',
                origin_country: ['us'],
                popularity: 40,
                production_countries: [{iso_3166_1: 'us', name: 'USA'}],
                revenue: 1000,
                runtime: 100,
                spoken_languages: [
                    {
                        english_name: 'English',
                        iso_639_1: 'en',
                        name: 'English'
                    }
                ],
                status: 'Released',
                video: false
            },
            credits: {
                id: 1,
                cast: [
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
                ],
                crew: [
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
            },
            comments: [
                {
                    username: 'userone',
                    rating: 5,
                    message: 'average comment',
                },
                {
                    username: 'usertwo',
                    rating: 7,
                    message: 'better comment',
                }
            ]
        }
    })

    // We check the text of the movie
    expect(component.find('[data-test="movie.title"]').text()).toBe('movie title')
    expect(component.find('[data-test="movie.tagline"]').text()).toBe('movie tagline')
    expect(component.find('[data-test="movie.release_date"]').text()).toBe('6/12/2025')
    expect(component.find('[data-test="movie.overview"]').text()).toBe('movie overview text')

    // We check the genres and production companies of the movie
    expect(component.find('[data-test="movie.genres.0"]').text()).toBe('genre1')
    expect(component.find('[data-test="movie.genres.1"]').text()).toBe('genre2')
    expect(component.find('[data-test="movie.production_companies.0"]').text()).toBe('production_company1')
    expect(component.find('[data-test="movie.production_companies.1"]').text()).toBe('production_company2')

    // We check the stars
    expect(component.findAll('[data-test="movie.vote_average"] .mdi-star').length).toBe(5)
    expect(component.findAll('[data-test="movie.vote_average"] .mdi-star-half-full').length).toBe(1)
    expect(component.findAll('[data-test="movie.vote_average"] .mdi-star-outline').length).toBe(4)
    expect(component.find('[data-test="movie.vote_count"]').text()).toBe('(77 votes)')

    //  We verify the cast
    expect(component.find('[data-test=cast-1] [data-test="cast.name"]').text()).toBe('actor name');
    expect(component.find('[data-test=cast-1] [data-test="cast.character"]').text()).toBe('character name');
    expect(component.find('[data-test=cast-0] [data-test="cast.name"]').text()).toBe('another actor name');
    expect(component.find('[data-test=cast-0] [data-test="cast.character"]').text()).toBe('another character name');

    // We verify the crew
    expect(component.find('[data-test=crew-1] [data-test="crew.name"]').text()).toBe('assistant director name');
    expect(component.find('[data-test=crew-1] [data-test="crew.job"]').text()).toBe('assistant director');
    expect(component.find('[data-test=crew-0] [data-test="crew.name"]').text()).toBe('director name');
    expect(component.find('[data-test=crew-0] [data-test="crew.job"]').text()).toBe('director');

    // We verify the comments
    expect(component.find('[data-test=comment-0] [data-test="comment.username"]').text()).toBe('userone')
    expect(component.find('[data-test=comment-0] [data-test="comment.rating"]').text()).toBe('5')
    expect(component.find('[data-test=comment-0] [data-test="element.0"]').text()).toBe('average comment')
    expect(component.find('[data-test=comment-1] [data-test="comment.username"]').text()).toBe('usertwo')
    expect(component.find('[data-test=comment-1] [data-test="comment.rating"]').text()).toBe('7')
    expect(component.find('[data-test=comment-1] [data-test="element.0"]').text()).toBe('better comment')
})