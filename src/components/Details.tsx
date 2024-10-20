// import PropTypes from 'prop-types';
// import dayjs from 'dayjs';
// import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

// const Details = ({ data }) => {
//   console.log('data', data);

//   return (
//     <div>
//       <Typography
//         variant='h4'
//         gutterBottom
//         component='h4'
//       >
//         Бишкек
//       </Typography>
//       {data &&
//         data.map((item, index: string) => (
//           <div key={index}>
//             <Typography
//               variant='h4'
//               gutterBottom
//               component='h2'
//               sx={{ color: 'black', fontSize: '1.5rem' }}
//             >
//               {dayjs(item.date).format('DD.MM.YYYY')}
//             </Typography>

//             <Box
//               sx={{
//                 margin: 2,
//                 padding: 2,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 gap: '20px',
//                 flexWrap: 'wrap',
//                 borderRadius: '8px',
//               }}
//             >
//               {item.times &&
//                 item.times.map((time, i: string) => (
//                   <Card
//                     key={i}
//                     sx={{
//                       width: 200,
//                       height: 300,
//                       marginBottom: 2,
//                       display: 'flex',
//                       justifyContent: 'center',
//                       flexDirection: 'column',
//                       backgroundColor: '#5397e2',
//                     }}
//                   >
//                     <CardMedia
//                       component='img'
//                       height='100'
//                       image={`http://openweathermap.org/img/wn/${time.icon}@2x.png`}
//                       alt={time.weather}
//                       sx={{
//                         objectFit: 'contain',
//                         width: 'auto',
//                         height: '100px',
//                       }}
//                     />

//                     <CardContent>
//                       <Typography
//                         gutterBottom
//                         variant='h6' // Уменьшаем размер заголовка
//                         component='div'
//                         sx={{ color: 'white', fontSize: '1.85rem' }} // Делаем текст белым и чуть меньше
//                       >
//                         {time.timeOfDay}
//                       </Typography>

//                       <Typography
//                         variant='body2'
//                         sx={{
//                           color: 'white',
//                           fontSize: '1.85rem',
//                           textAlign: 'left',
//                           fontWeight: '500',
//                         }}
//                       >
//                         {Math.ceil(time.temp)}°C
//                       </Typography>
//                       <Typography
//                         variant='body2'
//                         sx={{
//                           color: 'white',
//                           fontSize: '0.8rem',
//                           textAlign: 'left',
//                         }}
//                       >
//                         {time.weather}
//                       </Typography>
//                       <Typography
//                         variant='body2'
//                         sx={{
//                           color: 'white',
//                           fontSize: '0.8rem',
//                           textAlign: 'left',
//                         }}
//                       >
//                         Ощущается как: {Math.ceil(time.feelsLike)}°C
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </Box>
//           </div>
//         ))}
//     </div>
//   );
// };

// Details.propTypes = {
//   data: PropTypes.array.isRequired,
// };

// export { Details };

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DetailsProps } from '../types';

const Details: React.FC<DetailsProps> = ({ data, availableDates }) => {
  const [selectedDate, setSelectedDate] = useState(availableDates[0] || '');

  const handleDateChange = (event: SelectChangeEvent) => {
    setSelectedDate(event.target.value);
  };

  // Фильтруем данные по выбранной дате
  const filteredWeather = data
    ? data.filter((item) => item.date === selectedDate)
    : [];

  return (
    <div>
      <FormControl
        variant='standard'
        sx={{ minWidth: 120, marginBottom: 2 }}
      >
        <InputLabel id='date-select-label'>Выберите дату</InputLabel>
        <Select
          labelId='date-select-label'
          value={selectedDate}
          onChange={handleDateChange}
        >
          {availableDates.map((date) => (
            <MenuItem
              key={date}
              value={date}
            >
              {dayjs(date).format('DD.MM.YYYY')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        variant='h4'
        gutterBottom
        component='h4'
      >
        Бишкек
      </Typography>

      {filteredWeather.length > 0 ? (
        filteredWeather.map((item, index) => (
          <div key={index}>
            <Typography
              variant='h4'
              gutterBottom
              component='h2'
              sx={{ color: 'black', fontSize: '1.5rem' }}
            >
              {dayjs(item.date).format('DD.MM.YYYY')}
            </Typography>

            <Box
              sx={{
                margin: 2,
                padding: 2,
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                borderRadius: '8px',
              }}
            >
              {item.times &&
                item.times.map((time, i) => (
                  <Card
                    key={i}
                    sx={{
                      width: 200,
                      height: 300,
                      marginBottom: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      backgroundColor: '#5397e2',
                    }}
                  >
                    <CardMedia
                      component='img'
                      height='100'
                      image={`http://openweathermap.org/img/wn/${time.icon}@2x.png`}
                      alt={time.weather}
                      sx={{
                        objectFit: 'contain',
                        width: 'auto',
                        height: '100px',
                      }}
                    />

                    <CardContent>
                      <Typography
                        gutterBottom
                        variant='h6'
                        component='div'
                        sx={{ color: 'white', fontSize: '1.85rem' }}
                      >
                        {time.timeOfDay}
                      </Typography>

                      <Typography
                        variant='body2'
                        sx={{
                          color: 'white',
                          fontSize: '1.85rem',
                          textAlign: 'left',
                          fontWeight: '500',
                        }}
                      >
                        {Math.ceil(time.temp)}°C
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'white',
                          fontSize: '0.8rem',
                          textAlign: 'left',
                        }}
                      >
                        {time.weather}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'white',
                          fontSize: '0.8rem',
                          textAlign: 'left',
                        }}
                      >
                        Ощущается как: {Math.ceil(time.feelsLike)}°C
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </div>
        ))
      ) : (
        <Typography>Нет данных для выбранной даты</Typography>
      )}
    </div>
  );
};

Details.propTypes = {
  data: PropTypes.array.isRequired,
  availableDates: PropTypes.array.isRequired,
};

export { Details };
