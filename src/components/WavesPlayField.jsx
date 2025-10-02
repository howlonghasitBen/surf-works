import React from "react";
import "./WavesPlayField.css";

const WavesPlayField = () => {
  return (
    <div className="playfield-container">
      {/* Opponent's Hand (Hidden) */}
      <div className="opponent-hand-area">
        <div className="hand-card-back"></div>
        <div className="hand-card-back"></div>
        <div className="hand-card-back"></div>
        <div className="hand-card-back"></div>
        <div className="hand-card-back"></div>
      </div>

      {/* Main Battle Field */}
      <div className="battle-field">
        {/* Opponent's 3 Columns (Left) */}
        <div className="player-columns opponent-columns">
          {/* Column 1 - 3 slots */}
          <div className="column-stack slots-3">
            <div className="card-slot"></div>
            <div className="card-slot"></div>
            <div className="card-slot"></div>
          </div>
          {/* Column 2 - 2 slots */}
          <div className="column-stack slots-2">
            <div className="card-slot"></div>
            <div className="card-slot"></div>
          </div>
          {/* Column 3 - 1 slot */}
          <div className="column-stack slots-1">
            <div className="card-slot"></div>
          </div>
        </div>

        {/* Center Yin-Yang Area */}
        <div className="center-yin-yang">
          <div className="yin-yang-container">
            <div className="yin-yang-circle">
              <div className="yin-half"></div>
              <div className="white-side"></div>
              <div className="yang-half"></div>
              <div className="dot-black"></div>
              <div className="dot-white"></div>
            </div>

            {/* Yang Side (Top/Light) - Opponent */}
            <div className="yang-content">
              <div className="player-pfp yang-pfp">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=opponent"
                  alt="Opponent"
                />
              </div>
              <div className="orb mana-orb yang-mana">
                <span className="orb-value">5</span>
              </div>
              <div className="orb type-orb yang-type">
                <span className="orb-value">100</span>
              </div>
            </div>

            {/* Yin Side (Bottom/Dark) - Player */}
            <div className="yin-content">
              <div className="orb mana-orb yin-mana">
                <span className="orb-value">7</span>
              </div>
              <div className="orb type-orb yin-type">
                <span className="orb-value">100</span>
              </div>
              <div className="player-pfp yin-pfp">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=player"
                  alt="Player"
                />
              </div>
            </div>

            {/* VS Label */}
            <div className="vs-label">VS</div>
          </div>
        </div>

        {/* Player's 3 Columns (Right) */}
        <div className="player-columns player-columns-self">
          {/* Column 4 - 1 slot */}
          <div className="column-stack slots-1">
            <div className="card-slot"></div>
          </div>
          {/* Column 5 - 2 slots */}
          <div className="column-stack slots-2">
            <div className="card-slot"></div>
            <div className="card-slot"></div>
          </div>
          {/* Column 6 - 3 slots */}
          <div className="column-stack slots-3">
            <div className="card-slot"></div>
            <div className="card-slot"></div>
            <div className="card-slot"></div>
          </div>
        </div>
      </div>

      {/* Player's Hand */}
      <div className="player-hand-area">
        <div className="hand-card"></div>
        <div className="hand-card"></div>
        <div className="hand-card"></div>
        <div className="hand-card"></div>
        <div className="hand-card"></div>
      </div>
    </div>
  );
};

export default WavesPlayField;
