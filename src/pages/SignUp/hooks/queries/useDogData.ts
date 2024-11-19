import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { DogInfo } from '../../api/dogInfoApi';

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
     }
   ]
 });

 const [diseases, vaccinations, allergies] = results;

 return {
   diseases: diseases.data,
   vaccinations: vaccinations.data,
   allergies: allergies.data,
   isLoading: results.some(result => result.isLoading),
   isError: results.some(result => result.isError)
 };
};

export default useDogData;