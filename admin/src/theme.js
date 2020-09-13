import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#A98860',
      dark: '#005f56',
      light: '#33a095',
    },
    secondary: {
      // main: '#90caf9',
      main: '#a96460',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
      paper: '#F0F2F5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      'Source Sans Pro',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h6: {
      fontSize: '1.2rem',
    },
  },
});

export default responsiveFontSizes(theme);
