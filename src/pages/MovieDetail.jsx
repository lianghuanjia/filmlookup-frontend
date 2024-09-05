import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const MovieDetail = () => {
    const castRef = useRef(null);
    const { id } = useParams(); // Get the movie_id from the React URL that directs to this page
    const [movie, setMovie] = useState(null); // State to store the movie details
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const location = useLocation();
    const movieTitle = location.state?.movieTitle || 'Movie Details'; // Get the movie title from the state in the page that directs to this page

    // Dynamically set the document title based on the movie title
    useEffect(() => {
        document.title = movieTitle;
    }, [movieTitle]);
  
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

    const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdropPath}`;
    const posterUrl = `https://image.tmdb.org/t/p/w780${movie.posterPath}`;

    const scrollLeft = () => {
        castRef.current.scrollBy({
          left: -300, // Adjust scroll distance as needed
          behavior: 'smooth',
        });
      };
    
      const scrollRight = () => {
        castRef.current.scrollBy({
          left: 300, // Adjust scroll distance as needed
          behavior: 'smooth',
        });
      };

  return (
    <div className="movie-detail-container">
        <div className="movie-detail-header"
        style={{
            '--backdrop-url': `url("${backdropUrl}")`,  // Ensure the URL is quoted properly
        }}
        >
            <div className="header-left">
                <img src={posterUrl} alt={`${movie.title} Poster`} className="movie-detail-poster-image" />
            </div>
            <div className="header-right">
                <div className="movie-detail-movie-title">
                    {movie.title}
                    <div className="year-after-title">
                        ({movie.releaseTime.slice(0, 4)})
                    </div>
                </div>
                <p className="movie-tagline">
                    {movie.tagline ? `"${movie.tagline}"` : null}
                </p>
                <div className="movie-rating">
                    <Stack spacing={1}>
                        <Rating
                        name="ten-star-rating-read"
                        value={movie.rating}  /* Scale the rating to fit within 5 stars */
                        max={10}
                        precision={0.5}
                        readOnly
                        sx={{
                            "& .MuiRating-iconEmpty": {
                              color: "white"  /* Set the color of the outline to white */
                            },
                          }}
                        />
                    </Stack>
                    <div className="rating-after-stars">
                        {movie.rating.toFixed(1) + " / 10"}
                    </div>
                </div>
                <div className="movie-detail-page-movie-overview">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Overview:</span> 
                    <p className='movie-detail-page-movie-overview-paragraph'>{movie.overview}</p>
                </div>
                <div className="movie-genres">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Genres:</span>
                    <span>{movie.genres}</span>
                </div>
                <div className="movie-runtime">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Running Time:</span>
                    <span>{Math.floor(movie.runtimeMinutes / 60)} hr {movie.runtimeMinutes % 60} min </span>
                </div>
                <div className="movie-release-time">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Release Date:</span>
                    <span>
                        {movie.releaseTime && (() => {
                            const parts = movie.releaseTime.split('-');
                            if (parts.length === 3) {
                            const [year, month, day] = parts;
                            return `${month}/${day}/${year}`;
                            } else if (parts.length === 1) {
                            return parts[0];  // Just return the year if only the year is available
                            }
                        })()}
                    </span>
                </div>
            </div>
        </div>
        <div className="movie-detail-content">
            <div className="movie-detail-content-left">
                <div className="top-movie-crew">Top Movie Crew</div>
                <div className="top-cast-wrapper">
                    <button className="scroll-button left" onClick={scrollLeft}>
                    &lt;
                    </button>
                    <div className="top-cast" ref={castRef}>
                    {movie.crewMemberList.map((member) => (
                        <div className="crew-member" key={member.personId}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${member.profilePath}`}
                            alt={member.name}
                            className="profile-pic"
                        />
                        <div className="name">{member.name}</div>
                        </div>
                    ))}
                    </div>
                    <button className="scroll-button right" onClick={scrollRight}>
                    &gt;
                    </button>
                </div>
            </div>

            <div className="movie-detail-content-right">
                {movie.crewMemberList && movie.crewMemberList.find(member => member.job === 'director') && (
                <div className="director">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Director</span>
                    <span>{movie.crewMemberList.find(member => member.job === 'director').name}</span>
                </div>
                )}
                <div className="budget">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Budget</span>
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget)}</span>
                </div>
                <div className="revenue">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Revenue</span>
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.revenue)}</span>
                </div>
                <div className="other-names-div">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Other names</span>
                    {movie.otherNames && (
                        <div className="other-names-content">
                            {movie.otherNames.split(',').map((name, index) => (
                                <span key={index}>
                                    {name}
                                    <br />
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    </div>
  );
};

export default MovieDetail;
