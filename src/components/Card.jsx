import React, { useState, useRef, useEffect } from "react";

// Card Themes with original gradient definitions
const CARD_THEMES = {
  cosmicPurple: {
    background: `radial-gradient(circle at 20% 30%, rgba(75, 0, 130, 0.4) 0%, transparent 50%),
                 radial-gradient(circle at 80% 70%, rgba(25, 25, 112, 0.5) 0%, transparent 40%),
                 radial-gradient(circle at 60% 10%, rgba(138, 43, 226, 0.3) 0%, transparent 45%),
                 linear-gradient(145deg, #0f0f23, #191970, #1a1a2e)`,
    header: {
      background: `radial-gradient(circle at 25% 50%, rgba(138, 43, 226, 0.6) 0%, transparent 60%),
                   linear-gradient(135deg, #4b0082, #663399, #8a2be2, #4b0082, #301934)`,
      color: "#e6e6fa",
      textShadow: "1px 1px 2px rgba(138, 43, 226, 0.8)",
      boxShadow:
        "0 min(0.5vw, 4px) min(1.8vw, 15px) rgba(138, 43, 226, 0.4), inset 0 min(0.25vw, 2px) 0 rgba(255, 255, 255, 0.2)",
    },
    imageArea: {
      background: `radial-gradient(circle at 30% 20%, rgba(75, 0, 130, 0.5) 0%, transparent 45%),
                   radial-gradient(circle at 70% 80%, rgba(25, 25, 112, 0.4) 0%, transparent 50%),
                   linear-gradient(145deg, #191970, #0f0f23)`,
      border: "min(0.25vw, 2px) solid #4b0082",
      boxShadow: "inset 0 min(0.5vw, 4px) min(1vw, 8px) rgba(0, 0, 0, 0.6)",
    },
    typeSection: {
      background: `radial-gradient(circle at 30% 60%, rgba(138, 43, 226, 0.6) 0%, transparent 55%),
                   linear-gradient(135deg, #4b0082, #663399, #8a2be2, #4b0082, #301934)`,
      color: "#e6e6fa",
      textShadow: "1px 1px 2px rgba(138, 43, 226, 0.8)",
    },
    flavorText: {
      background: `radial-gradient(circle at 40% 30%, rgba(75, 0, 130, 0.4) 0%, transparent 50%),
                   linear-gradient(145deg, #191970, #0f0f23)`,
      color: "#d8bfd8",
      accentColor: "#8a2be2",
      border: "min(0.25vw, 2px) solid #4b0082",
    },
    bottomSection: {
      background: "linear-gradient(135deg, #301934, #4b0082)",
    },
    stat: {
      background: "rgba(0, 0, 0, 0.7)",
      border: "min(0.25vw, 2px) solid #dda0dd",
      color: "#dda0dd",
      boxShadow: "0 0 min(1vw, 8px) rgba(221, 160, 221, 0.4)",
    },
  },
  skyBlue: {
    background: `radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                 radial-gradient(circle at 80% 70%, rgba(173, 216, 230, 0.5) 0%, transparent 40%),
                 radial-gradient(circle at 60% 10%, rgba(240, 248, 255, 0.3) 0%, transparent 45%),
                 linear-gradient(145deg, #e6f3ff, #b8dff0, #d6ebf5)`,
    header: {
      background: `radial-gradient(circle at 25% 50%, rgba(135, 206, 235, 0.6) 0%, transparent 60%),
                   linear-gradient(135deg, #ffffff, #f0f8ff, #87ceeb, #b0e0e6, #e0f6ff)`,
      color: "#2f4f4f",
      textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)",
      boxShadow:
        "0 min(0.5vw, 4px) min(1.8vw, 15px) rgba(135, 206, 235, 0.4), inset 0 min(0.25vw, 2px) 0 rgba(255, 255, 255, 0.6)",
    },
    imageArea: {
      background: `radial-gradient(circle at 30% 20%, rgba(135, 206, 235, 0.5) 0%, transparent 45%),
                   radial-gradient(circle at 70% 80%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                   linear-gradient(145deg, #f0f8ff, #e6f3ff)`,
      border: "min(0.25vw, 2px) solid #87ceeb",
      boxShadow:
        "inset 0 min(0.5vw, 4px) min(1vw, 8px) rgba(135, 206, 235, 0.2)",
    },
    typeSection: {
      background: `radial-gradient(circle at 30% 60%, rgba(135, 206, 235, 0.6) 0%, transparent 55%),
                   linear-gradient(135deg, #ffffff, #f0f8ff, #87ceeb, #b0e0e6, #e0f6ff)`,
      color: "#2f4f4f",
      textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)",
    },
    flavorText: {
      background: `radial-gradient(circle at 40% 30%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                   linear-gradient(145deg, #f0f8ff, #e6f3ff)`,
      color: "#4682b4",
      accentColor: "#87ceeb",
      border: "min(0.25vw, 2px) solid #87ceeb",
    },
    bottomSection: {
      background: "linear-gradient(135deg, #e0f6ff, #b0e0e6)",
    },
    stat: {
      background: "rgba(255, 255, 255, 0.8)",
      border: "min(0.25vw, 2px) solid #4682b4",
      color: "#2f4f4f",
      boxShadow: "0 0 min(1vw, 8px) rgba(135, 206, 235, 0.4)",
    },
  },
  alchemicalRed: {
    background: `radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.4) 0%, transparent 50%),
                 radial-gradient(circle at 80% 70%, rgba(139, 0, 0, 0.5) 0%, transparent 40%),
                 radial-gradient(circle at 60% 10%, rgba(255, 140, 0, 0.3) 0%, transparent 45%),
                 linear-gradient(145deg, #2c1810, #8b0000, #1a0e0a)`,
    header: {
      background: `radial-gradient(circle at 25% 50%, rgba(220, 20, 60, 0.6) 0%, transparent 60%),
                   linear-gradient(135deg, #8b0000, #dc143c, #ff8c00, #8b0000, #4a0e0e)`,
      color: "#ffd700",
      textShadow: "1px 1px 2px rgba(220, 20, 60, 0.8)",
      boxShadow:
        "0 min(0.5vw, 4px) min(1.8vw, 15px) rgba(220, 20, 60, 0.4), inset 0 min(0.25vw, 2px) 0 rgba(255, 215, 0, 0.2)",
    },
    imageArea: {
      background: `radial-gradient(circle at 30% 20%, rgba(220, 20, 60, 0.5) 0%, transparent 45%),
                   radial-gradient(circle at 70% 80%, rgba(139, 0, 0, 0.4) 0%, transparent 50%),
                   linear-gradient(145deg, #8b0000, #2c1810)`,
      border: "min(0.25vw, 2px) solid #dc143c",
      boxShadow: "inset 0 min(0.5vw, 4px) min(1vw, 8px) rgba(0, 0, 0, 0.6)",
    },
    typeSection: {
      background: `radial-gradient(circle at 30% 60%, rgba(220, 20, 60, 0.6) 0%, transparent 55%),
                   linear-gradient(135deg, #8b0000, #dc143c, #ff8c00, #8b0000, #4a0e0e)`,
      color: "#ffd700",
      textShadow: "1px 1px 2px rgba(220, 20, 60, 0.8)",
    },
    flavorText: {
      background: `radial-gradient(circle at 40% 30%, rgba(220, 20, 60, 0.4) 0%, transparent 50%),
                   linear-gradient(145deg, #8b0000, #2c1810)`,
      color: "#ffb347",
      accentColor: "#dc143c",
      border: "min(0.25vw, 2px) solid #dc143c",
    },
    bottomSection: {
      background: "linear-gradient(135deg, #4a0e0e, #8b0000)",
    },
    stat: {
      background: "rgba(0, 0, 0, 0.7)",
      border: "min(0.25vw, 2px) solid #ffd700",
      color: "#ffd700",
      boxShadow: "0 0 min(1vw, 8px) rgba(255, 215, 0, 0.4)",
    },
  },
};

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const imageAreaRef = useRef(null);
  const theme = CARD_THEMES[card.theme] || CARD_THEMES.cosmicPurple;

  useEffect(() => {
    const card = cardRef.current;
    const imageArea = imageAreaRef.current;

    if (!card || !imageArea) return;

    let isMoving = false;

    const handleMouseMove = (e) => {
      if (isFlipped) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Image area parallax
      const imageRotateX = ((y - centerY) / centerY) * 5;
      const imageRotateY = ((x - centerX) / centerX) * 5;
      imageArea.style.transform = `translateZ(20px) rotateX(${imageRotateX}deg) rotateY(${imageRotateY}deg)`;

      isMoving = true;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      imageArea.style.transform = "translateZ(0px) rotateX(0deg) rotateY(0deg)";
      isMoving = false;
    };

    const handleClick = () => {
      if (!isMoving) {
        setIsFlipped(!isFlipped);
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("click", handleClick);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("click", handleClick);
    };
  }, [isFlipped]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        .card-container {
          width: 330px;
          height: 440px;
          perspective: 1000px;
          margin: min(1.2vw, 10px);
        }
        
        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
          cursor: pointer;
        }
        
        .card.flipped {
          transform: rotateY(180deg) !important;
        }
        
        .card:active {
          cursor: grabbing;
        }
        
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          border-radius: min(1.8vw, 14px);
          overflow: hidden;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          top: 0;
          left: 0;
        }
        
        .card-front {
          transform: rotateY(0deg);
          z-index: 2;
        }
        
        .card-back {
          background: radial-gradient(circle at center, #1a2a40, #0a1a2e),
                      conic-gradient(from 45deg, #00bfff, #4682b4, #87ceeb, #00bfff);
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        
        .card-header {
          border-bottom: min(0.4vw, 3px) solid #1a1a2e;
          padding: min(1vw, 8px) min(1.5vw, 12px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Cinzel', serif;
          flex-shrink: 0;
          position: relative;
        }
        
        .card-title {
          font-size: min(1rem, 20px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .card-level {
          background: linear-gradient(135deg, #dda0dd, #ba55d3, #9370db);
          color: #1a1a2e;
          padding: min(0.5vw, 4px) min(1vw, 8px);
          border-radius: min(1.5vw, 12px);
          font-size: min(1rem, 16px);
          font-weight: 700;
          border: min(0.25vw, 2px) solid #1a1a2e;
          box-shadow: 0 0 min(1.5vw, 12px) rgba(221, 160, 221, 0.6);
        }
        
        .mana-cost {
          display: flex;
          gap: min(0.5vw, 4px);
          margin-bottom: min(0.5vw, 4px);
        }
        
        .mana-orb {
          width: min(3vw, 24px);
          height: min(3vw, 24px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: min(0.65rem, 16px);
          font-weight: bold;
          border: min(0.25vw, 2px) solid #1a1a1a;
          box-shadow: 0 min(0.25vw, 2px) min(0.5vw, 4px) rgba(0, 0, 0, 0.3);
        }
        
        .image-area {
          height: 40%;
          margin: min(1.2vw, 10px);
          border-radius: min(1vw, 8px);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: -1000px;
          transition: transform 0.1s ease-out;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .image-area img {
          width: 100%;
          height: auto;
          transform: scale(1.2);
          object-fit: contain;
        }
        
        .type-power-section {
          padding: min(1.2vw, 10px) min(2vw, 16px);
          font-family: 'Cinzel', serif;
          font-size: min(2rem, 12px);
          font-weight: 600;
          border-top: min(0.25vw, 2px) solid #1a1a2e;
          border-bottom: min(0.25vw, 2px) solid #1a1a2e;
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .power-stats {
          font-size: min(2rem, 8px);
          display: flex;
          gap: min(1.5vw, 12px);
        }
        
        .stat {
          padding: min(0.5vw, 4px) min(1vw, 8px);
          border-radius: min(0.5vw, 4px);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        }
        
        .flavor-text {
          padding: 0 min(2vw, 16px);
          font-size: min(2rem, 18px);
          line-height: 1.4;
          text-align: center;
          font-style: italic;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          position: relative;
        }
        
        .flavor-text::before {
          content: '"';
          font-size: min(2rem, 24px);
          position: absolute;
          top: min(-0.25vw, -2px);
          left: min(1vw, 8px);
          opacity: 0.4;
        }
        
        .flavor-text::after {
          content: '"';
          font-size: min(2rem, 24px);
          position: absolute;
          bottom: min(-1vw, -8px);
          right: min(1vw, 8px);
          opacity: 0.4;
        }
        
        .flavor-text-content {
          white-space: pre-line;
        }
        
        .bottom-section {
          padding: min(1.2vw, 10px) min(2vw, 16px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        
        .artist-info {
          font-size: min(1rem, 12px);
          font-family: 'Cinzel', serif;
          opacity: 0.8;
        }
        
        .rarity-indicator {
          background: linear-gradient(135deg, #dda0dd, #ba55d3);
          color: #1a1a2e;
          padding: min(0.5vw, 4px) min(1vw, 8px);
          border-radius: min(1vw, 8px);
          font-size: min(1.2vw, 14px);
          font-weight: 700;
          border: min(0.25vw, 2px) solid #1a1a1a;
          box-shadow: 0 0 min(1.2vw, 10px) rgba(221, 160, 221, 0.5);
          font-family: 'Cinzel', serif;
          letter-spacing: 0.1em;
        }
        
        .back-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: white;
        }
        
        .back-title {
          font-size: min(12vw, 64px);
          font-weight: 700;
          margin-bottom: min(2vw, 20px);
          color: #00bfff;
          font-family: 'Cinzel', serif;
          text-shadow: 0 0 min(2vw, 20px) rgba(0, 191, 255, 0.5);
        }
        
        .back-pattern {
          position: relative;
          width: min(20vw, 120px);
          height: min(20vw, 120px);
          margin: min(2vw, 20px) 0;
        }
        
        .cog-container {
          position: relative;
          width: 100%;
          height: 100%;
          animation: rotate 12s linear infinite;
        }
        
        .nav-cog {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: rotate 12s linear infinite;
        }
        
        .nav-cog-innard {
          position: absolute;
          width: 75%;
          height: 75%;
          top: 12.5%;
          left: 12.5%;
          border-radius: 50%;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .back-subtitle {
          font-size: min(3vw, 16px);
          text-align: center;
          margin-top: min(2vw, 20px);
          font-family: 'Cinzel', serif;
          opacity: 0.9;
          letter-spacing: 0.1em;
        }
        
        @media (max-width: 600px) {
          .card-container {
            width: 95vw;
            height: calc(95vw * 4 / 3);
          }
        }
        
        @media (max-width: 400px) {
          .card-container {
            width: 95vw;
            height: calc(95vw * 4 / 3);
          }
          
          .flavor-text {
            font-size: 3.5vw;
            line-height: 1.3;
          }
          
          .card-title {
            font-size: 4.5vw;
          }
          
          .back-title {
            font-size: 8vw;
          }
        }
      `}</style>

      <div className="card-container">
        <div className={`card ${isFlipped ? "flipped" : ""}`} ref={cardRef}>
          {/* Front Face */}
          <div
            className="card-face card-front"
            style={{ background: theme.background }}
          >
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
              <div className="card-level">LVL {card.level}</div>
            </div>

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
                src={card.image}
                alt={card.name}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

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
            </div>

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
              <div className="rarity-indicator">★ {card.rarity} ★</div>
            </div>
          </div>

          {/* Back Face */}
          <div className="card-face card-back">
            <div className="back-content">
              <div className="back-title">SURF</div>
              <div className="back-pattern">
                <div className="cog-container">
                  <img
                    src="/images/nav_cog.svg"
                    alt="Spinning Cog"
                    className="nav-cog"
                  />
                  <img
                    src="/images/nav_cog_innard.png"
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
    </>
  );
};

// Demo
const sampleCard = {
  id: "ben",
  name: "Ben",
  subtitle: "⟨MEME KING⟩",
  level: "∞",
  theme: "alchemicalRed",
  manaCost: [
    {
      type: "red",
      value: "3",
      color: "radial-gradient(circle, #dc143c, #8b0000)",
      textColor: "#ffd700",
    },
    {
      type: "artifact",
      value: "1",
      color: "radial-gradient(circle, #b8860b, #daa520)",
      textColor: "#2c1810",
    },
    {
      type: "special",
      value: "E",
      color: "radial-gradient(circle, #ff8c00, #ff4500)",
      textColor: "#2c1810",
    },
  ],
  image: "/images/card-images/ben.png",
  type: "Legendary Creature — Artist",
  stats: { attack: "∞", defense: "∞" },
  flavorText:
    "Humankind cannot gain anything without first giving something in return. To obtain something, something of equal value must be lost. That is alchemy's first law of Equivalent Exchange.",
  artist: "SURF FINANCE STUDIOS",
  rarity: "1/1",
};

export default function CardDemo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        padding: "20px",
      }}
    >
      <Card card={sampleCard} />
    </div>
  );
}
