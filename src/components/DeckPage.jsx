import React from "react";
import { CARD_DATA } from "../data/cardData";
import MintCard from "./MintCard";
import "./DeckPage.css";

const DeckPage = () => {
  return (
    <div className="deck-page">
      <div className="deck-header">
        <h1 className="deck-title">SURF CARD COLLECTION</h1>
        <p className="deck-subtitle">
          Mint your favorite cards from the Waves Collection
        </p>
      </div>

      <div className="deck-grid">
        {CARD_DATA.map((card) => (
          <MintCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default DeckPage;
