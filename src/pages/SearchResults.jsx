import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movies = location.state?.movies || [];

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

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieDetail page with the movie ID
  };

  return (
    <div className="search-results-contents-other-than-header">
      {/* <h1>Search Results</h1> */}
      {movies.length > 0 ? (
        <div className="results-container">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-block"
              onClick={() => handleMovieClick(movie.id)} // Handle click event
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
