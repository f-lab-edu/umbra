import { umbraApi } from '../../lib/umbraApi';
import { convertSnakeToCamelCase } from '../../lib/convert-snake-to-camel-case';

interface Person {
  mediaType: 'person';
  originalName: string;
  profilePath: string;
}

interface Tv {
  mediaType: 'tv';
  originalName: string;
  posterPath: string;
}

interface Movie {
  mediaType: 'movie';
  originalTitle: string;
  posterPath: string;
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
        this.movies.push(item);
        return;
      }

      if (item.mediaType === 'tv') {
        this.tvs.push(item);
        return;
      }

      if (item.mediaType === 'person') {
        this.persons.push(item);
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
