import { Container } from '@mui/material';
import './App.css';
import WeatherView from './components/WeatherView';

function App() {
  return (
    <div>
      <Container>
        <WeatherView />
      </Container>
    </div>
  );
}

export default App;
