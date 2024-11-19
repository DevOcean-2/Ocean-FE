import axios from 'axios';

interface KakaoApiResponse {
  documents: {
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  }[];
}

interface DistrictResult {
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

export const geocodingApi = {
  getDistrictFromCoords: async (lat: number, lng: number): Promise<DistrictResult> => {
    try {
      const response = await axios.get<KakaoApiResponse>(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK 97186e51a8b7ca549b3e76456229ec5e`,
          },
        },
      );

      if (response.data.documents && response.data.documents.length > 0) {
        const document = response.data.documents[0];
        return {
          region_1depth_name: document.region_1depth_name,
          region_2depth_name: document.region_2depth_name,
          region_3depth_name: document.region_3depth_name,
        };
      }
      throw new Error('주소를 찾을 수 없습니다.');
    } catch (error) {
      throw new Error('주소 변환 중 오류가 발생했습니다.');
    }
  },
};
