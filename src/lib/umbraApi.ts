import axios from 'axios';

const umbraApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

umbraApi.interceptors.request.use((config) => {
  const token = process.env.TMDB_API_KEY;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { umbraApi };
