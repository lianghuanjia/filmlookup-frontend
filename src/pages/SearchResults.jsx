import React, {useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button, List, ListItemButton, ListItemText } from '@mui/material';
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

  // Handle input changes in the search bar
  const handleInputChange = (e) => {
    setSearchInput(e.target.value); // Update state with the new input value
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchInput.trim()) {
      console.log(`Searching for: ${searchInput}`);
      // Call your search API here and fetch results based on searchInput
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
                      <div className="movie-title">
                        <h2>{movie.title}</h2>
                        <p>{formatReleaseTime(movie.releaseTime)}</p>
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
