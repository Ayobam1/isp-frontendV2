import React, { useState } from "react";
import speedIcon from '../assets/lightning.png';
import { useOnboarding } from '../context/OnboardingContext';
import { getPaymentLink } from '../api/authService';
import "./getStartedPayment.css";

function GetStartedPayment() {
  const [currentStep] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { selectedPlan, serviceForm, availabilityDate, installationPhone, requestId } = useOnboarding();

  const paymentData = {
    planName: selectedPlan?.name || "",
    amount: selectedPlan?.price ? `₦${selectedPlan.price}` : "",
    customerName: serviceForm?.name || "",
    installationDate: availabilityDate
      ? new Date(availabilityDate).toLocaleDateString("en-GB", {
          day: "2-digit", month: "short", year: "numeric",
        })
      : "",
    email: serviceForm?.email || "",
    phone: installationPhone || serviceForm?.contactPhone || "",
  };

  const handleCompletePayment = async () => {
    setSubmitError("");

    if (!requestId) {
      setSubmitError("Missing request info. Please restart from Step 1.");
      return;
    }
    if (!availabilityDate || !installationPhone || !selectedPlan?.id) {
      setSubmitError("Missing installation details. Please go back and complete Step 2.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { paymentUrl } = await getPaymentLink(requestId, {
        phone_number: installationPhone,
        availability_date: availabilityDate,
        planType: selectedPlan.id,
      });

      if (!paymentUrl) {
        setSubmitError("We couldn't generate a payment link. Please try again.");
        return;
      }

      window.location.href = paymentUrl; // hands off to Paystack's hosted checkout
    } catch (error) {
      console.error("Error getting payment link:", error);
      setSubmitError(
        error.response?.data?.message ||
        "An error occurred while generating your payment link. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, label: "Choose Plan" },
    { number: 2, label: "Verification" },
    { number: 3, label: "Payment" },
  ];

  return (
    <div className="gsp-canvas">

      <div className="gsf-stepper-wrapper">
        <div className="gsf-stepper-row">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="gsf-step">
                <div
                  className={`
                    gsf-step-circle
                    ${currentStep === step.number ? "active" : ""}
                    ${currentStep > step.number ? "completed" : ""}
                  `}
                >
                  <span className="gsf-step-number">{step.number}</span>
                </div>
                <div className="gsf-step-label-wrap">
                  <span className={`gsf-step-label ${currentStep === step.number ? "active" : ""}`}>
                    {step.label}
                  </span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="gsf-step-track">
                  <div className={`gsf-step-track-fill ${currentStep > step.number ? "filled" : ""}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <header className="gsp-header">
        <h1 className="gsp-title">Step 3: Payment Summary</h1>
        <p className="gsp-subtitle">
          Finalize your subscription to activate your high-speed connectivity.
        </p>
      </header>

      <div className="gsp-card">
        <div className="gsp-card__row">
          <div className="gsp-card__row-top">
            <span className="gsp-eyebrow">Order Summary</span>
            <div className="gsp-icon-badge" aria-hidden="true">
              <img src={speedIcon} alt="Speed" />
            </div>
          </div>

          <div className="gsp-plan-line">
            <div className="gsp-plan-line__col">
              <span className="gsp-eyebrow">ISP Package</span>
              <span className="gsp-plan-name">{paymentData.planName || "Loading..."}</span>
            </div>
            <div className="gsp-plan-line__col gsp-plan-line__col--right">
              <span className="gsp-eyebrow">Amount</span>
              <span className="gsp-plan-amount">{paymentData.amount || "Loading..."}</span>
            </div>
          </div>
        </div>

        <div className="gsp-card__row gsp-card__row--split">
          <div className="gsp-field">
            <span className="gsp-eyebrow">Customer Name</span>
            <span className="gsp-value">{paymentData.customerName || "Loading..."}</span>
          </div>
          <div className="gsp-field">
            <span className="gsp-eyebrow">Preferred Installation Date</span>
            <span className="gsp-value">{paymentData.installationDate || "Loading..."}</span>
          </div>
        </div>

        <div className="gsp-card__row">
          <span className="gsp-eyebrow">Contact Details</span>
          <div className="gsp-contact">
            <div className="gsp-contact__item">
              <span className="gsp-value">{paymentData.email || "Loading..."}</span>
            </div>
            <div className="gsp-contact__item">
              <span className="gsp-value">{paymentData.phone || "Loading..."}</span>
            </div>
          </div>
        </div>

        <div className="gsp-notice-wrap">
          <div className="gsp-notice">
            <p className="gsp-notice__text">
              Your subscription will renew automatically each billing cycle. You can cancel
              anytime from your dashboard.
            </p>
          </div>
        </div>
      </div>

      <div className="gsp-submit">
        {submitError && (
          <div className="gsf-error-message" role="alert">{submitError}</div>
        )}

        <button
          type="button"
          className="gsp-pay-button"
          onClick={handleCompletePayment}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing…" : "Complete Payment"}
        </button>

        <p className="gsp-fineprint">
          By completing payment, you agree to IMBIL's Terms of Service and Privacy Policy.
        </p>
      </div>

    </div>
  );
}

export default GetStartedPayment;