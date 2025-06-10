import type {MovieCredit} from "~/types/tmdb/data/MovieCredit";

export interface MovieCredits {
    id: number;
    cast: MovieCredit[]
    crew: MovieCredit[]
}