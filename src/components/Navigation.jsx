import React, { useState } from 'react';
import { Home, Code, DollarSign, PenTool, Wallet } from 'lucide-react';
import { useWeb3Manager } from '../hooks/useWeb3Manager';

const Navigation = ({ onNavigate, currentPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isConnected, connect, disconnect, getShortAddress } = useWeb3Manager();
  const [showWallet, setShowWallet] = useState(false);

  return (
    <>
      
      {isExpanded && <div className="blur-overlay" onClick={() => setIsExpanded(false)} />}
      
      
        <button className="nav-btn toggle" onClick={() => setIsExpanded(!isExpanded)}>
          ⚙️
        
        
        {isExpanded && (
          <>
            <button className="nav-btn" onClick={() => { onNavigate('home'); setIsExpanded(false); }}>
              
            
            
              
            
            <button className="nav-btn" onClick={() => { onNavigate('whirlpool'); setIsExpanded(false); }}>
              🌊
            
          </>
        )}

        <button 
          className="nav-btn wallet" 
          onClick={() => isConnected ? setShowWallet(!showWallet) : connect()}
          style={{ color: isConnected ? '#05c46b' : '#ff5e57' }}
        >
          
        
      

      {showWallet && isConnected && (
        
          {getShortAddress()}
          <button onClick={() => { disconnect(); setShowWallet(false); }}>
            Disconnect
          
        
      )}
    </>
  );
};

export default Navigation;