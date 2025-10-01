import React, { useState } from "react";
import Card from "./Card";
import "./MintCard.css";

const MintCard = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mint-card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Reuse existing Card component */}
      <Card card={card} />

      {/* Coming Soon Footer */}
      <div className="mint-coming-soon">
        <div className="coming-soon-badge">
          <span className="coming-soon-icon">⚡</span>
          <span className="coming-soon-text">MINT COMING SOON!</span>
          <span className="coming-soon-icon">⚡</span>
        </div>
      </div>
    </div>
  );
};

export default MintCard;
