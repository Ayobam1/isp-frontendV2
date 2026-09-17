import React from "react";
import "./PaymentSuccess.css";
 import checkIcon from "../assets/paymentSuccessIcon.png";
import closeIcon from "../assets/paymentSuccessIcon.png";

export default function PaymentSuccess({
  isOpen,
  onClose,
  title = "Payment Successfully",
  message = "Our team will contact you with details on how to schedule your installation for your chosen date",
  referenceId,
}) {
  if (!isOpen) return null;

  return (
    <div className="psm-overlay" role="dialog" aria-modal="true">
      <div className="psm-card">
        <button
          className="psm-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <img src={closeIcon} alt="" className="psm-close-icon" />
        </button>

        <div className="psm-content-wrapper">
          <div className="psm-icon-wrapper">
            <div className="psm-icon-overlay">
              <div className="psm-icon-bg">
                <img src={checkIcon} alt="" className="psm-check-icon" />
              </div>
              <span className="psm-particle psm-particle-1" />
              <span className="psm-particle psm-particle-2" />
            </div>
          </div>

          <div className="psm-text-content">
            <h2 className="psm-heading">{title}</h2>
            <p className="psm-message">{message}</p>
          </div>

          {referenceId && (
            <div className="psm-footer">
              {/* <span className="psm-footer-text">
                REFERENCE ID: #{referenceId}
              </span> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}