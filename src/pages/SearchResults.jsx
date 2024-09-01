import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];

  return (
    <div>
      <h1>Search Results</h1>
      {movies.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                border: '1px solid #ddd',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                alt={`${movie.title} poster`}
                style={{ width: '100px', borderRadius: '4px', marginRight: '20px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ margin: '0 0 10px 0' }}>{movie.title}</h2>
                <p style={{ margin: 0, color: '#555' }}>
                  <strong>Release Date:</strong> {new Date(movie.releaseTime).toLocaleDateString()}
                </p>
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
