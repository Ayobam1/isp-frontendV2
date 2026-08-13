import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './getStartedPayment.css';


const STEPS = [
  { id: 1, label: "Verification" },
  { id: 2, label: "Select Plan" },
  { id: 3, label: "Payment" },
];

const CheckIcon = () => (
  <svg viewBox="0 0 14 11" fill="none" className="gsp-check-icon">
    <path
      d="M1 5.5L4.8 9.3L13 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 20 16" fill="none" className="gsp-option-icon">
    <rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 5.5H19" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 19 18" fill="none" className="gsp-option-icon">
    <path
      d="M2 3.5C2 2.4 2.9 1.5 4 1.5H15C16.1 1.5 17 2.4 17 3.5V14.5C17 15.6 16.1 16.5 15 16.5H4C2.9 16.5 2 15.6 2 14.5V3.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="13" cy="9.5" r="1.3" fill="currentColor" />
  </svg>
);

const BankIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="gsp-option-icon">
    <path d="M2 8L10 2L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3 8H17V17H3V8Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 17H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 22 21" fill="none" className="gsp-lock-icon">
    <rect x="4" y="9" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 9V6C7 3.8 8.8 2 11 2C13.2 2 15 3.8 15 6V9" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function GetStartedPayment({
  planName = "IMBIL Pro Plan",
  planPrice = "₦48,375",
  subtotal = "₦48,375",
  discount = "₦0.00",
  total = "₦48,375",
  onComplete = () => {},
}) 

