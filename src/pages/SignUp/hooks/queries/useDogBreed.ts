import { useQuery } from '@tanstack/react-query';
import { fetchDogBreeds } from '../../api/dogInfoApi';

export const useDogBreeds = () => {
  return useQuery({
    queryKey: ['dogBreeds'],
    queryFn: fetchDogBreeds,
    select: (data) => {
      const breedsMap = new Map(data.map((breed) => [breed.id, breed.name]));
      return {
        breedsList: data.map((breed) => ({
          id: breed.id,
          label: breed.name,
          value: breed.name,
        })),
        getBreedNameById: (id: number | undefined) => {
          if (!id) return '';
          return breedsMap.get(id) || '';
        },
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
