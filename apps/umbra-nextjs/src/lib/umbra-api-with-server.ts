const BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? process.env.TMDB_API_KEY;

const umbraApiWithServer = async (endpoint: string) => {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export { umbraApiWithServer };
