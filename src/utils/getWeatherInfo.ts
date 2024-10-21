import axios from 'axios';
import { API_KEY } from '../constants/setting';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// interfaces
interface WeatherEntry {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface ForecastResponse {
  list: WeatherEntry[];
}

interface TimeOfDayForecast {
  timeOfDay: string;
  temp: number;
  feelsLike: number;
  weather: string;
  icon: string;
}

interface DailyForecast {
  date: string;
  times: TimeOfDayForecast[];
}

interface ChartData {
  date: string;
  dayTemp: number | null;
  nightTemp: number | null;
}

const getTimeOfDay = (dateTime: string): string => {
  const hour = new Date(dateTime).getHours();
  if (hour >= 6 && hour < 12) return 'Утро';
  if (hour >= 12 && hour < 18) return 'День';
  if (hour >= 18 && hour < 24) return 'Вечер';
  return 'Ночь';
};

export const getWeather = async (
  city: string
): Promise<{
  dailyForecast: DailyForecast[];
  chartData: ChartData[];
}> => {
  try {
    const response = await axios.get<ForecastResponse>(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    });

    const forecastData = response.data.list;

    const dailyForecast: DailyForecast[] = [];
    const chartData: ChartData[] = [];

    forecastData.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0];
      const timeOfDay = getTimeOfDay(entry.dt_txt);

      // find date
      let dayForecast = dailyForecast.find((d) => d.date === date);

      if (!dayForecast) {
        dayForecast = { date, times: [] };
        dailyForecast.push(dayForecast);
      }

      // add wheather
      if (!dayForecast.times.find((t) => t.timeOfDay === timeOfDay)) {
        dayForecast.times.push({
          timeOfDay, // Утро, День, Вечер, Ночь
          temp: entry.main.temp,
          feelsLike: entry.main.feels_like,
          weather: entry.weather[0].description,
          icon: entry.weather[0].icon,
        });
      }

      if (timeOfDay === 'День' || timeOfDay === 'Ночь') {
        let chartEntry = chartData.find((d) => d.date === date);
        if (!chartEntry) {
          chartEntry = { date, dayTemp: null, nightTemp: null };
          chartData.push(chartEntry);
        }

        if (timeOfDay === 'День') {
          chartEntry.dayTemp = entry.main.temp;
        }
        if (timeOfDay === 'Ночь') {
          chartEntry.nightTemp = entry.main.temp;
        }
      }
    });

    return {
      dailyForecast: dailyForecast.map((day) => ({
        date: day.date,
        times: day.times,
      })),
      chartData: chartData.map((day) => ({
        date: day.date,
        dayTemp: day.dayTemp,
        nightTemp: day.nightTemp,
      })),
    };
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    throw error;
  }
};
