import React, { useState } from "react";
import { useWeb3Manager } from "../hooks/useWeb3Manager";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Anchor,
  Vote,
  X,
  Plus,
  AlertCircle,
  Shield,
  Zap,
} from "lucide-react";
import "./HarpoonPage.css";

const HarpoonPage = () => {
  const { isConnected, account, connect } = useWeb3Manager();
  const [activeTab, setActiveTab] = useState("my-harpoons");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedHarpoon, setSelectedHarpoon] = useState(null);

  const [harpoonForm, setHarpoonForm] = useState({
    targetToken: "",
    collateralAmount: "",
    leverage: "5",
    isLong: true,
    slippageBps: "50",
    platform: "GMX",
    duration: "7",
    platformSpecificData: "0x",
  });

  const userHarpoons = [
    {
      id: "CND",
      address: "CND",
      status: "CND",
      platform: "CND",
      token: "CND",
      collateral: "CND",
      leverage: "CND",
      isLong: true,
      pnl: "CND",
      openTime: "CND",
      duration: "CND",
    },
  ];

  const nftStatus = {
    hasSurfBoard: "CND",
    hasMumuFrens: "CND",
    totalNFTs: "CND",
  };

  const protocolStats = {
    totalHarpoons: "CND",
    activeHarpoons: "CND",
    totalVolume: "CND",
    successRate: "CND",
  };

  const handleCreateHarpoon = async () => {
    if (!isConnected) {
      alert("Please connect wallet first");
      return;
    }
    alert(
      "Contracts Not Deployed - Would create harpoon with params: " +
        JSON.stringify(harpoonForm, null, 2)
    );
    setShowCreateModal(false);
  };

  const handleCloseHarpoon = async (harpoonId) => {
    if (!isConnected) return;
    alert(`Contracts Not Deployed - Would close harpoon ${harpoonId}`);
  };

  const handleStartVote = async (harpoonId) => {
    if (!isConnected) return;
    alert(`Contracts Not Deployed - Would start vote for harpoon ${harpoonId}`);
  };

  const StatusBadge = ({ status }) => {
    const statusClass = status.toLowerCase().replace(/\s+/g, "-");
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const PnLDisplay = ({ pnl }) => {
    const isProfit = pnl !== "CND" && parseFloat(pnl) > 0;
    const Icon = isProfit ? TrendingUp : TrendingDown;
    const className = pnl === "CND" ? "cnd" : isProfit ? "profit" : "loss";

    return (
      <div className={`pnl-display ${className}`}>
        <Icon size={20} />
        <span>{pnl === "CND" ? "CND" : `${isProfit ? "+" : ""}$${pnl}`}</span>
      </div>
    );
  };

  return (
    <div className="harpoon-page">
      <div className="harpoon-container">
        <div className="harpoon-header">
          <div className="harpoon-header-title">
            <Anchor className="text-[#00bfff]" size={48} />
            <h1>Harpoon Trading</h1>
          </div>
          <p className="harpoon-header-subtitle">
            Create leveraged trading positions with NFT-gated access
          </p>
        </div>

        {!isConnected ? (
          <div className="connect-wallet-card">
            <Shield className="connect-wallet-icon" size={48} />
            <h2 className="connect-wallet-title">Connect Wallet</h2>
            <p className="connect-wallet-text">
              Connect your wallet to view and create harpoons
            </p>
            <button onClick={connect} className="connect-wallet-btn">
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="nft-status-card">
              <h3 className="nft-status-header">
                <Shield size={24} />
                NFT Access Status
              </h3>
              <div className="nft-status-grid">
                <div className="nft-status-item">
                  <div className="nft-status-label">SURF Board NFT</div>
                  <div className="nft-status-value">
                    {nftStatus.hasSurfBoard}
                  </div>
                </div>
                <div className="nft-status-item">
                  <div className="nft-status-label">mumu-frens NFT</div>
                  <div className="nft-status-value">
                    {nftStatus.hasMumuFrens}
                  </div>
                </div>
                <div className="nft-status-item">
                  <div className="nft-status-label">Total NFTs</div>
                  <div className="nft-status-value">{nftStatus.totalNFTs}</div>
                </div>
              </div>
            </div>

            <div className="protocol-stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Harpoons</div>
                <div className="stat-value">{protocolStats.totalHarpoons}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Active Positions</div>
                <div className="stat-value green">
                  {protocolStats.activeHarpoons}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Volume</div>
                <div className="stat-value">{protocolStats.totalVolume}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Success Rate</div>
                <div className="stat-value blue">
                  {protocolStats.successRate}
                </div>
              </div>
            </div>

            <div className="tabs-container">
              <button
                onClick={() => setActiveTab("my-harpoons")}
                className={`tab-button ${
                  activeTab === "my-harpoons" ? "active" : ""
                }`}
              >
                My Harpoons
              </button>
              <button
                onClick={() => setActiveTab("all-harpoons")}
                className={`tab-button ${
                  activeTab === "all-harpoons" ? "active" : ""
                }`}
              >
                All Harpoons
              </button>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="create-harpoon-btn"
            >
              <Plus size={24} />
              Create New Harpoon
            </button>

            <div>
              {userHarpoons.map((harpoon) => (
                <div key={harpoon.id} className="harpoon-item">
                  <div className="harpoon-header-row">
                    <div className="harpoon-title-section">
                      <div className="harpoon-title-row">
                        <h3>Harpoon #{harpoon.id}</h3>
                        <StatusBadge status={harpoon.status} />
                      </div>
                      <div className="harpoon-subtitle">
                        {harpoon.platform} • {harpoon.token} •{" "}
                        {harpoon.leverage}x {harpoon.isLong ? "LONG" : "SHORT"}
                      </div>
                    </div>
                    <PnLDisplay pnl={harpoon.pnl} />
                  </div>

                  <div className="details-grid">
                    <div className="detail-item">
                      <div className="detail-label">Collateral</div>
                      <div className="detail-value">
                        <DollarSign size={16} />
                        {harpoon.collateral}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Leverage</div>
                      <div className="detail-value">
                        <Zap size={16} />
                        {harpoon.leverage}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Open Time</div>
                      <div className="detail-value">
                        <Clock size={16} />
                        {harpoon.openTime}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Duration</div>
                      <div className="detail-value">
                        <Clock size={16} />
                        {harpoon.duration}
                      </div>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button
                      onClick={() => setSelectedHarpoon(harpoon)}
                      className="action-btn view"
                    >
                      <Activity size={18} />
                      View Details
                    </button>
                    <button
                      onClick={() => handleCloseHarpoon(harpoon.id)}
                      className="action-btn close"
                    >
                      <X size={18} />
                      Close Position
                    </button>
                    <button
                      onClick={() => handleStartVote(harpoon.id)}
                      className="action-btn vote"
                    >
                      <Vote size={18} />
                      Start Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cnd-notice">
              <AlertCircle className="cnd-notice-icon" size={32} />
              <p className="cnd-notice-title">Contracts Not Deployed (CND)</p>
              <p className="cnd-notice-text">
                All data fields show "CND" until smart contracts are deployed to
                mainnet
              </p>
            </div>
          </>
        )}

        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Create New Harpoon</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="modal-close"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div>
                  <div className="form-group">
                    <label className="form-label">Target Token Address</label>
                    <input
                      type="text"
                      value={harpoonForm.targetToken}
                      onChange={(e) =>
                        setHarpoonForm({
                          ...harpoonForm,
                          targetToken: e.target.value,
                        })
                      }
                      placeholder="0x..."
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Collateral Amount (USDC)
                    </label>
                    <input
                      type="number"
                      value={harpoonForm.collateralAmount}
                      onChange={(e) =>
                        setHarpoonForm({
                          ...harpoonForm,
                          collateralAmount: e.target.value,
                        })
                      }
                      placeholder="1000"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Leverage (1-20x)</label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={harpoonForm.leverage}
                      onChange={(e) =>
                        setHarpoonForm({
                          ...harpoonForm,
                          leverage: e.target.value,
                        })
                      }
                      className="form-range"
                    />
                    <div className="leverage-display">
                      {harpoonForm.leverage}x
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Position Direction</label>
                    <div className="direction-grid">
                      <button
                        onClick={() =>
                          setHarpoonForm({ ...harpoonForm, isLong: true })
                        }
                        className={`direction-btn long ${
                          harpoonForm.isLong ? "" : "inactive"
                        }`}
                      >
                        <TrendingUp size={20} />
                        LONG
                      </button>
                      <button
                        onClick={() =>
                          setHarpoonForm({ ...harpoonForm, isLong: false })
                        }
                        className={`direction-btn short ${
                          !harpoonForm.isLong ? "" : "inactive"
                        }`}
                      >
                        <TrendingDown size={20} />
                        SHORT
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Trading Platform</label>
                    <select
                      value={harpoonForm.platform}
                      onChange={(e) =>
                        setHarpoonForm({
                          ...harpoonForm,
                          platform: e.target.value,
                        })
                      }
                      className="form-select"
                    >
                      <option value="GMX">GMX</option>
                      <option value="UNISWAP">Uniswap V3</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Max Slippage (bps)</label>
                    <input
                      type="number"
                      value={harpoonForm.slippageBps}
                      onChange={(e) =>
                        setHarpoonForm({
                          ...harpoonForm,
                          slippageBps: e.target.value,
                        })
                      }
                      placeholder="50"
                      className="form-input"
                    />
                    <div className="form-helper">
                      {(parseFloat(harpoonForm.slippageBps) / 100).toFixed(2)}%
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Duration (days)</label>
                    <input
                      type="number"
                      value={harpoonForm.duration}
                      onChange={(e) =>
                        setHarpoonForm({
                          ...harpoonForm,
                          duration: e.target.value,
                        })
                      }
                      placeholder="7"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <div className="fee-display">
                      <div className="fee-row">
                        <span className="fee-label">Estimated Fee:</span>
                        <span className="fee-value">CND</span>
                      </div>
                      <div className="fee-row">
                        <span className="fee-label">CCIP Cross-chain Fee:</span>
                        <span className="fee-value">CND</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleCreateHarpoon} className="submit-btn">
                    <Anchor size={20} />
                    Create Harpoon
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedHarpoon && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <h2 className="modal-title">
                      Harpoon #{selectedHarpoon.id}
                    </h2>
                    <div className="modal-subtitle">
                      Address: {selectedHarpoon.address}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedHarpoon(null)}
                    className="modal-close"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div>
                  <div className="details-section">
                    <div className="details-box">
                      <h3 className="details-title">Position Details</h3>
                      <div className="details-grid-small">
                        <div className="details-grid-item">
                          <div className="detail-label">Platform</div>
                          <div className="detail-value">
                            {selectedHarpoon.platform}
                          </div>
                        </div>
                        <div className="details-grid-item">
                          <div className="detail-label">Token</div>
                          <div className="detail-value">
                            {selectedHarpoon.token}
                          </div>
                        </div>
                        <div className="details-grid-item">
                          <div className="detail-label">Collateral</div>
                          <div className="detail-value">
                            {selectedHarpoon.collateral}
                          </div>
                        </div>
                        <div className="details-grid-item">
                          <div className="detail-label">Leverage</div>
                          <div className="detail-value">
                            {selectedHarpoon.leverage}
                          </div>
                        </div>
                        <div className="details-grid-item">
                          <div className="detail-label">Direction</div>
                          <div className="detail-value">
                            {selectedHarpoon.isLong ? "LONG" : "SHORT"}
                          </div>
                        </div>
                        <div className="details-grid-item">
                          <div className="detail-label">Status</div>
                          <div>
                            <StatusBadge status={selectedHarpoon.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <div className="details-box">
                      <h3 className="details-title">Performance</h3>
                      <div style={{ textAlign: "center" }}>
                        <PnLDisplay pnl={selectedHarpoon.pnl} />
                        <div
                          className="modal-subtitle"
                          style={{ marginTop: "0.5rem" }}
                        >
                          Entry Price: CND | Current Price: CND
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <div className="details-box">
                      <h3 className="details-title">Voting Status</h3>
                      <div className="vote-status">
                        <Vote className="vote-status-icon" size={32} />
                        <p>No active vote</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HarpoonPage;
