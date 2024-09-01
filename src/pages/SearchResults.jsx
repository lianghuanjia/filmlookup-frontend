import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];

  return (
    <div>
      <h1>Search Results</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: '20px' }}>
              <h2>{movie.title}</h2>
              <p><strong>Directed by:</strong> {movie.directors}</p>
              <p><strong>Release Date:</strong> {new Date(movie.releaseTime).toLocaleDateString()}</p>
              <p><strong>Rating:</strong> {movie.rating}/10</p>
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} 
                alt={`${movie.title} poster`} 
                style={{ width: '100px', marginRight: '10px' }}
              />
              <img 
                src={`https://image.tmdb.org/t/p/w300${movie.backdropPath}`} 
                alt={`${movie.title} backdrop`} 
                style={{ width: '300px' }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
