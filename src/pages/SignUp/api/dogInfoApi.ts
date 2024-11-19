import axios from 'axios';

export interface DogInfo {
  id: number;
  name: string;
}

export const fetchDogBreeds = async (): Promise<DogInfo[]> => {
  const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/dogbreed');
  return data;
};


export const fetchDogDiseases = async (): Promise<DogInfo[]> => {
  const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/disease');
  return data;
};

export const fetchDogVaccination = async (): Promise<DogInfo[]> => {
  const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/vaccination');
  return data;
};

export const fetchDogAllergy = async (): Promise<DogInfo[]> => {
  const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/allergy');
  return data;
};
