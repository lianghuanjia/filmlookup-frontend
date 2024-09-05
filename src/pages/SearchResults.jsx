import React, {useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css'; // Import the CSS file

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movies = location.state?.movies || [];
  const searchQuery = location.state?.searchQuery || '';
  const [searchInput, setSearchInput] = useState(searchQuery);

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
    console.log(title);
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
              marginLeft: '-50px', // Adjust this to overlap the button with the input field
              height: '50px', // Match the height of the input field
              color: 'grey',
            }}
            >
            <SearchIcon />
          </IconButton>
        </div>
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
  );
};

export default SearchResults;
