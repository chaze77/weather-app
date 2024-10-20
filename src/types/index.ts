export interface TimeOfDay {
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

export interface DetailsProps {
  data: DailyForecast[];
  availableDates: string[];
}

export interface ChartsProps {
  data: ChartData[] | null;
}
