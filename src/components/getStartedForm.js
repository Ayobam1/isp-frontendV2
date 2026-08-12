import React, { useState } from "react";
import "./getStartedForm.css";
import { useNavigate } from "react-router-dom";

import streamingIcon from "../assets/streamingIcon.png";
import speedIcon from "../assets/speedIcon.png";
import securityIcon from "../assets/securityIcon.png";
import backIcon from "../assets/backIcon.png";

import { createRequest } from "../api/authService";


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


function GetStartedForm() {
  const navigate = useNavigate();

  const [currentStep] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("standard");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");


  const selectedPlan = plans.find(
    (plan) => plan.id === selectedPlanId
  );


  const handleSelectPlan = (id) => {
    setSelectedPlanId(id);
    setDropdownOpen(false);
  };



const handleverifyPaymentClick = async () => {
  setIsSubmitting(true);
  setSubmitError("");

  try {
    const savedData = localStorage.getItem(
      "serviceRequestData"
    );

    if (!savedData) {
      setSubmitError(
        "Your form information was not found. Please complete the form again."
      );
      return;
    }

    const savedRequest = JSON.parse(savedData);

    // Check exactly what was saved from Started.js
    console.log(
      "Saved request data:",
      savedRequest
    );

    const fullName = savedRequest.name
      ?.trim()
      .split(/\s+/) || [];

    const payload = {
      firstName: fullName[0] || "",

      lastName:
        fullName.slice(1).join(" ") || "",

      email:
        savedRequest.email?.trim() || "",

      phone_number:
        savedRequest.phone?.trim() || "",

      address:
        savedRequest.address?.trim() || "",

      location:
        savedRequest.preferredarea || "",

      heard_about_us:
        savedRequest.heardAboutUsValue || "",

     sales_agent_name:
  savedRequest.heardAboutUsValue === "SALES_AGENT"
    ? savedRequest.salesAgentName?.trim() || ""   
    : null,
      status:
        "PENDING",

  property_type: savedRequest.residence || "RESIDENTIAL",
    };

    // Check the exact JSON being sent
    console.log(
      "Sending API payload:",
      payload
    );

    // Check for empty required values before calling the API
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone_number",
      "address",
      "location",
      "heard_about_us",
      "status",
      "property_type"
    ];

    const missingFields =
      requiredFields.filter(
        (field) =>
          !payload[field] ||
          payload[field]
            .toString()
            .trim() === ""
      );

   if (
  payload.heard_about_us === "SALES_AGENT" &&
  !payload.sales_agent_name
) {
  missingFields.push("sales_agent_name");
}

    if (missingFields.length > 0) {
      console.error(
        "Missing fields:",
        missingFields
      );

      setSubmitError(
        `Missing required fields: ${missingFields.join(
          ", "
        )}`
      );

      return;
    }

   const response = await createRequest(payload);
console.log("API response:", response.data);


localStorage.setItem("requestId", response.data.id);
localStorage.setItem("requestAddress", savedRequest.address);
localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
localStorage.removeItem("serviceRequestData");

navigate("/verification");

  } catch (error) {
    console.error(
      "Error creating request:",
      error
    );

    console.error(
      "Backend response:",
      error.response?.data
    );

    setSubmitError(
      error.response?.data?.message ||
      "An error occurred while submitting your request. Please try again."
    );

  } finally {
    setIsSubmitting(false);
  }
};



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
      disabled={isSubmitting}
    >
      <span>
        {isSubmitting ? "Submitting..." : "Continue"}
      </span>
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
