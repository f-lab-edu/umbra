import { umbraApi } from '@/lib/umbraApi';

// TODO: 응답값 카멜케이스로 변환 및 타입 지정

interface SearchMultiResponse {
  id: string;
}

const searchRepository = {
  getSearchMulti: async ({ keyword }: { keyword: string }): Promise<SearchMultiResponse> =>
    umbraApi.get(`/search/multi?query=${keyword}`).then((res) => res.data),
};

export { searchRepository };
