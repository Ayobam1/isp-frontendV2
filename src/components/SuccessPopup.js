import react, {useEffect} from 'react';
import './SuccessPopup.css';
import successlogo from '../assets/sucess.png';

const SuccessPopup = ({ isOpen, onClose, navigateToSignin }) => {
    useEffect(() => {
      let navigationTimer;
      
      if (isOpen) {
        navigationTimer = setTimeout(() => {
          navigateToSignin();
        }, 5000);
      }
      

      return () => {
        if (navigationTimer) clearTimeout(navigationTimer);
      };
    }, [isOpen, navigateToSignin]);
  
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
              <h2 className="popup-title">Thanks for signing up!</h2>
              <p className="popup-message">
                We've received your details. A member of our team will be in touch shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SuccessPopup;