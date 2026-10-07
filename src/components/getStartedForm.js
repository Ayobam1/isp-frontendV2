import React, { useState, useEffect } from "react";
import "./getStartedForm.css";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import { ROUTES } from "../constants/routes";
import streamingIcon from "../assets/streamingIcon.png";
import speedIcon from "../assets/speedIcon.png";
import securityIcon from "../assets/securityIcon.png";
import backIcon from "../assets/backIcon.png";


const plans = [
  {
    id: "basic",
    code: "BASIC",
    name: "IMBIL Connect Basic",
    price: "26,875",
    badge: null,
    description: "Unlimited data for 30 days.",
    speed: "5 Mbps",
    streaming: "HD Ready",
    security: "Enhanced",
  },
  {
    id: "classic",
    code: "CLASSIC",
    name: "IMBIL Connect Classic",
    price: "37,625",
    badge: "MOST POPULAR",
    description:
      "Precision connectivity tailored for your lifestyle. Built for heavier digital footprints.",
    speed: "8 Mbps",
    streaming: "HD Ready",
    security: "Enhanced",
  },
  {
    id: "standard",
    code: "STANDARD",
    name: "IMBIL Connect Standard",
    price: "48,375",
    badge: null,
    description:
      "Enterprise-grade support and bandwidth for businesses that can't afford downtime.",
    speed: "30 Mbps",
    streaming: "HD Ready",
    security: "Enhanced",
  },
  {
    id: "premium",
    code: "PREMIUM",
    name: "IMBIL Connect Premium",
    price: "64,500",
    badge: null,
    description:
      "Enterprise-grade support and bandwidth for businesses that can't afford downtime.",
    speed: "50 Mbps",
    streaming: "HD Ready",
    security: "Enhanced",
  },
  {
    id: "supreme",
    code: "SUPREME",
    name: "IMBIL Connect Supreme",
    price: "84,387.50",
    badge: null,
    description:
      "Enterprise-grade support and bandwidth for businesses that can't afford downtime.",
    speed: "50 Mbps",
    streaming: "HD Ready",
    security: "Enhanced",
  },
  {
    id: "platinum",
    code: "PLATINUM",
    name: "IMBIL Connect Platinum",
    price: "97,610",
    badge: null,
    description:
      "Enterprise-grade support and bandwidth for businesses that can't afford downtime.",
    speed: "100 Mbps",
    streaming: "HD Ready",
    security: "Enhanced",
  },
];

const steps = [
  { number: 1, label: "Choose Plan" },
  { number: 2, label: "Verification" },
  { number: 3, label: "Payment" },
];

