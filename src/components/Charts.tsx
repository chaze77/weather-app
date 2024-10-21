import dayjs from 'dayjs';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartData } from './WeatherView';
import { Box } from '@mui/material';

interface ChartsProps {
  data: ChartData[] | null;
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Нет данных для отображения графика</p>;
  }

  const rawDates = data.map((item) => new Date(item.date).getTime());

  const dayTemps = data.map((item) => item.dayTemp);
  const nightTemps = data.map((item) => item.nightTemp);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <LineChart
        xAxis={[
          {
            data: rawDates,
            label: 'Дата',
            scaleType: 'time',
            valueFormatter: (date) => dayjs(date).format('DD.MMM'),
          },
        ]}
        series={[
          {
            label: 'Дневная температура',
            data: dayTemps,
          },
          {
            label: 'Ночная температура',
            data: nightTemps,
          },
        ]}
        width={600}
        height={350}
      />
    </Box>
  );
};

export { Charts };
