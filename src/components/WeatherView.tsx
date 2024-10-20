import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Details } from './Details';
import { getWeather } from '../services/weatherService.js';
import { Charts } from './Charts.js';
import { ChartData, DailyForecast } from '../types/index.js';

const WeatherView: React.FC = () => {
  const [value, setValue] = useState('1');
  const [weather, setWeather] = useState<DailyForecast[] | null>(null);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city] = useState<string>('Bishkek');
  const [availableDates, setAvailableDates] = useState([]); // Для хранения дат

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await getWeather(city);
        setWeather(response.dailyForecast);
        setChartData(response.chartData);

        const dates = response.dailyForecast.map(
          (item: DailyForecast) => item.date
        );
        setAvailableDates(dates);

        console.log(response);
      } catch (err) {
        setError('Не удалось получить данные о погоде');
      }
      setLoading(false);
    };

    fetchWeather();
  }, []);

  return (
    <div className='card'>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab
              label='Детали погоды'
              value='1'
            />
            <Tab
              label='График температуры'
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
    </div>
  );
};

export default WeatherView;
