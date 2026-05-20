import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authService';
import './Popup.css';
import AlertIcon from '../assets/danger.png';

const Popup = ({ onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log("Logout API error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      onLogout();
      navigate('/signin');
    }
  };

  return (
    <div className="logout-overlay">
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
            <button className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-signout" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;