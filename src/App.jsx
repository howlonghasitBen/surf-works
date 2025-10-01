import React, { useState } from 'react';
import Navigation from './components/Navigation';
import CardCarousel from './components/CardCarousel';
import Footer from './components/Footer';
import './App.css';

const HomePage = () => (
  
    
      
    
    
  
);

const WhirlpoolPage = () => (
  
    🌊 Whirlpool Staking
    Stake your SURF tokens to earn rewards!
  
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return ;
      case 'whirlpool':
        return ;
      default:
        return ;
    }
  };

  return (
    
      
      {renderPage()}
      
    
  );
}

export default App;