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
            <div // The block for each movie result
              key={movie.id}
              style={{
                display: 'flex',
                alignItems: 'center', // Center items vertically
                width: '1000px',       // Fixed width
                height: '120px',      // Fixed height
                border: '1px solid #ddd',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                overflow: 'hidden',   // Ensure content doesn't overflow the block
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                alt={`${movie.title} poster`}
                style={{
                  width: '100px',
                  height: '130px',     // Fix height to keep the image within bounds
                  borderRadius: '4px',
                  marginRight: '20px',
                  objectFit: 'cover',  // Ensure the image covers the area without distortion
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ margin: '0 0 5px 0', fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {movie.title}
                </h2>
                <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
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
