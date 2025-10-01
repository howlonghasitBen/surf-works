import React, { useState, useEffect, useRef } from "react";
import { Home, Code, DollarSign, PenTool, Wallet, Layers } from "lucide-react";
import { useWeb3Manager } from "../hooks/useWeb3Manager";
import "./Navigation.css";

const Navigation = ({ onNavigate, currentPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const { isConnected, connect, disconnect, getShortAddress } =
    useWeb3Manager();
  const navRef = useRef(null);
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
    setIsExpanded(!isExpanded);
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
      {/* Blur overlay */}
      {isExpanded && <div className="blur-overlay" onClick={toggleExpanded} />}

      {/* Navigation grid overlay */}
      <div className={`nav-grid-overlay ${isExpanded ? "expanded" : ""}`}>
        {/* Toggle button */}
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

        {/* Nav buttons - only visible when expanded */}
        {isExpanded &&
          navItems.map((item, index) => (
            <button
              key={item.id}
              className="navButton"
              onClick={() => {
                item.action();
                setIsExpanded(false);
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

        {/* Wallet button */}
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

      {/* Wallet info popup */}
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
