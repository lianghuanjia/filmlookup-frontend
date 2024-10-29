import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Handle clicking on Filmlookup to navigate to the movie search page
  const handleMovieDBClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#333', top: 0, left: 0, right: 0 }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: '20px', cursor: 'pointer' }}
            onClick={handleMovieDBClick}
          >
            Filmlookup
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
