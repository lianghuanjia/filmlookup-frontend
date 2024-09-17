import React, {useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button, List, ListItemButton, ListItemText, CircularProgress, LinearProgress, Box, Typography, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css'; // Import the CSS file


const options = [
  'Title (A-Z)',
  'Title (Z-A)',
  'Rating (High to Low)',
  'Rating (Low to High)',
  'Release Time (Newest First)',
  'Release Time (Oldest First)'
];

// Create a mapping for the options
const sortingOptionsMap = {
  'Title (A-Z)': { orderBy: 'title', direction: 'asc' },
  'Title (Z-A)': { orderBy: 'title', direction: 'desc' },
  'Rating (Low to High)': { orderBy: 'rating', direction: 'asc' },
  'Rating (High to Low)': { orderBy: 'rating', direction: 'desc' },
  'Release Time (Oldest First)': { orderBy: 'releaseTime', direction: 'asc' },
  'Release Time (Newest First)': { orderBy: 'releaseTime', direction: 'desc' }
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]); 
  const searchQuery = new URLSearchParams(location.search).get('title') || '';  
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [loading, setLoading] = useState(false);

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

  // Fetch movies when searchQuery changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery.trim()) return;
      
      setLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const queryString = params.toString();
        
        const response = await fetch(`http://localhost:8080/v1/api/movies?${queryString}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.data.movies || []);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Default to 'title' for orderBy and 'asc' for direction
    const orderBy = params.get('orderBy') || 'title';
    const direction = params.get('direction') || 'asc';
    
    // Find the matching option in the options array
    const selectedOptionIndex = options.findIndex(
      option => sortingOptionsMap[option].orderBy === orderBy && sortingOptionsMap[option].direction === direction
    );
  
    // Set the selected option based on the URL parameters or defaults
    if (selectedOptionIndex !== -1) {
      setSelectedIndex(selectedOptionIndex);
    }
  }, [window.location.search]); // Run whenever the search query in the URL changes

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
            {props.value === 0 ? '0.0' : props.value.toFixed(1)}
          </Typography>
        </Box>
      </Box>
    );
  };
  

  // Handle input changes in the search bar
  const handleInputChange = (e) => {
    setSearchInput(e.target.value); // Update state with the new input value
  };

  // Handle search button click (or pressing Enter)
  const handleSearch = () => {
    if (searchInput.trim() === '') return;

    // Update the URL and trigger re-fetch by changing the searchQuery in the URL
    const params = new URLSearchParams(window.location.search);
    params.set('title', searchInput);
    navigate(`/results?${params.toString()}`);
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

  // Handle applying sorting options
  const handleApplySorting = () => {
    const { orderBy, direction } = sortingOptionsMap[options[selectedIndex]];
    
    // Use existing params and add sorting info
    const params = new URLSearchParams(window.location.search);
    params.set('title', searchInput); // Keep the current search query
    params.set('orderBy', orderBy);
    params.set('direction', direction);

    // Update the URL with sorting parameters, triggering the useEffect to re-fetch movies
    navigate(`/results?${params.toString()}`);
  };
  

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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch(new URLSearchParams({ title: searchInput }));
              }
            }}  // Check for Enter key press
          />
          <IconButton
            onClick={() => handleSearch(new URLSearchParams({ title: searchInput }))}
            style={{
              marginLeft: '-2.4%', // Adjust this to overlap the button with the input field
              height: '50px', // Match the height of the input field
              color: 'grey',
            }}
            >
            <SearchIcon />
          </IconButton>
        </div>

        <div>
        {loading && (
          // Show linear progress while loading
          <Box sx={{ width: '100%', marginBottom: '10px' }}>
            <LinearProgress variant="indeterminate"/>
          </Box>
        )}
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
            { !loading &&
            movies.length > 0 ? (
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
                {/* Pagination below results */}
                <div className = "pagination-container">
                  <Pagination 
                    count={10}  // totalPages should be calculated based on your movie list size and page size
                    page={5}   // Bind this to the current page state
                    onChange={(event, value) => handlePageChange(value)} // Define this handler for page change
                    shape="rounded"
                    color="primary"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        borderRadius: '50%', // This will force them to be round
                        minWidth: '32px', // Minimum width
                        height: '32px', // Height to match the width for a circular shape
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#B9B9B9",  // Grey background for the selected item
                        color: "white",           // White text for better contrast
                        "&:hover": {
                          backgroundColor: "CBCBCB", // Darker grey when hovering on the selected item
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ) : !loading && (
              <p>No results found.</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default SearchResults;
