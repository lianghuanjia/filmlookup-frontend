import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const MovieSearch = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Movie Search';  // Set the title dynamically
  }, []);  // Empty dependency array means this effect runs once, on component mount


  const handleSearch = async (searchedTitle) => {
    if (searchedTitle.trim() === '') return;
      navigate(`/results?title=${encodeURIComponent(searchedTitle)}&orderBy=rating&direction=desc&page=1`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default MovieSearch;