{
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const isCard = selectedMethod === "card";

  const handleComplete = () => {
    console.log('Complete clicked — bypassing payment for testing');
    navigate('/signin');
  };


  return (
    <div className="gsp-page">
      <div className="gsp-canvas">
        {/* Stepper */}
        <div className="gsp-stepper">
          <div className="gsp-stepper-row">
            {STEPS.map((step, index) => {
              const isComplete = step.id < 3;
              const isCurrent = step.id === 3;
              const isLastStep = index === STEPS.length - 1;

              return (
                <div className="gsp-step" key={step.id}>
                  <div className="gsp-step-top">
                    <div
                      className={`gsp-step-circle ${
                        isComplete ? "gsp-step-circle--complete" : ""
                      } ${isCurrent ? "gsp-step-circle--current" : ""}`}
                    >
                      <span className="gsp-step-circle-ring" />
                      {isComplete ? (
                        <CheckIcon />
                      ) : (
                        <span className="gsp-step-number">{step.id}</span>
                      )}
                    </div>
                    <span
                      className={`gsp-step-label ${
                        isCurrent ? "gsp-step-label--current" : ""
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {!isLastStep && (
                    <div className="gsp-step-line">
                      <span
                        className={`gsp-step-line-segment ${
                          isComplete ? "gsp-step-line-segment--filled" : ""
                        }`}
                      />
                      <span
                        className={`gsp-step-line-segment ${
                          step.id === 2 ? "" : "gsp-step-line-segment--filled"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Heading */}
        <div className="gsp-heading">
          <h1 className="gsp-title">Step 3: Secure Payment</h1>
          <p className="gsp-subtitle">
            Finalize your subscription to activate your high-speed connectivity.
          </p>
        </div>

        {/* Bento grid */}
        <div className="gsp-grid">
          {/* Left column: Payment methods */}
          <div className="gsp-methods-card">
            <h3 className="gsp-card-heading">Payment Method</h3>

            <div className="gsp-options">
              <label
                className={`gsp-option ${isCard ? "gsp-option--selected" : ""}`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value="card"
                  checked={isCard}
                  onChange={() => setSelectedMethod("card")}
                  className="gsp-option-radio-input"
                />
                <span className="gsp-option-radio" aria-hidden="true">
                  {isCard && <CheckIcon />}
                </span>
                <span className="gsp-option-content">
                  <span className="gsp-option-text">Debit / Credit Card</span>
                  <CardIcon />
                </span>
              </label>

              <label
                className={`gsp-option gsp-option--featured ${
                  selectedMethod === "imbil-pay" ? "gsp-option--selected-outline" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value="imbil-pay"
                  checked={selectedMethod === "imbil-pay"}
                  onChange={() => setSelectedMethod("imbil-pay")}
                  className="gsp-option-radio-input"
                />
                <span className="gsp-option-radio gsp-option-radio--outline" aria-hidden="true">
                  {selectedMethod === "imbil-pay" && <span className="gsp-option-radio-dot" />}
                </span>
                <span className="gsp-option-content">
                  <span className="gsp-option-featured-text">
                    <span className="gsp-option-text gsp-option-text--brand">IMBIL Pay</span>
                    <span className="gsp-badge">Save 5%</span>
                  </span>
                  <WalletIcon />
                </span>
              </label>

              <label
                className={`gsp-option ${
                  selectedMethod === "bank" ? "gsp-option--selected-outline" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value="bank"
                  checked={selectedMethod === "bank"}
                  onChange={() => setSelectedMethod("bank")}
                  className="gsp-option-radio-input"
                />
                <span className="gsp-option-radio gsp-option-radio--outline" aria-hidden="true">
                  {selectedMethod === "bank" && <span className="gsp-option-radio-dot" />}
                </span>
                <span className="gsp-option-content">
                  <span className="gsp-option-text">Bank Transfer</span>
                  <BankIcon />
                </span>
              </label>
            </div>

            {/* Card details - only relevant when card is selected */}
            {isCard && (
              <div className="gsp-card-details">
                <div className="gsp-field">
                  <label htmlFor="cardholder-name" className="gsp-field-label">
                    Cardholder Name
                  </label>
                  <input
                    id="cardholder-name"
                    type="text"
                    className="gsp-input"
                    placeholder="John Doe"
                  />
                </div>

                <div className="gsp-field">
                  <label htmlFor="card-number" className="gsp-field-label">
                    Card Number
                  </label>
                  <div className="gsp-input-wrapper">
                    <input
                      id="card-number"
                      type="text"
                      className="gsp-input"
                      placeholder="**** **** **** 1234"
                      inputMode="numeric"
                    />
                    <CardIcon />
                  </div>
                </div>

                <div className="gsp-field-row">
                  <div className="gsp-field">
                    <label htmlFor="expiry-date" className="gsp-field-label">
                      Expiry Date
                    </label>
                    <input
                      id="expiry-date"
                      type="text"
                      className="gsp-input"
                      placeholder="MM/YY"
                    />
                  </div>

                  <div className="gsp-field">
                    <label htmlFor="cvv" className="gsp-field-label">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      className="gsp-input"
                      placeholder="***"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Order summary */}
          <div className="gsp-summary">
            <div className="gsp-summary-card">
              <span className="gsp-summary-blob gsp-summary-blob--top" aria-hidden="true" />
              <span className="gsp-summary-blob gsp-summary-blob--bottom" aria-hidden="true" />

              <div className="gsp-summary-content">
                <h3 className="gsp-summary-heading">Order Summary</h3>

                <div className="gsp-summary-lines">
                  <div className="gsp-summary-row">
                    <div>
                      <p className="gsp-summary-label">{planName}</p>
                      <p className="gsp-summary-value">{planPrice}/mo</p>
                    </div>
                    <WalletIcon />
                  </div>

                  <div className="gsp-summary-row gsp-summary-row--divider">
                    <span className="gsp-summary-label gsp-summary-label--light">
                      Subtotal
                    </span>
                    <span className="gsp-summary-value gsp-summary-value--light">
                      {subtotal}
                    </span>
                  </div>

                  <div className="gsp-summary-row">
                    <span className="gsp-summary-label gsp-summary-label--light">
                      Discount
                    </span>
                    <span className="gsp-summary-value gsp-summary-value--light">
                      {discount}
                    </span>
                  </div>
                </div>

                <div className="gsp-summary-note">
                  <LockIcon />
                  <p className="gsp-summary-note-text">
                    Your payment is encrypted and processed securely. We never
                    store your full card details.
                  </p>
                </div>

                <button
                  type="button"
                  className="gsp-complete-btn"
                  onClick={handleComplete}
                >
                  Complete
                </button>

                <p className="gsp-secure-text">
                  By completing this purchase, you agree to IMBIL's Terms of
                  Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}