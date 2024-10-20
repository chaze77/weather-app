import axios from 'axios';
import { API_KEY } from '../settings/setting';


const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Вспомогательная функция для определения части дня
const getTimeOfDay = (dateTime) => {
  const hour = new Date(dateTime).getHours();
  if (hour >= 6 && hour < 12) return 'Утро';
  if (hour >= 12 && hour < 18) return 'День';
  if (hour >= 18 && hour < 24) return 'Вечер';
  return 'Ночь';
};

// Функция для получения данных о погоде и подготовки данных для графика
export const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    });

    const forecastData = response.data.list;

    const dailyForecast = [];
    const chartData = [];

    forecastData.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0]; // Получаем дату (например, '2024-10-20')
      const timeOfDay = getTimeOfDay(entry.dt_txt); // Определяем, какое это время суток

      // Ищем запись для данного дня
      let dayForecast = dailyForecast.find((d) => d.date === date);

      // Если записи для данного дня нет, создаем ее
      if (!dayForecast) {
        dayForecast = { date, times: {} };
        dailyForecast.push(dayForecast);
      }

      // Добавляем прогноз для текущего времени суток, если для этого времени еще нет записи
      if (!dayForecast.times[timeOfDay]) {
        dayForecast.times[timeOfDay] = {
          timeOfDay, // Утро, День, Вечер, Ночь
          temp: entry.main.temp,
          feelsLike: entry.main.feels_like,
          weather: entry.weather[0].description,
          icon: entry.weather[0].icon,
        };
      }

      // Готовим данные для графика: берем температуру для "Дня" и "Ночи"
      if (timeOfDay === 'День' || timeOfDay === 'Ночь') {
        let chartEntry = chartData.find((d) => d.date === date);
        if (!chartEntry) {
          chartEntry = { date, dayTemp: null, nightTemp: null };
          chartData.push(chartEntry);
        }

        if (timeOfDay === 'День') {
          chartEntry.dayTemp = entry.main.temp; // Температура для дня
        }
        if (timeOfDay === 'Ночь') {
          chartEntry.nightTemp = entry.main.temp; // Температура для ночи
        }
      }
    });

    // Подготовленные данные для графика и детализированной погоды
    return {
      dailyForecast: dailyForecast.map((day) => ({
        date: day.date,
        times: Object.values(day.times),
      })),
      chartData: chartData.map((day) => ({
        date: day.date, // Дата
        dayTemp: day.dayTemp, // Температура дня
        nightTemp: day.nightTemp, // Температура ночи
      })),
    };
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    throw error;
  }
};
