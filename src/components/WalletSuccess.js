import React from 'react';
import './WalletSuccess.css';

const WalletSuccess = ({ isOpen, onClose, amount = "₦0" }) => {
  if (!isOpen) return null;

  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateString = `Today, ${timeString}`;

  return (
    <div className="ws-overlay" onClick={onClose}>
      <div className="ws-container" onClick={e => e.stopPropagation()}>

        {/* Success Icon */}
        <div className="ws-icon-margin">
          <div className="ws-icon-wrapper">
            <div className="ws-icon-ring" />
            <div className="ws-icon-circle">
              <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
                <path
                  d="M12 27L22 37L42 17"
                  stroke="#32C997"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="ws-headline-margin">
          <div className="ws-headline">
            <h2 className="ws-headline-text">Wallet Funded!</h2>
          </div>
        </div>

        {/* Sub-headline */}
        <div className="ws-subheadline-margin">
          <div className="ws-subheadline">
            <p className="ws-subheadline-text">
              Your wallet has been credited successfully. Your new balance is ready to use.
            </p>
          </div>
        </div>

        {/* Transaction Summary Card */}
        <div className="ws-card-margin">
          <div className="ws-card">

            {/* Label */}
            <div className="ws-card-label-row">
              <span className="ws-card-label">Amount Credited</span>
            </div>

            {/* Amount */}
            <div className="ws-card-amount-row">
              <span className="ws-card-amount">{amount}</span>
            </div>

            {/* Divider Row */}
            <div className="ws-card-divider">
              <div className="ws-card-date-col">
                <span className="ws-card-date">{dateString}</span>
              </div>
              <div className="ws-card-fee-col">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                  <path
                    d="M5 1v10M1 8l4 3 4-3M1 4l4-3 4 3"
                    stroke="#842500"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ws-card-fee-text">Fee: ₦0</span>
              </div>
            </div>

          </div>
        </div>

        {/* Primary Button */}
        <button className="ws-btn-primary" onClick={onClose}>
          Back to Dashboard
        </button>

        {/* Secondary Link */}
        <div className="ws-btn-secondary-margin">
          <button className="ws-btn-secondary" onClick={onClose}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path
                d="M6 1v12M1 9l5 4 5-4"
                stroke="#434750"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>View transaction history</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default WalletSuccess;