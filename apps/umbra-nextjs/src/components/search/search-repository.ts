import { umbraApi } from '@/lib/umbra-api';
import { convertSnakeToCamelCase } from '../../lib/convert-snake-to-camel-case';

interface Person {
  mediaType: 'person';
  originalName: string;
  profilePath: string;
  name: string;
}

interface Tv {
  mediaType: 'tv';
  originalName: string;
  posterPath: string;
  name: string;
}

interface Movie {
  mediaType: 'movie';
  originalTitle: string;
  posterPath: string;
  name: string;
}

interface SearchMultiResponse {
  results: Array<Person | Tv | Movie>;
}

class SearchMultiResult {
  persons: Person[] = [];
  tvs: Tv[] = [];
  movies: Movie[] = [];

  constructor(data: SearchMultiResponse) {
    data.results.forEach((item) => {
      if (item.mediaType === 'movie') {
        const newItem = {
          ...item,
          name: item.originalTitle,
        };

        this.movies.push(newItem);
        return;
      }

      if (item.mediaType === 'tv') {
        const newItem = {
          ...item,
          name: item.originalName,
        };

        this.tvs.push(newItem);
        return;
      }

      if (item.mediaType === 'person') {
        const newItem = {
          ...item,
          name: item.originalName,
        };

        this.persons.push(newItem);
        return;
      }
    });
  }
}

const searchRepository = {
  getSearchMulti: async ({ keyword }: { keyword: string }): Promise<SearchMultiResult> =>
    umbraApi
      .get(`/search/multi?query=${keyword}`)
      .then((res) => convertSnakeToCamelCase(res.data))
      .then((res) => new SearchMultiResult(res)),
};

export { searchRepository };
export type { Person, Tv, Movie };
