import React, { createRef } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { QueryClientProvider, QueryClient } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import IconButton from '@mui/material/IconButton/IconButton';
import { frFR } from '@mui/material/locale';
import { fr } from 'date-fns/locale';
const queryClient = new QueryClient();

let theme = createTheme(
  {
    palette: {
      mode: 'dark'
    },
    typography: {
      h1: {
        fontSize: '3rem'
      },
      h2: {
        fontSize: '2.2em'
      },
      h3: {
        fontSize: '1.8rem'
      }
    }
  },
  frFR
);
theme = responsiveFontSizes(theme);

const notistackRef = createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
  notistackRef.current?.closeSnackbar(key);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            autoHideDuration={5000}
            dense
            maxSnack={3}
            ref={notistackRef}
            action={(key) => (
              <IconButton onClick={onClickDismiss(key)} size="small" sx={{ color: 'common.white' }}>
                <CloseIcon />
              </IconButton>
            )}>
            <App />
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
