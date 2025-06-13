import type {MovieCredit} from "~/types/tmdb/data/credits/MovieCredit";


export interface MovieCredits {
    id: number;
    cast: MovieCredit[]
    crew: MovieCredit[]
}