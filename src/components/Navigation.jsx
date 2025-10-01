import React, { useState, useRef } from "react";
import { Home, Code, DollarSign, PenTool, Wallet, Layers } from "lucide-react";
import { useWeb3Manager } from "../hooks/useWeb3Manager";
import "./Navigation.css";

const Navigation = ({ onNavigate, currentPage, isExpanded, setIsExpanded }) => {
  const [isFading, setIsFading] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const { isConnected, connect, disconnect, getShortAddress } =
    useWeb3Manager();
  const toggleRef = useRef(null);

  const navItems = [
    {
      id: "home",
      icon: <Home size={24} />,
      label: "Home",
      action: () => onNavigate("home"),
    },
    {
      id: "deck",
      icon: <Layers size={24} />,
      label: "Card Deck",
      action: () => onNavigate("deck"),
    },
    {
      id: "github",
      icon: <Code size={24} />,
      label: "GitHub",
      action: () => window.open("https://github.com/howlonghasitBen", "_blank"),
    },
    {
      id: "portfolio",
      icon: <DollarSign size={24} />,
      label: "Portfolio",
      action: () =>
        window.open(
          "https://app.gmx.io/#/accounts/0x2cfC8747593f77f3dDf92E55b296d3B6307361D7?network=arbitrum&v=2",
          "_blank"
        ),
    },
    {
      id: "writing",
      icon: <PenTool size={24} />,
      label: "Writing",
      action: () =>
        window.open("https://substack.com/@howlonghasitben", "_blank"),
    },
    {
      id: "harpoon",
      icon: (
        <img
          src={`${process.env.PUBLIC_URL}/images/harpoon.png`}
          alt="harpoon"
          style={{ width: "65%", height: "65%", zIndex: "1" }}
        />
      ),
      label: "harpoon",
      action: () => onNavigate("harpoon"),
    },
  ];

  const toggleExpanded = () => {
    if (isExpanded && !isFading) {
      // Start fade out
      setIsFading(true);
      const longestDelay = (navItems.length - 1) * 0.1 * 1000;
      setTimeout(() => {
        setIsExpanded(false);
        setIsFading(false);
      }, 800 + longestDelay);
    } else if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleNavClick = (action) => {
    setIsFading(true);
    const longestDelay = (navItems.length - 1) * 0.1 * 1000;

    setTimeout(() => {
      action();
      setIsExpanded(false);
      setIsFading(false);
    }, 800 + longestDelay);
  };

  const handleWalletClick = async () => {
    if (isConnected) {
      setShowWallet(!showWallet);
    } else {
      await connect();
    }
  };

  return (
    <>
      {isExpanded && <div className="blur-overlay" onClick={toggleExpanded} />}

      <div
        className={`nav-grid-overlay ${isExpanded ? "expanded" : ""} ${
          isFading ? "fading" : ""
        }`}
      >
        <div
          ref={toggleRef}
          className="nav-vector-container toggle-button"
          onClick={toggleExpanded}
        >
          <img
            className="nav-vector-innard"
            src={`${process.env.PUBLIC_URL}/images/nav_cog_innard.png`}
            alt="toggle"
          />
          <img
            className="nav-vector-cog"
            src={`${process.env.PUBLIC_URL}/images/nav_cog.svg`}
            alt="toggle"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </div>

        {(isExpanded || isFading) &&
          navItems.map((item, index) => (
            <button
              key={item.id}
              className="navButton"
              onClick={() => handleNavClick(item.action)}
              style={{
                "--ripple-delay": `${index * 0.1}s`,
                "--ripple-delay-reverse": `${
                  (navItems.length - 1 - index) * 0.1
                }s`,
                "--cog-direction": index % 2 === 0 ? "1" : "-1",
              }}
            >
              <img
                className="mini-cog"
                src={`${process.env.PUBLIC_URL}/images/nav_cog.svg`}
                alt=""
              />
              {typeof item.icon === "string" ? (
                <span className="navIcon-emoji">{item.icon}</span>
              ) : (
                item.icon
              )}
            </button>
          ))}

        <div
          className="nav-vector-container wallet-button"
          onClick={handleWalletClick}
          style={{ color: isConnected ? "#05c46b" : "#ff5e57" }}
        >
          <Wallet size={24} />
          <img
            className="nav-vector-cog"
            src={`${process.env.PUBLIC_URL}/images/nav_cog.svg`}
            alt="wallet"
            style={{
              transform: isExpanded ? "rotate(-90deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </div>

      {showWallet && isConnected && (
        <div className="wallet-popup">
          <div className="wallet-address">{getShortAddress()}</div>
          <button
            onClick={() => {
              disconnect();
              setShowWallet(false);
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
