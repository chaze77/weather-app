import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: '40px',
      }}
    >
      <AppBar
        position='fixed'
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #6ba4d0 0%, #2e5571 100%)',
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            Прогноз погоды
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
