import React from "react";
import "./PaymentSuccess.css";

export default function PaymentSuccess({
  isOpen,
  onClose,
  title = "Payment Successfully",
  message = "Our team will contact you shortly to schedule your installation and complete your onboarding",
  referenceId,
}) {
  if (!isOpen) return null;

  return (
    <div className="psm-overlay" role="dialog" aria-modal="true">
      <div className="psm-card">
        {/* Close (X) */}
        <button
          className="psm-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg className="psm-close-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="#434750" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="psm-content-wrapper">
          <div className="psm-main">
            {/* Success icon */}
            <div className="psm-icon-wrapper">
              <div className="psm-icon-overlay">
                <div className="psm-icon-bg">
                  <svg className="psm-check-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="12" stroke="#FFFFFF" strokeWidth="2.5" />
                    <path d="M10.5 16.5L14 20L21.5 12.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="psm-particle psm-particle-1" />
              <span className="psm-particle psm-particle-2" />
            </div>

            {/* Text */}
            <div className="psm-text-content">
              <h2 className="psm-heading">{title}</h2>
              <p className="psm-message">{message}</p>
            </div>
          </div>

          {/* Divider + reference (no account ID) */}
          {/* Divider */}
           <div className="psm-footer" />
        </div>
      </div>
    </div>
  );
}