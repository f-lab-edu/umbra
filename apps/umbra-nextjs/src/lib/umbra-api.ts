import axios from 'axios';

const umbraApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? process.env.TMDB_API_KEY;

umbraApi.interceptors.request.use((config) => {
  const token = TMDB_API_KEY;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { umbraApi };
