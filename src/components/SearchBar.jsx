import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [backdropPath, setBackdropPath] = useState(''); // State to store backdrop path

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  // // Fetch the now playing movies when the component mounts
  // useEffect(() => {
  //   const fetchBackdrop = async () => {
  //     try {
  //       const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmEyOTUwYWYzOWExMjA4M2Y2Y2RlOWI0MzA0ZDY0MiIsIm5iZiI6MTcyMTc3NjU2Ny40NDYzMywic3ViIjoiNWNmNmNkOTdjM2EzNjgwMjU5MWY0YjgxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rKr5jrY4bv6x-Oh7sa3_29S-AhMujk4hw0MaxAN8CFs`
  //         }
  //       });
  //       const data = await response.json();
  //       if (data.results && data.results.length > 0) {
  //         const firstBackdropPath = data.results[0].backdrop_path;
  //         setBackdropPath(firstBackdropPath); // Set the first movie's backdrop path
  //       }
  //     } catch (error) {
  //       console.error('Error fetching backdrop:', error);
  //     }
  //   };

  //   fetchBackdrop();
  // }, []); // Fetch once when the component mounts

  return (
    <div className="search-bar-container"> {/* Add this container */}
      <div style={{ width: '100%', maxWidth: '60vw', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
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
              flex: 1, // Allows input to take available space
            }}
          />
          <IconButton
            onClick={handleSearch}
            style={{
              marginLeft: '-50px', // Adjust this to overlap the button with the input field
              height: '30px', // Match the height of the input field
              borderRadius: '0 16px 16px 0', // Rounded right corners
              color: 'grey',
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
