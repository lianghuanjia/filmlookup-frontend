import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ width: '100%', maxWidth: '60vw', margin: '0 auto', position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for movies..."
        className="custom-movie-search-text"
        style={{
          width: '50vw',
          height: '30px',
          padding: '10px 50px 10px 20px', 
          fontSize: '19px',
          border: '1px solid #ccc',
          borderRadius: '30px', // Rounded corners
          outline: 'none',
        }}
      />
      <IconButton
        onClick={handleSearch}
        style={{
          position: 'absolute',
          right: '0px', // Align to the right edge of the input
          top: '0px',
          height: '100%', // Make sure the button spans the full height of the input
          padding: '0px 10px',
          borderRadius: '0 16px 16px 0', // Rounded right corners
          color: 'grey',
        }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
