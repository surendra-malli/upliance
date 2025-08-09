// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import PreviewPage from './pages/PreviewPage';
import MyFormsPage from './pages/MyFormsPage';
import HomePage from './pages/HomePage';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const TopBar: React.FC = () => {
  const loc = useLocation();
  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ borderBottom: '1px solid rgba(15,17,26,0.06)' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h6"> Upliance.ai</Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Button component={Link} to="/" color={loc.pathname === '/' ? 'primary' : 'inherit'}>Home</Button>
        <Button component={Link} to="/create" color={loc.pathname.startsWith('/create') ? 'primary' : 'inherit'}>Create</Button>
        <Button component={Link} to="/preview" color={loc.pathname === '/preview' ? 'primary' : 'inherit'}>Preview</Button>
        <Button component={Link} to="/myforms" color={loc.pathname === '/myforms' ? 'primary' : 'inherit'}>My Forms</Button>
      </Toolbar>
    </AppBar>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <TopBar />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/myforms" element={<MyFormsPage />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
