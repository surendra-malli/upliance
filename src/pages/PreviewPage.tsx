// src/pages/PreviewPage.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store';
import PreviewForm from '../components/PreviewForm';

const PreviewPage: React.FC = () => {
  const currentForm = useAppSelector(s => s.forms.currentForm);

  if (!currentForm) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '42vh' }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" mb={1}>No form selected</Typography>
          <Typography color="text.secondary">Go to Create or My Forms, pick a form and open preview.</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <PreviewForm form={currentForm} />
    </Box>
  );
};

export default PreviewPage;
