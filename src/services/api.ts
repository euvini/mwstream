import axios from "axios";
import { API_KEY } from '@env';

export const key = API_KEY

export const params = {
    api_key: key,
    language: 'en',
}

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params
})

export default api;