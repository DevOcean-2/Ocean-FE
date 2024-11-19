import axios from 'axios';

export interface DogBreed {
  id: number;
  name: string;
  // 기타 필요한 breed 관련 필드들
}

export const fetchDogBreeds = async (): Promise<DogBreed[]> => {
  const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/dogbreed');
  return data;
};
