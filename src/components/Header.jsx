import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  const handleMouseEnter = (event, items) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(items);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle clicking on MovieDB to navigate to the movie search page
  const handleMovieDBClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#333', top: 0, left: 0, right: 0 }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" style={{ marginRight: '20px', cursor: 'pointer' }} onClick={handleMovieDBClick}>
            Filmlookup
          </Typography>

          <Button
            color="inherit"
            style={{ textTransform: 'none' }}
            onMouseEnter={(e) => handleMouseEnter(e, ['Action', 'Comedy', 'Drama'])}
            aria-controls="movie-menu"
            aria-haspopup="true"
          >
            Movie
          </Button>

          <Button
            color="inherit"
            style={{ textTransform: 'none' }}
            onMouseEnter={(e) => handleMouseEnter(e, ['Actors', 'Directors'])}
            aria-controls="people-menu"
            aria-haspopup="true"
          >
            People
          </Button>

          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              onMouseLeave: handleClose,
              // Remove `getContentAnchorEl` from here
              onMouseEnter: (e) => e.stopPropagation(), // Prevent flicker by stopping propagation when hovering over the menu
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} onClick={handleClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Login / Sign Up button */}
        <Button color="inherit" style={{ textTransform: 'none' }}>
          Login/Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
