import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const MovieSearch = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = 'Movie Search';  // Set the title dynamically
  }, []);  // Empty dependency array means this effect runs once, on component mount


  const handleSearch = async (searchedTitle) => {
    if (searchedTitle.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:8080/v1/api/movies?title=${encodeURIComponent(searchedTitle)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Correct the variable name to 'data'
      const data = await response.json();
      console.log('Fetched data:', data);

      const moviesData = data.data || [];  // Extract the movie data array from 'data'
      setMovies(moviesData);

      // Navigate to the results page, passing the search results as state
      navigate(`/results?title=${encodeURIComponent(searchedTitle)}`, { state: { movies: moviesData, searchQuery: searchedTitle } });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default MovieSearch;
