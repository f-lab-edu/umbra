interface Movie {
  mediaType: 'movie';
  originalTitle: string;
  posterPath: string;
}

interface Tv {
  mediaType: 'tv';
  originalName: string;
  posterPath: string;
}

interface Person {
  mediaType: 'person';
  originalName: string;
  profilePath: string;
}

interface SearchResult {
  profilePath: string;
  name: string;
}

type SearchCategory = 'movies' | 'tvs' | 'persons';

export type { Movie, Tv, Person, SearchCategory, SearchResult };
