import React from 'react';
import './WalletPopup.css';
import bankWallet from '../assets/Bank wallet.png';
import walletSolution from '../assets/walletsolution.png';
import copyIcon from '../assets/copyicon.png';

const WalletPopup = ({ isOpen, onClose, accountNumber, accountName, bankName }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("Account number copied!");
  };

  return (
    <div className="wallet-overlay" onClick={onClose}>
      <div className="fund-wallet" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="wallet-header">
          <div>
            <h2>Fund Wallet</h2>
            <p>Transfer funds to your wallet</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="body">
          <div className="info-alert">
            <span className="info-icon">ℹ️</span>
            <p>
              Transfer the desired amount to the account details below. Your wallet will be
              updated automatically once the transaction is confirmed.
            </p>
          </div>

          <div className="details-grid">
            {/* Bank Name */}
            <div className="detail-item">
              <label>BANK NAME</label>
              <div className="detail-box">
                <span>{bankName}</span>
              </div>
            </div>

            {/* Account Number */}
            <div className="detail-item">
              <label>ACCOUNT NUMBER</label>
              <div className="account-box">
                <span className="account-number">{accountNumber}</span>
                <button className="copy-btn" onClick={handleCopy}>
                  Copy
                </button>
              </div>
            </div>

            {/* Account Name */}
            <div className="detail-item">
              <label>ACCOUNT NAME</label>
              <div className="detail-box">
                <span>{accountName}</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="illustration">
            <div className="overlay">
              Secure Payment Processing via IMBIL Network Gateway
            </div>
          </div>

          {/* Footer Button */}
          <button className="done-btn" onClick={onClose}>Done</button>
        </div>

      </div>  
    </div>    
  );
};

export default WalletPopup;