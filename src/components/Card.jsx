import React, { useState, useRef, useEffect } from "react";
import { CARD_THEMES } from "../data/cardData";
import "./Cards.css";

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const imageAreaRef = useRef(null);

  // Get theme from CARD_THEMES
  const theme = CARD_THEMES[card.theme] || CARD_THEMES.cosmicPurple;

  useEffect(() => {
    const cardElement = cardRef.current;
    const imageArea = imageAreaRef.current;

    if (!cardElement || !imageArea) return;

    let isMoving = false;

    const handleMouseMove = (e) => {
      if (isFlipped) return;

      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const imageRotateX = ((y - centerY) / centerY) * 5;
      const imageRotateY = ((x - centerX) / centerX) * 5;
      imageArea.style.transform = `translateZ(20px) rotateX(${imageRotateX}deg) rotateY(${imageRotateY}deg)`;

      isMoving = true;
    };

    const handleMouseLeave = () => {
      cardElement.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      imageArea.style.transform = "translateZ(0px) rotateX(0deg) rotateY(0deg)";
      isMoving = false;
    };

    const handleClick = () => {
      if (!isMoving) {
        setIsFlipped(!isFlipped);
      }
    };

    cardElement.addEventListener("mousemove", handleMouseMove);
    cardElement.addEventListener("mouseleave", handleMouseLeave);
    cardElement.addEventListener("click", handleClick);

    return () => {
      cardElement.removeEventListener("mousemove", handleMouseMove);
      cardElement.removeEventListener("mouseleave", handleMouseLeave);
      cardElement.removeEventListener("click", handleClick);
    };
  }, [isFlipped]);

  return (
    <div className="card-container">
      <div className={`card ${isFlipped ? "flipped" : ""}`} ref={cardRef}>
        {/* Front Face */}
        <div
          className="card-face card-front"
          style={{ background: theme.background }}
        >
          {/* Header */}
          <div
            className="card-header"
            style={{
              background: theme.header.background,
              color: theme.header.color,
              textShadow: theme.header.textShadow,
              boxShadow: theme.header.boxShadow,
            }}
          >
            <div>
              <div className="mana-cost">
                {card.manaCost.map((mana, idx) => (
                  <div
                    key={idx}
                    className="mana-orb"
                    style={{
                      background: mana.color,
                      color: mana.textColor || "#fff",
                    }}
                  >
                    {mana.value}
                  </div>
                ))}
              </div>
              <div className="card-title">
                {card.name} {card.subtitle}
              </div>
            </div>
            <div
              className="card-level"
              style={{
                background: theme.stat.background,
                color: theme.stat.color,
                boxShadow: theme.stat.boxShadow,
                border: theme.stat.border,
              }}
            >
              LVL {card.level}
            </div>
          </div>

          {/* Image Area */}
          <div
            className="image-area"
            ref={imageAreaRef}
            style={{
              background: theme.imageArea.background,
              border: theme.imageArea.border,
              boxShadow: theme.imageArea.boxShadow,
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}${card.image}`}
              alt={card.name}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Type and Power Section */}
          <div
            className="type-power-section"
            style={{
              background: theme.typeSection.background,
              color: theme.typeSection.color,
              textShadow: theme.typeSection.textShadow,
              boxShadow: theme.header.boxShadow,
            }}
          >
            <div>{card.type}</div>
            {card.stats && (
              <div className="power-stats">
                <div
                  className="stat"
                  style={{
                    background: theme.stat.background,
                    border: theme.stat.border,
                    color: theme.stat.color,
                    boxShadow: theme.stat.boxShadow,
                  }}
                >
                  ATK: {card.stats.attack}
                </div>
                <div
                  className="stat"
                  style={{
                    background: theme.stat.background,
                    border: theme.stat.border,
                    color: theme.stat.color,
                    boxShadow: theme.stat.boxShadow,
                  }}
                >
                  DEF: {card.stats.defense}
                </div>
              </div>
            )}
          </div>

          {/* Flavor Text */}
          <div
            className="flavor-text"
            style={{
              background: theme.flavorText.background,
              color: theme.flavorText.color,
              borderBottom: theme.flavorText.border,
            }}
          >
            <div className="flavor-text-content">{card.flavorText}</div>
            <style>{`
              .flavor-text::before,
              .flavor-text::after {
                color: ${theme.flavorText.accentColor};
              }
            `}</style>
          </div>

          {/* Bottom Section */}
          <div
            className="bottom-section"
            style={{ background: theme.bottomSection.background }}
          >
            <div
              className="artist-info"
              style={{ color: theme.flavorText.color }}
            >
              ◆ {card.artist} ◆
            </div>
            <div
              className="rarity-indicator"
              style={{
                background:
                  theme.rarity?.background ||
                  "linear-gradient(135deg, #dda0dd, #ba55d3)",
                color: theme.rarity?.color || "#1a1a2e",
                border:
                  theme.rarity?.border || "min(0.25vw, 2px) solid #1a1a1a",
                boxShadow:
                  theme.rarity?.boxShadow ||
                  "0 0 min(1.2vw, 10px) rgba(221, 160, 221, 0.5)",
              }}
            >
              ★ {card.rarity} ★
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="card-face card-back">
          <div className="back-content">
            <div className="back-title">SURF</div>
            <div className="back-pattern">
              <div className="cog-container">
                <img
                  src={`${process.env.PUBLIC_URL}/images/nav_cog.svg`}
                  alt="Spinning Cog"
                  className="nav-cog"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/images/nav_cog_innard.png`}
                  alt="Cog Center"
                  className="nav-cog-innard"
                />
              </div>
            </div>
            <div className="back-subtitle">
              LEGENDARY TCG
              <br />◆ WAVES COLLECTION ◆
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
