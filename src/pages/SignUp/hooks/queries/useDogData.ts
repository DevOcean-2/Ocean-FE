import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import formatPickerItems from '../../utils/formatPickerItems';

const useDogData = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['diseases'],
        queryFn: async () => {
          const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/disease');
          return data;
        },
      },
      {
        queryKey: ['vaccinations'],
        queryFn: async () => {
          const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/vaccination');
          return data;
        },
      },
      {
        queryKey: ['allergies'],
        queryFn: async () => {
          const { data } = await axios.get('https://balbalm.yubin.dev/user/onboarding/allergy');
          return data;
        },
      },
    ],
  });

  const [diseases, vaccinations, allergies] = results;

  return {
    diseases: formatPickerItems(diseases.data),
    vaccinations: formatPickerItems(vaccinations.data),
    allergies: formatPickerItems(allergies.data),
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
  };
};

export default useDogData;
