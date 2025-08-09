// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0b4b66' },   // tuned color; change to brand if desired
    secondary: { main: '#ff7b54' }, // accent
    background: { default: '#f6f8fb', paper: '#ffffff' },
    text: { primary: '#0b1220', secondary: '#536878' },
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
