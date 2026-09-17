import React, { useState, useEffect, useCallback } from "react";
import "./getStartedForm.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOnboarding } from '../context/OnboardingContext';
import streamingIcon from "../assets/streamingIcon.png";
import speedIcon from "../assets/speedIcon.png";
import securityIcon from "../assets/securityIcon.png";
import backIcon from "../assets/backIcon.png";
import { verifyPayment } from "../api/authService";
import PaymentSuccess from "./PaymentSuccess";


const plans = [
  {
    id: "basic",
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

// Statuses the verify-payment endpoint can report when paid is false
const FAILED_STATUSES = ["failed", "abandoned", "reversed"];


function GetStartedForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");

  const [currentStep] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);


// inside the component:
const { selectedPlan: contextSelectedPlan, setSelectedPlan, requestId, setRequestId } = useOnboarding();
console.log('requestId on mount:', requestId);
const [selectedPlanId, setSelectedPlanId] = useState(contextSelectedPlan?.id || "standard");

  const [submitError, setSubmitError] = useState("");

  // "idle" = show the normal plan-picker (no ?id, or payment not yet
  // started for this request). Other states replace the page content
  // while we're checking, or once we know the outcome.
  const [verifyStatus, setVerifyStatus] = useState(idParam ? "checking" : "idle");
  const [verifyError, setVerifyError] = useState("");

  const checkPayment = useCallback(async () => {
    if (!idParam) return;

    setVerifyStatus("checking");
    setVerifyError("");

    try {
      const data = await verifyPayment(idParam);

      if (data.paid) {
        setRequestId(idParam);
        setVerifyStatus("paid");
        return;
      }

      if (data.status === "not_initiated") {
        // They haven't started payment yet — just resume the flow at
        // this request rather than showing any status message.
        setRequestId(idParam);
        setVerifyStatus("idle");
        return;
      }

      setRequestId(idParam);
      setVerifyStatus(FAILED_STATUSES.includes(data.status) ? "failed" : "pending");
    } catch (error) {
      const response = error?.response;
      const code = response?.data?.code;

      if (response?.status === 404 || code === "RESOURCE_001") {
        setVerifyError("We couldn't find a request matching this link.");
      } else if (response?.status === 409 || code === "RESOURCE_002") {
        setVerifyError(
          "There's a mismatch with this payment. Please contact support."
        );
      } else if (response?.status === 502 || code === "EXTERNAL_001") {
        setVerifyError(
          "We couldn't reach Paystack to confirm your payment. Please try again."
        );
      } else if (response?.status === 429) {
        setVerifyError(
          "Too many verification attempts. Please wait a few minutes and try again."
        );
      } else {
        setVerifyError("Something went wrong while checking your payment.");
      }
      setVerifyStatus("error");
    }
  }, [idParam, setRequestId]);

  useEffect(() => {
    checkPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idParam]);


const handleSelectPlan = (id) => {
  setSelectedPlanId(id);
  setSelectedPlan(plans.find((p) => p.id === id));
  setDropdownOpen(false);
};

useEffect(() => {
  if (!contextSelectedPlan) {
    setSelectedPlan(plans.find((p) => p.id === selectedPlanId));
  }
}, []); // eslint-disable-line react-hooks/exhaustive-deps


const handleverifyPaymentClick = () => {
  setSubmitError("");

  // The request itself is now created earlier, on the Service Request
  // Form step (Started / getStarted.js). By the time the user gets here,
  // requestId should already be set — this page just needs to record
  // the chosen plan (already done via setSelectedPlan above) and move on.
  if (!requestId) {
    setSubmitError(
      "Your request information was not found. Please start again from the beginning."
    );
    return;
  }

  navigate("/verification");
};


  const selectedPlan = plans.find(
    (plan) => plan.id === selectedPlanId
  );

  const steps = [
    {
      number: 1,
      label: "Choose Plan",
    },
    {
      number: 2,
      label: "Verification",
    },
    {
      number: 3,
      label: "Payment",
    },
  ];

  // --- Payment already succeeded: show the success popup, nothing else ---
  if (verifyStatus === "paid") {
    return (
      <PaymentSuccess
        isOpen={true}
        onClose={() => navigate("/dashboard")}
      />
    );
  }

  // --- Still checking, or checking failed, or payment is pending/failed ---
  if (verifyStatus === "checking") {
    return (
      <div className="gsf-page">
        <div className="gsf-canvas">
          <div className="gsf-heading-container">
            <h1 className="gsf-heading">Checking your payment...</h1>
            <p className="gsf-subheading">This will only take a moment.</p>
          </div>
        </div>
      </div>
    );
  }

  if (verifyStatus === "pending") {
    return (
      <div className="gsf-page">
        <div className="gsf-canvas">
          <div className="gsf-heading-container">
            <h1 className="gsf-heading">Still confirming your payment</h1>
            <p className="gsf-subheading">
              This can take a moment on Paystack's end. You can check again below.
            </p>
          </div>
          <button type="button" className="gsf-continue-button" onClick={checkPayment}>
            <span>Check again</span>
          </button>
        </div>
      </div>
    );
  }

  if (verifyStatus === "failed") {
    return (
      <div className="gsf-page">
        <div className="gsf-canvas">
          <div className="gsf-heading-container">
            <h1 className="gsf-heading">Payment not completed</h1>
            <p className="gsf-subheading">
              Your payment may have been cancelled or declined. You can try again below.
            </p>
          </div>
          <button
            type="button"
            className="gsf-continue-button"
            onClick={() => navigate("/verifypayment")}
          >
            <span>Try payment again</span>
          </button>
        </div>
      </div>
    );
  }

  if (verifyStatus === "error") {
    return (
      <div className="gsf-page">
        <div className="gsf-canvas">
          <div className="gsf-heading-container">
            <h1 className="gsf-heading">We couldn't check your payment</h1>
            <p className="gsf-subheading">{verifyError}</p>
          </div>
          <button type="button" className="gsf-continue-button" onClick={checkPayment}>
            <span>Try again</span>
          </button>
        </div>
      </div>
    );
  }

  // --- verifyStatus === "idle": the normal plan-picker page ---
  return (
    <div className="gsf-page">
      <div className="gsf-canvas">

        {/* Stepper */}
        <div className="gsf-stepper-wrapper">
          <div className="gsf-stepper-row">

            {steps.map((step, index) => (
              <React.Fragment
                key={step.number}
              >

                <div className="gsf-step">

                  <div
                    className={`
                      gsf-step-circle
                      ${
                        currentStep ===
                        step.number
                          ? "active"
                          : ""
                      }
                      ${
                        currentStep >
                        step.number
                          ? "completed"
                          : ""
                      }
                    `}
                  >
                    <span className="gsf-step-number">
                      {step.number}
                    </span>
                  </div>


                  <div className="gsf-step-label-wrap">

                    <span
                      className={`
                        gsf-step-label
                        ${
                          currentStep ===
                          step.number
                            ? "active"
                            : ""
                        }
                      `}
                    >
                      {step.label}
                    </span>

                  </div>

                </div>


                {index <
                  steps.length - 1 && (

                  <div className="gsf-step-track">

                    <div
                      className={`
                        gsf-step-track-fill
                        ${
                          currentStep >
                          step.number
                            ? "filled"
                            : ""
                        }
                      `}
                    />

                  </div>

                )}

              </React.Fragment>
            ))}

          </div>
        </div>


        {/* Heading */}
        <div className="gsf-heading-container">

          <h1 className="gsf-heading">
            Step 1: Choose your Plan
          </h1>

          <p className="gsf-subheading">
            Precision connectivity tailored for
            your lifestyle. Select the high-speed
            tier that aligns with your digital
            footprint.
          </p>

        </div>


        {/* Main Card */}
        <div className="gsf-card">

          <div className="gsf-form">


            {/* Plan Dropdown */}
            <div className="gsf-dropdown-container">

              <label className="gsf-label">
                Select Your Plan
              </label>


              <div className="gsf-select-wrapper">

                <button
                  type="button"
                  className="gsf-select-trigger"
                  onClick={() =>
                    setDropdownOpen(
                      !dropdownOpen
                    )
                  }
                >

                  <span className="gsf-select-value">

                    {selectedPlan.name}
                    {" - "}
                    N{selectedPlan.price}/mo

                  </span>


                  <svg
                    className={`
                      gsf-select-chevron
                      ${
                        dropdownOpen
                          ? "open"
                          : ""
                      }
                    `}
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
                        className={`
                          gsf-select-option
                          ${
                            plan.id ===
                            selectedPlanId
                              ? "selected"
                              : ""
                          }
                        `}
                        onClick={() =>
                          handleSelectPlan(
                            plan.id
                          )
                        }
                      >

                        {plan.name}
                        {" - "}
                        N{plan.price}/mo

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

                      {selectedPlan.name.replace(
                        "IMBIL Connect ",
                        ""
                      )}

                    </h2>


                    {selectedPlan.badge && (

                      <span className="gsf-badge">

                        {selectedPlan.badge}

                      </span>

                    )}

                  </div>


                  <p className="gsf-plan-description">

                    {selectedPlan.description}

                  </p>

                </div>


                <div className="gsf-price">

                  <span className="gsf-price-amount">

                    N{selectedPlan.price}

                  </span>

                  <span className="gsf-price-period">

                    /mo

                  </span>

                </div>

              </div>


              {/* Plan Statistics */}
              <div className="gsf-stats-row">


                <div className="gsf-stat-box">

                  <div className="gsf-stat-icon speed-icon">

                    <img
                      src={speedIcon}
                      alt="Speed"
                    />

                  </div>


                  <div className="gsf-stat-text">

                    <span className="gsf-stat-label">

                      Speed

                    </span>

                    <span className="gsf-stat-value">

                      {selectedPlan.speed}

                    </span>

                  </div>

                </div>


                <div className="gsf-stat-box">

                  <div className="gsf-stat-icon data-icon">

                    <img
                      src={streamingIcon}
                      alt="Streaming"
                    />

                  </div>


                  <div className="gsf-stat-text">

                    <span className="gsf-stat-label">

                      Streaming

                    </span>

                    <span className="gsf-stat-value">

                      {selectedPlan.streaming}

                    </span>

                  </div>

                </div>


                <div className="gsf-stat-box">

                  <div className="gsf-stat-icon devices-icon">

                    <img
                      src={securityIcon}
                      alt="Security"
                    />

                  </div>


                  <div className="gsf-stat-text">

                    <span className="gsf-stat-label">

                      Security

                    </span>

                    <span className="gsf-stat-value">

                      {selectedPlan.security}

                    </span>

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


  {/* Summary */}
  <div className="gsf-summary">

    <span className="gsf-summary-label">
      Summary
    </span>

    <span className="gsf-summary-value">
      {selectedPlan.name.replace("IMBIL Connect ", "Imbil ")}
      {" - "}
      N{selectedPlan.price}
    </span>

  </div>

  {/* Back Button + Continue Button on same row */}
  <div className="gsf-bottom-row">

    <button
      type="button"
      className="gsf-back-button"
      onClick={() => navigate("/started")}
    >
      <div className="gsf-back-icon">
        <img src={backIcon} alt="Back" />
      </div>

      <span>Back</span>
    </button>

    <button
      type="button"
      className="gsf-continue-button"
      onClick={handleverifyPaymentClick}
    >
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