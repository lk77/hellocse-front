import axios from 'axios';
import {z} from 'zod';

const movieSchema = z.object({
    movie_id: z.preprocess(Number, z.number().min(1))
});

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const params = await getValidatedRouterParams(event, movieSchema.parse);

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${params.movie_id}`,
        params: {
            language: 'en-US'
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