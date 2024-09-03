import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams(); // Get the movie_id from the React URL that directs to this page
    const [movie, setMovie] = useState(null); // State to store the movie details
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
  
    useEffect(() => {
        // Function to fetch movie details from the backend
        const fetchMovieDetails = async () => {
          try {
            const response = await fetch(`http://localhost:8080/v1/api/movies/${id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch movie details');
            }
            const jsonReponse = await response.json();
            setMovie(jsonReponse.data);
            console.log(jsonReponse.data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMovieDetails(); // Fetch movie details when the component mounts
      }, [id]); // Dependency array with id to re-fetch if the id changes
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!movie) {
        return <div>No movie details found.</div>;
      }

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdropPath}`;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-header" style={{ '--backdrop-url': `url(${backdropUrl})` }}>
        <h1>{movie.title}</h1>
        {/* Add more header content here */}
      </div>
      <div className="movie-detail-content">
        <p>{movie.overview}</p>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default MovieDetail;
