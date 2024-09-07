import React, {useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button, List, ListItemButton, ListItemText, CircularProgress, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css'; // Import the CSS file


const options = [
  'Title (A-Z)',
  'Title (Z-A)',
  'Rating (Low to High)',
  'Rating (High to Low)',
  'Release Year (Oldest First)',
  'Release Year (Newest First)'
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movies = location.state?.movies || [];
  const searchQuery = location.state?.searchQuery || '';
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Dropdown state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  // Dynamically set the document title based on the search query
  useEffect(() => {
    if (searchQuery) {
      document.title = `Results for: ${searchQuery}`;
    } else {
      document.title = 'Results';
    }
  }, [searchQuery]); // The effect will run whenever the searchQuery changes

  const CircularProgressWithLabel = (props) => {
    const percentage = (props.value / 10) * 100;
  
    // Conditional color based on score value
    const getColor = (value) => {
      if (value === 0){
        return '#d3d3d3';
      }
      else if (value > 7) {
        return '#48D10C'; // Green
      } else if (value >= 5 && value <= 7) {
        return '#ECD71F'; // Orange
      } else {
        return '#F54B4B'; // Red
      }
    };

    return (
      <Box position="relative" display="inline-flex" sx={{ width: 46, height: 46, marginLeft: 'auto', marginRight: '5%', marginTop: '1%' }}>
        {/* Grey "trail" part */}
        <CircularProgress
          variant="determinate"
          value={100}  // This always renders the full circle as a grey trail
          sx={{
            color: '#e0e0e0',
            width: '100% !important',   // Force override the default size
            height: '100% !important',  // Ensure height matches the box size
            position: 'absolute',
            strokeLinecap: 'round',  // This makes the circle's ends round
          }}
          thickness={6}
        />
        {/* Colored progress part */}
        <CircularProgress
          variant="determinate"
          value={percentage}
          sx={{
            color: getColor(props.value), // Color depending on score, grey for 0
            width: '100% !important',   // Force override the default size
            height: '100% !important',  // Ensure height matches the box size
            strokeLinecap: 'round',  // This makes the circle's ends round
          }}
          thickness={6}
        />
        {/* Centered label */}
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography sx={{ fontSize: '18px', fontWeight: 500 }} component="div" color="textSecondary">
            {props.value === 0 ? '0.0' : props.value}
          </Typography>
        </Box>
      </Box>
    );
  };
  

  // Handle input changes in the search bar
  const handleInputChange = (e) => {
    setSearchInput(e.target.value); // Update state with the new input value
  };

  // Handle search button click
  const handleSearch = async () => {
    if (searchInput.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:8080/v1/api/movies?title=${encodeURIComponent(searchInput)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      const moviesData = data.data || []; // Extract the movie data array from 'data'
      navigate(`/results?title=${encodeURIComponent(searchInput)}`, { state: { movies: moviesData, searchQuery: searchInput } });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Handle dropdown menu click
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null); // Close the dropdown after selection
    console.log(`Selected: ${options[index]}`);
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the dropdown when the menu is closed
  };

  const handleApplySorting = () => {
    console.log("handleApplySorting");
  }
  

  const formatDateToHumanReadable = (date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  const formatReleaseTime = (releaseTime) => {
    // if (!releaseTime || isNaN(new Date(releaseTime).getTime())) {
    //   return formatDateToHumanReadable(generateRandomDate());
    // }
    if (/^\d{4}$/.test(releaseTime)) {
      return releaseTime;
    }
    return formatDateToHumanReadable(new Date(releaseTime));
  };

  const handleMovieClick = (id, title) => {
    navigate(`/movie/${id}`, {state: {movieTitle: title}}); // Navigate to the MovieDetail page with the movie ID and movie title
  };

  return (
    <div className="search-results-contents-other-than-header">
        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <input 
            type="text" 
            placeholder="Search for movies..." 
            className="search-bar-input"
            value={searchInput}
            onChange={handleInputChange}
          />
          <IconButton
            onClick={handleSearch}
            style={{
              marginLeft: '-2.4%', // Adjust this to overlap the button with the input field
              height: '50px', // Match the height of the input field
              color: 'grey',
            }}
            >
            <SearchIcon />
          </IconButton>
        </div>
      
        <div className='search-results-page-below-search-bar'>
          <div className='search-results-page-below-search-bar-left'>
            {/* Dropdown Menu */}
            <List component="nav" aria-label="Dropdown menu">
              <ListItemButton
              aria-haspopup="listbox"
              aria-controls="dropdown-menu"
              aria-label="Select an option"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
              style={{
                width: '100%',          // Set custom width
                border: '1px solid grey', // Add grey border
                borderRadius: '8px',      // Optional: round the corners
              }}
              >
                <ListItemText
                  primary="Sort by:"
                  secondary={options[selectedIndex]}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: 'bold', // Make the primary text bold
                      marginBottom:'2px',
                    },
                  }}
                />
              </ListItemButton>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApplySorting()}
                sx={{
                  marginTop: '10px',  // Space between ListItemButton and Apply Button
                  width: '100%',      // Make button full width to match ListItemButton
                  borderRadius: '8px',
                }}
              >
                APPLY
              </Button>
            </List>
            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{ paper: 'custom-menu' }}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

        </div>

          <div className='search-results-page-below-search-bar-right'>
            {movies.length > 0 ? (
              <div className="results-container">
                {movies.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="movie-block"
                    onClick={() => handleMovieClick(movie.id, movie.title)} // Handle click event
                    style={{ cursor: 'pointer' }}
                    >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                      alt={`${movie.title} poster`}
                      className="movie-poster"
                    />
                    <div className="movie-details">
                      <div className="movie-details-upper-part">
                        <div className="movie-title">
                          <h2>{movie.title}</h2>
                          <p>{formatReleaseTime(movie.releaseTime)}</p>
                        </div>

                        <CircularProgressWithLabel value={movie.rating} />
                      </div>
                      {movie.overview && (
                        <div className="movie-overview">
                          <p>{movie.overview}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default SearchResults;
