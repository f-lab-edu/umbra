import { umbraApi } from '@/lib/umbraApi';
import { convertSnakeToCamelCase } from '@/lib/convert-snake-to-camel-case';

// TODO:  타입 지정

interface SearchMultiResponse {
  id: string;
}

const searchRepository = {
  getSearchMulti: async ({ keyword }: { keyword: string }): Promise<SearchMultiResponse> =>
    umbraApi.get(`/search/multi?query=${keyword}`).then((res) => convertSnakeToCamelCase(res.data)),
};

export { searchRepository };
