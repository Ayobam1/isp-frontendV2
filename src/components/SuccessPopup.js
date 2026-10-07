import React, { useEffect } from 'react';
import './SuccessPopup.css';
import successlogo from '../assets/sucess.png';

const DEFAULT_TITLE = 'Request Submitted Successfully';
const DEFAULT_MESSAGE = 'Thank you for contacting us, We will reach out to you soon.';

const SuccessPopup = ({
  isOpen,
  onClose,
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
}) => {
  useEffect(() => {
    let closeTimer;

    if (isOpen) {
      closeTimer = setTimeout(() => {
        onClose();
      }, 8000);
    }

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="success-popup">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="popup-content">
          <div className="success-icon">
            <img src={successlogo} alt="Success" />
          </div>
          <div className="popup-text-container">
            <h2 className="popup-title">{title}</h2>
            <p className="popup-message">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;