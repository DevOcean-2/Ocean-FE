import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const KAKAO_API_KEY = '6ee6f7e1fd1a8800538a90c96e2b352c';

interface SearchParams {
  query: string;
  page?: number;
  size?: number;
  sort?: 'accuracy' | 'distance';
}

interface SearchResult {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface SearchResponse {
  documents: SearchResult[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region: string[];
      selected_region: string;
    };
    total_count: number;
  };
}

const searchKeyword = async ({
  query,
  page = 1,
  size = 15,
  sort = 'accuracy',
}: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: 'KakaoAK ' + KAKAO_API_KEY,
      },
      params: {
        query,
        page,
        size,
        sort,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status);
      console.error('Response:', error.response?.data);
    }
    throw error;
  }
};

export const useKeywordSearch = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: ['keyword-search', searchParams],
    queryFn: () => searchKeyword(searchParams),
    enabled: !!searchParams.query,
    retry: false, // 실패 시 재시도하지 않음
  });
};
