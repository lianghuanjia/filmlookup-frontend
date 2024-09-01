import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];


// Function to generate a random date between 2000 and 2010
const generateRandomDate = () => {
  const start = new Date(2000, 0, 1).getTime();  // Start date: January 1, 2000
  const end = new Date(2010, 11, 31).getTime();  // End date: December 31, 2010
  const randomDate = new Date(start + Math.random() * (end - start));
  
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');  // Add 1 because getMonth() is zero-based
  const day = String(randomDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Function to generate a random MM-DD and append it to a given YYYY
const generateRandomMonthDay = (year) => {
  const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'); // Random month between 01-12
  const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');   // Random day between 01-28 (safe for all months)
  
  return `${year}-${randomMonth}-${randomDay}`;
};

// Use it to format the releaseTime. The releaseTime can be in YYYY, or YYYY-MM-DD.
const formatReleaseTime = (releaseTime) => {
  // If releaseTime is null or invalid, generate a full random date
  if (!releaseTime || isNaN(new Date(releaseTime).getTime())) {
    return generateRandomDate();
  }
  
  // If releaseTime is in YYYY format, append a random MM-DD
  if (/^\d{4}$/.test(releaseTime)) {
    return generateRandomMonthDay(releaseTime);
  }

  // If releaseTime is already in YYYY-MM-DD format, return it as is
  return releaseTime;
};

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
              {/* Below is the overall right side part in each block, which contains movie title and release time */}
              <div style={{ // Define the style of the right-side content of each movie block
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start', 
                textAlign: 'left', 
                height: '100%', 
                padding: '20px 0'  // Increased padding at the top and bottom
                }}> 
                <div style={{marginTop:'3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <h2 style={{ margin: 0, fontSize: '19px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {movie.title}
                  </h2>
                  <p style={{ margin: '0 0 0 0', color: 'grey', fontSize: '14px' }}>  
                    {formatReleaseTime(movie.releaseTime)}
                  </p>
                </div>
                
                {movie.overview && (
                  <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <p style={{
                      margin: 0, 
                      color: '#555', 
                      fontSize: '16px', 
                      display: '-webkit-box', 
                      WebkitBoxOrient: 'vertical', 
                      WebkitLineClamp: 2, 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {movie.overview}
                    </p>
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
