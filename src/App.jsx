import React, { useState } from "react";
import Navigation from "./components/Navigation";
import CardCarousel from "./components/CardCarousel";
import Footer from "./components/Footer";
import DeckPage from "./components/DeckPage";
import HarpoonPage from "./components/HarpoonPage";
import WavesPage from "./components/WavesPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "deck":
        return <DeckPage />;
      case "harpoon":
        return <HarpoonPage />;
      case "waves":
        return <WavesPage />;
      case "home":
      default:
        return (
          <>
            {/* Main content */}
            <div className="bodyContent">
              <div id="leftContent">
                <img
                  id="frontSvg"
                  src={`${process.env.PUBLIC_URL}/images/pepe-beach/gifs/input.gif`}
                  alt="Beach Scene"
                />
              </div>

              <div className="rightContentWrapper">
                <CardCarousel isPaused={isNavExpanded} />
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="app">
      {/* Header bar background */}
      <div className="header-bar"></div>

      {/* Navigation system */}
      <Navigation
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        isExpanded={isNavExpanded}
        setIsExpanded={setIsNavExpanded}
      />

      {/* Page content */}
      {renderPage()}
    </div>
  );
}

export default App;
