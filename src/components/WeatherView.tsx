import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Details } from './Details';
import { getWeather } from '../utils/getWeatherInfo';
import { Charts } from './Charts';
import { Container, CircularProgress, Typography } from '@mui/material';

interface TimeOfDay {
  timeOfDay: string;
  temp: number;
  feelsLike: number;
  weather: string;
  icon: string;
}

export interface DailyForecast {
  date: string;
  times: TimeOfDay[];
}

export interface ChartData {
  date: string;
  dayTemp: number;
  nightTemp: number;
}

const WeatherView: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [weather, setWeather] = useState<DailyForecast[] | null>(null);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city] = useState<string>('Bishkek');
  const [availableDates, setAvailableDates] = useState<string[]>([]); // Типизация как массив строк

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await getWeather(city);
        setWeather(response.dailyForecast);
        setChartData(response.chartData as ChartData[]);

        const dates = response.dailyForecast.map(
          (item: DailyForecast) => item.date
        );
        setAvailableDates(dates);
      } catch (err) {
        console.error('Ошибка при получении данных о погоде:', err);
        setError(
          'Не удалось получить данные о погоде. Проверьте соединение или попробуйте позже.'
        );
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  return (
    <Container>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab
                label='Детали погоды'
                value='1'
              />
              <Tab
                label='График температуры за 5 дней'
                value='2'
              />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Details
              data={weather || []}
              availableDates={availableDates}
            />
          </TabPanel>
          <TabPanel value='2'>
            <Charts data={chartData || []} />
          </TabPanel>
        </TabContext>
      )}
    </Container>
  );
};

export default WeatherView;
