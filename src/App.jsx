import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieSearch from './pages/MovieSearch';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';


const App = () => {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default App;