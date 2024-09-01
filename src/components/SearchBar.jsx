import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <TextField
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for movies..."
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
        fullWidth
      />
    </div>
  );
};

export default SearchBar;
