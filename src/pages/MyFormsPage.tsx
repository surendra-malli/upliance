// // src/pages/MyFormsPage.tsx
// import React from 'react';
// import { Box, Card, CardContent, Typography, Grid, Button, IconButton } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../store';
// import { setCurrentForm, setSavedForms } from '../store/formSlice';
// import { loadAllForms, removeFormById } from '../utils/localStorage';
// import { useNavigate } from 'react-router-dom';
// import DeleteOutline from '@mui/icons-material/DeleteOutline';

// const MyFormsPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const savedForms = useAppSelector(s => s.forms.savedForms);
//   const navigate = useNavigate();

//   React.useEffect(() => { const all = loadAllForms(); dispatch(setSavedForms(all)); }, [dispatch]);

//   const openPreview = (id: string) => {
//     const found = loadAllForms().find(f => f.id === id);
//     if (found) { dispatch(setCurrentForm(found)); navigate('/preview'); }
//   };

//   const onDelete = (id: string) => { removeFormById(id); const all = loadAllForms(); dispatch(setSavedForms(all)); };

//   return (
//     <Box>
//       <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>My Saved Forms</Typography>
//       <Grid container spacing={2}>
//         {savedForms.map(f => (
//           <Grid item md={4} sm={6} xs={12} key={f.id}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant="h6">{f.name || 'Untitled form'}</Typography>
//                 <Typography variant="caption" color="text.secondary">{new Date(f.createdAt).toLocaleString()}</Typography>
//                 <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
//                   <Button variant="outlined" size="small" onClick={() => openPreview(f.id)}>Open Preview</Button>
//                   <IconButton size="small" onClick={() => onDelete(f.id)}><DeleteOutline /></IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//         {savedForms.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>No saved forms yet. Create one in the Create page.</Typography>}
//       </Grid>
//     </Box>
//   );
// };

// export default MyFormsPage;


// src/pages/MyFormsPage.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { setCurrentForm, setSavedForms } from '../store/formSlice';
import { loadAllForms, removeFormById } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

const MyFormsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const savedForms = useAppSelector(s => s.forms.savedForms);
  const navigate = useNavigate();

  React.useEffect(() => { 
    const all = loadAllForms(); 
    dispatch(setSavedForms(all)); 
  }, [dispatch]);

  const openPreview = (id: string) => {
    const found = loadAllForms().find(f => f.id === id);
    if (found) { 
      dispatch(setCurrentForm(found)); 
      navigate('/preview'); 
    }
  };

  const onDelete = (id: string) => { 
    removeFormById(id); 
    const all = loadAllForms(); 
    dispatch(setSavedForms(all)); 
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        My Saved Forms
      </Typography>
      
      {savedForms.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No saved forms yet. Create one in the Create page.
        </Typography>
      ) : (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 2
        }}>
          {savedForms.map(f => (
            <Card key={f.id} elevation={3} sx={{ height: 'fit-content' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {f.name || 'Untitled form'}
                </Typography>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  {new Date(f.createdAt).toLocaleString()}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => openPreview(f.id)}
                    sx={{ textTransform: 'none' }}
                  >
                    Open Preview
                  </Button>
                  
                  <IconButton 
                    size="small" 
                    onClick={() => onDelete(f.id)}
                    color="error"
                    sx={{ ml: 'auto' }}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyFormsPage;