import axios from 'axios';
import {z} from 'zod';
import type {MovieResponse} from "~/types/tmdb/response/MovieResponse";

const discoverMovieSchema = z.object({
    page: z.optional(z.preprocess(Number, z.number().min(1))).default('1')
});

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = await getValidatedQuery(event, discoverMovieSchema.parse);

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
            include_adult: false,
            include_video: false,
            language: 'en-US',
            page: query.page,
            sort_by: 'popularity.desc'
        },
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${config.tmdbAuthKey}`
        }
    };

    return axios.request(options)
        .then(response => <MovieResponse> response.data)
        .catch(error => {
            if(error.response) {
                return createError({
                    statusCode: error.response.status,
                    statusMessage: error.response.statusText
                })
            }

            return createError({
                statusCode: 500,
                statusMessage: error.name
            });
        });
})