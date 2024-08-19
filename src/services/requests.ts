import api from './api'

export function getMovieDetail(id: string) {
    return api.get(`/movie/${id}`)
}

export function getTVSerieDetail(id: string) {
    return api.get(`/tv/${id}`)
}

export function getNowPlaying() {
    return api.get("/movie/now_playing")
}

export function getPopularMovies() {
    return api.get("/movie/popular")
}

export function getPopularTVSeries() {
    return api.get("/tv/popular")
}

export function getTopRatedMovies() {
    return api.get("/movie/top_rated")
}

export function getTopRatedTVSeries() {
    return api.get("/tv/top_rated")
}