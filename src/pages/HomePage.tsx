


// // src/pages/HomePage.tsx
// import React from 'react';
// import { Box, Typography, Button, Paper } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { Link } from 'react-router-dom';

// const HomePage: React.FC = () => {
//   return (
//     <Box sx={{ 
//       minHeight: '60vh', 
//       display: 'flex', 
//       flexDirection: 'column', 
//       justifyContent: 'center', // Centers content vertically
//       alignItems: 'center', 
//       background: 'linear-gradient(135deg,#e8f6fb 0%, #f8fafc 100%)', 
//       borderRadius: 6, 
//       p: 4 
//     }}>
//       <Grid 
//         container 
//         spacing={4} 
//         alignItems="center" 
//         justifyContent="center" // Centers Grid items horizontally
//         sx={{ 
//           maxWidth: 1200, // Optional: limit max width
//           width: '100%'
//         }}
//       >
//         <Grid item xs={12} md={7}>
//           <Typography 
//             variant="h4" 
//             gutterBottom 
//             sx={{ 
//               fontWeight: 800, 
//               textAlign: 'center' // Centers the heading text
//             }}
//           >
//             Build smart dynamic forms — fast
//           </Typography>
          
//           <Typography 
//             variant="body1" 
//             color="text.secondary" 
//             sx={{ 
//               mb: 3, 
//               textAlign: 'center' // Centers the description text
//             }}
//           >
//             Create dynamic, validated and derived-field forms with an intuitive UI. Save schemas locally and preview the final form easily.
//           </Typography>
          
//           <Box sx={{ 
//             display: 'flex', 
//             gap: 2, 
//             justifyContent: 'center', // Centers the buttons
//             flexWrap: 'wrap' // Allows buttons to wrap on small screens
//           }}>
//             <Button 
//               component={Link} 
//               to="/create" 
//               variant="contained" 
//               size="large"
//               sx={{
//                 textTransform: 'none', // Removes uppercase transformation
//                 fontWeight: 500
//               }}
//             >
//               Create a Form
//             </Button>
            
//             <Button 
//               component={Link} 
//               to="/myforms" 
//               variant="outlined" 
//               size="large"
//               sx={{
//                 textTransform: 'none', // Removes uppercase transformation
//                 fontWeight: 500
//               }}
//             >
//               View Saved Forms
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default HomePage;

// src/pages/HomePage.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '60vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', 
      background: 'linear-gradient(135deg,#e8f6fb 0%, #f8fafc 100%)', 
      borderRadius: 6, 
      p: 4 
    }}>
      <Box sx={{ 
        maxWidth: 800, // Optional: limit max width
        width: '100%',
        textAlign: 'center'
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 800
          }}
        >
          Build smart dynamic forms — fast
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 3
          }}
        >
          Create dynamic, validated and derived-field forms with an intuitive UI. Save schemas locally and preview the final form easily.
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'center', // Centers the buttons
          flexWrap: 'wrap' // Allows buttons to wrap on small screens
        }}>
          <Button 
            component={Link} 
            to="/create" 
            variant="contained" 
            size="large"
            sx={{
              textTransform: 'none', // Removes uppercase transformation
              fontWeight: 500
            }}
          >
            Create a Form
          </Button>
          
          <Button 
            component={Link} 
            to="/myforms" 
            variant="outlined" 
            size="large"
            sx={{
              textTransform: 'none', // Removes uppercase transformation
              fontWeight: 500
            }}
          >
            View Saved Forms
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;