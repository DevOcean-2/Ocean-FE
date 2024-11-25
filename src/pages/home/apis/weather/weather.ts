import axios from 'axios';

export interface WeatherResponse {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;
}

export const weatherApi = {
  getCurrentWeather: async (lat: number, lon: number) => {
    const response = await axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4ffbda309d7dddc15791552503a3dc6`,
    );
    return response.data;
  },
};
