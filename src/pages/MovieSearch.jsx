import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import TurnstileComponent from '../components/TurnstileComponent';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const TURNSTILE_REQUEST_ENDPOINT = import.meta.env.VITE_TURNSTILE_REQUEST_ENDPOINT;

const MovieSearch = () => {
  const navigate = useNavigate();
  const [turnstileToken, setturnstileToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false); // Check if Turnstile is verified


  useEffect(() => {
    document.title = 'Movie Search';  // Set the title dynamically
  }, []);  // Empty dependency array means this effect runs once, on component mount

  const handleTurnstileSuccess = (turnstileToken) => {
    setturnstileToken(turnstileToken);
  };

  // Verify Turnstile token with backend
  const verifyTurnstile = async () => {
    try {
      const response = await fetch(TURNSTILE_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: turnstileToken }), // Send token to backend
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsVerified(true); // If successful, enable search
        alert('CAPTCHA verified successfully. You can now search!');
      } else {
        alert('CAPTCHA verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying CAPTCHA:', error);
      alert('Error verifying CAPTCHA.');
    }
  };

  const handleSearch = async (searchedTitle) => {

    if (!isVerified) {
      alert('Please verify CAPTCHA before searching'); // Ensure CAPTCHA is verified first
      return;
    }

    if (searchedTitle.trim() === '') return;
    
    navigate(`/results?title=${encodeURIComponent(searchedTitle)}&orderBy=rating&direction=desc&page=1`);
  };

  return (
    <div>
      {/* Render Turnstile */}
      <TurnstileComponent
        sitekey={TURNSTILE_SITE_KEY} // Replace with your actual Turnstile site key
        onSuccess={handleTurnstileSuccess} // Set token on successful validation
      />

      {turnstileToken && (
        <button onClick={verifyTurnstile}>Verify CAPTCHA</button>
      )}

      {/* Render SearchBar only after CAPTCHA is solved */}
      {isVerified && <SearchBar onSearch={handleSearch} />}
    </div>
  );
};

export default MovieSearch;
