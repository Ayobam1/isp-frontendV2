
import React from 'react';
import './Popup.css';
import AlertIcon from '../assets/danger.png'

const Popup = ({ onClose, onLogout }) => {
  return (
    <div className="logout-popup-container">
      <div className="logout-popup-alert-icon">
        <img src={AlertIcon} alt="Alert" />
      </div>

      <div className="logout-popup-content">
        <div className="logout-popup-header">
          <h1 className="logout-popup-title">Sign Out</h1>
          <p className="logout-popup-subtitle">
            Are you sure you want to sign out of your Imbil Account
          </p>
        </div>

        <div className="logout-popup-actions">
          <button 
            className="btn btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn btn-signout"
            onClick={onLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;