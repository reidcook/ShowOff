import { createTheme } from '@mui/material/styles';

// Light theme configuration
const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

export { lightTheme, darkTheme };