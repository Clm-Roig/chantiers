import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { QueryClientProvider, QueryClient } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient();

let theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    h1: {
      fontSize: '3.3rem'
    },
    h2: {
      fontSize: '2.6em'
    },
    h3: {
      fontSize: '2.3rem'
    },
    h4: {
      fontSize: '2rem'
    },
    h5: {
      fontSize: '1.7rem'
    },
    h6: {
      fontSize: '1.4rem'
    }
  }
});
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
