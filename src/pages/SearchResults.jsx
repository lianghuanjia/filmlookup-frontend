import React, {useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movies = location.state?.movies || [];
  const searchQuery = location.state?.searchQuery || '';

  // Dynamically set the document title based on the search query
  useEffect(() => {
    if (searchQuery) {
      document.title = `Results for: ${searchQuery}`;
    } else {
      document.title = 'Results';
    }
  }, [searchQuery]); // The effect will run whenever the searchQuery changes


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
          />
          <button className="search-bar-button">Search</button>
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
