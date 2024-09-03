import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const SearchResults = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];

  const generateRandomDate = () => {
    const start = new Date(2000, 0, 1).getTime(); 
    const end = new Date(2010, 11, 31).getTime(); 
    const randomDate = new Date(start + Math.random() * (end - start));
    return randomDate;
  };

  const generateRandomMonthDay = (year) => {
    const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return new Date(year, randomMonth, randomDay);
  };

  const formatDateToHumanReadable = (date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  const formatReleaseTime = (releaseTime) => {
    if (!releaseTime || isNaN(new Date(releaseTime).getTime())) {
      return formatDateToHumanReadable(generateRandomDate());
    }
    if (/^\d{4}$/.test(releaseTime)) {
      return formatDateToHumanReadable(generateRandomMonthDay(releaseTime));
    }
    return formatDateToHumanReadable(new Date(releaseTime));
  };

  return (
    <div>
      <h1>Search Results</h1>
      {movies.length > 0 ? (
        <div className="results-container">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-block">
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
