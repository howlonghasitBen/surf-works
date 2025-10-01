import React, { useState } from "react";
import Navigation from "./components/Navigation";
import CardCarousel from "./components/CardCarousel";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app">
      {/* Header bar background */}
      <div className="header-bar"></div>

      {/* Navigation system */}
      <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />

      {/* Main content */}
      <div className="bodyContent">
        <div id="leftContent">
          <img
            id="frontSvg"
            src="/images/pepe-beach/gifs/input.gif"
            alt="Beach Scene"
          />
        </div>

        <div className="rightContentWrapper">
          <CardCarousel />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
