import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const KAKAO_API_KEY = '6ee6f7e1fd1a8800538a90c96e2b352c';

interface SearchParams {
  query: string;
  page?: number;
  size?: number;
  sort?: 'accuracy' | 'distance';
  x?: string;
  y?: string;
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

interface PlacePhoto {
  photoid: string;
  orgurl: string;
}

interface PlacePhotoCategory {
  photoCount: number;
  categoryName: string;
  list: PlacePhoto[];
}

interface PlaceDetail {
  photo: {
    photoList: PlacePhotoCategory[];
  };
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
  x,
  y,
}: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
      params: {
        query,
        page,
        size,
        sort,
        x,
        y,
      },
    });

    // 각 장소에 대한 상세 정보를 가져옵니다
    const placesWithPhotos = await Promise.all(
      response.data.documents.map(async (place: any) => {
        try {
          const detailResponse = await axios.get(`https://place.map.kakao.com/main/v/${place.id}`, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
          });

          // photo.photoList[0].list에서 이미지 URL을 추출
          const photos =
            detailResponse.data.photo?.photoList?.[0]?.list?.map((photo: any) => photo.orgurl) ||
            [];

          return {
            ...place,
            // 최대 4개의 사진만 사용
            photos: photos.slice(0, 4),
          };
        } catch (error) {
          console.error(`Failed to fetch details for place ${place.id}:`, error);
          return {
            ...place,
            photos: [],
          };
        }
      }),
    );

    return {
      ...response.data,
      documents: placesWithPhotos,
    };
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
    retry: false,
  });
};
