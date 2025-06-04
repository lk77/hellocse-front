import axios from 'axios';
import {z} from 'zod';

const searchMovieSchema = z.object({
    query: z.string().min(3).max(255),
    page: z.optional(z.preprocess(Number, z.number().min(1))).default('1')
});

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = await getValidatedQuery(event, searchMovieSchema.parse);

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
            query: query.query,
            include_adult: false,
            language: 'en-US',
            page: query.page,
        },
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${config.tmdbAuthKey}`
        }
    };

    return axios.request(options)
        .then(response => response.data)
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