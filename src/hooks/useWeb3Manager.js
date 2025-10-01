import { useState, useEffect } from "react";

export const useWeb3Manager = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      const connectedWallet = localStorage.getItem("connectedWallet");
      if (connectedWallet && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.includes(connectedWallet)) {
            setAccount(connectedWallet);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };
    checkConnection();
  }, []);

  const connect = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found! Install it first.");
      return { success: false };
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const acc = accounts[0];
      setAccount(acc);
      setIsConnected(true);
      localStorage.setItem("connectedWallet", acc);
      return { success: true, account: acc };
    } catch (error) {
      console.error("Connection failed:", error);
      return { success: false, error: error.message };
    }
  };

  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
    localStorage.removeItem("connectedWallet");
  };

  const getShortAddress = () => {
    if (!account) return "";
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  };

  return { isConnected, account, connect, disconnect, getShortAddress };
};
