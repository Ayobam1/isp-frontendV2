import React,{useState} from 'react';
import mastercardlogo from '../assets/logos_mastercard.png';
import cardlogo from '../assets/cardlogo.png';
import CloseIcon from '../assets/closeicon.png';
import './WalletPopup.css';

const WalletPopup = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  
  if (!isOpen) return null;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCardSelect = () => {
    setSelectedCard(selectedCard === 'mastercard' ? null : 'mastercard');
  };

  const handleCancel = () => {
    onClose();
  };

  const handleContinue = () => {
    // Proceed with wallet funding logic
    // Optionally close the popup after successful funding
    onClose();
  };

  return (
    <div className="wallet-popup-overlay">
      <div className="wallet-popup-container">
        <button className="close-button" onClick={onClose}>
          <img src={CloseIcon} alt="Close" />
        </button>
        
        <div className="wallet-header">
          <h1>Fund Wallet</h1>
          <p>Select Prepaid card type</p>
        </div>

        <div className="amount-section">
          <label htmlFor="amount">Amount</label>
          <div className="input-container">
            <input 
              type="text" 
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="amount-input"
            />
          </div>
        </div>

        <div className="card-selection">
          <div className="card-option">
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="mastercard"
                checked={selectedCard === 'mastercard'}
                onChange={handleCardSelect}
              />
              <label htmlFor="mastercard" className="card-label">
                <img 
                  src={mastercardlogo} 
                  alt="Mastercard Logo" 
                  className="card-logo"
                />
                Mastercard
              </label>
            </div>
          </div>

          <div className="card-option add-new-card">
            <div className="checkbox-container">
              <label htmlFor="newcard" className="card-label">
                <img 
                  src={cardlogo} 
                  alt="Add New Card" 
                  className="card-logo"
                />
                Add new card details to your Account
              </label>
            </div>
          </div>
        </div>

        <div className="action-button">
          <button 
            className="btn btn-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className="btn btn-continue"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;