function GetStartedForm() {
  const navigate = useNavigate();
  const currentStep = 1;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { selectedPlan: contextSelectedPlan, setSelectedPlan, serviceForm } = useOnboarding();
  const [selectedPlanId, setSelectedPlanId] = useState(contextSelectedPlan?.id || "standard");

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  // Save the default plan to context so the later steps have it even if the user doesn't change it.
  // Also refreshes plans saved before `code` was added.
  useEffect(() => {
    if (!contextSelectedPlan || !contextSelectedPlan.code) {
      setSelectedPlan(selectedPlan);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectPlan = (id) => {
    setSelectedPlanId(id);
    setSelectedPlan(plans.find((p) => p.id === id));
    setDropdownOpen(false);
    setSubmitError("");
  };

  const handleContinue = () => {
    setSubmitError("");

    // The customer's details come from the Information Form (/information)
    const hasDetails =
      serviceForm?.firstName?.trim() &&
      serviceForm?.lastName?.trim() &&
      serviceForm?.email?.trim() &&
      serviceForm?.address?.trim();

    if (!hasDetails) {
      setSubmitError("Your details are missing. Please fill in the information form first.");
      return;
    }

    navigate(ROUTES.VERIFICATION);
  };

  return (
    <div className="gsf-page">
      <div className="gsf-canvas">

        {/* Stepper */}
        <div className="gsf-stepper-wrapper">
          <div className="gsf-stepper-row">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="gsf-step">
                  <div
                    className={`gsf-step-circle ${currentStep === step.number ? "active" : ""} ${
                      currentStep > step.number ? "completed" : ""
                    }`}
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

        {/* Heading */}
        <div className="gsf-heading-container">
          <h1 className="gsf-heading">Step 1: Choose your Plan</h1>
          <p className="gsf-subheading">
            Precision connectivity tailored for your lifestyle. Select the high-speed tier that
            aligns with your digital footprint.
          </p>
        </div>

        {/* Main Card */}
        <div className="gsf-card">
          <div className="gsf-form">

            {/* Plan Dropdown */}
            <div className="gsf-dropdown-container">
              <label className="gsf-label">Select Your Plan</label>

              <div className="gsf-select-wrapper">
                <button
                  type="button"
                  className="gsf-select-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="gsf-select-value">
                    {selectedPlan.name} - N{selectedPlan.price}/mo
                  </span>

                  <svg
                    className={`gsf-select-chevron ${dropdownOpen ? "open" : ""}`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#0C4381"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="gsf-select-options">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`gsf-select-option ${plan.id === selectedPlanId ? "selected" : ""}`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        {plan.name} - N{plan.price}/mo
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Plan Details */}
            <div className="gsf-details-area">
              <div className="gsf-details-top">
                <div className="gsf-details-info">
                  <div className="gsf-details-title-row">
                    <h2 className="gsf-plan-name">
                      {selectedPlan.name.replace("IMBIL Connect ", "")}
                    </h2>
                    {selectedPlan.badge && <span className="gsf-badge">{selectedPlan.badge}</span>}
                  </div>
                  <p className="gsf-plan-description">{selectedPlan.description}</p>
                </div>

                <div className="gsf-price">
                  <span className="gsf-price-amount">N{selectedPlan.price}</span>
                  <span className="gsf-price-period">/mo</span>
                </div>
              </div>

              {/* Plan Statistics */}
              <div className="gsf-stats-row">
                <div className="gsf-stat-box">
                  <div className="gsf-stat-icon speed-icon">
                    <img src={speedIcon} alt="" />
                  </div>
                  <div className="gsf-stat-text">
                    <span className="gsf-stat-label">Speed</span>
                    <span className="gsf-stat-value">{selectedPlan.speed}</span>
                  </div>
                </div>

                <div className="gsf-stat-box">
                  <div className="gsf-stat-icon data-icon">
                    <img src={streamingIcon} alt="" />
                  </div>
                  <div className="gsf-stat-text">
                    <span className="gsf-stat-label">Streaming</span>
                    <span className="gsf-stat-value">{selectedPlan.streaming}</span>
                  </div>
                </div>

                <div className="gsf-stat-box">
                  <div className="gsf-stat-icon devices-icon">
                    <img src={securityIcon} alt="" />
                  </div>
                  <div className="gsf-stat-text">
                    <span className="gsf-stat-label">Security</span>
                    <span className="gsf-stat-value">{selectedPlan.security}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="gsf-actions-footer">
              {submitError && (
                <div className="gsf-error-message" role="alert">
                  {submitError}
                </div>
              )}

              <div className="gsf-summary">
                <span className="gsf-summary-label">Summary</span>
                <span className="gsf-summary-value">
                  {selectedPlan.name.replace("IMBIL Connect ", "Imbil ")} - N{selectedPlan.price}
                </span>
              </div>

              <div className="gsf-bottom-row">
                <button
                  type="button"
                  className="gsf-back-button"
                  onClick={() => navigate(ROUTES.INFO)}
                >
                  <div className="gsf-back-icon">
                    <img src={backIcon} alt="" />
                  </div>
                  <span>Back</span>
                </button>

                <button type="button" className="gsf-continue-button" onClick={handleContinue}>
                  <span>Continue</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default GetStartedForm;