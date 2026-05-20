import React, { useState } from 'react';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // handle OTP send logic here
    console.log('Sending OTP to:', email);
    onClose();
  };

  return (
    <div className="fp-overlay" onClick={onClose}>
      <div className="fp-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="fp-header">
          <div className="fp-title-group">
            <h2 className="fp-title">Forgot Password</h2>
            <p className="fp-subtitle">One time password will be sent to you.</p>
          </div>

          {/* Alert icon + Close icon */}
          <div className="fp-header-icons">
            <button className="fp-close-btn" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5l10 10M15 5L5 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Input Field */}
        <div className="fp-field">
          <input
            type="email"
            className="fp-input"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="fp-actions">
          <button className="fp-btn fp-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="fp-btn fp-btn-submit" onClick={handleSubmit}>
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordModal;