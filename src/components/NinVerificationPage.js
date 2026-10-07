import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Ninverification from './Ninverification';
import checkIcon from '../assets/vectorcheck.png';
import { useOnboarding } from '../context/OnboardingContext';
import { ROUTES } from '../constants/routes';
import './getStartedVerification.css';

function NinVerificationPage() {
  const navigate = useNavigate();
  const {
    ninVerification,
    setNinVerification,
    serviceForm,
    selectedPlan,
    availabilityDate,
    installationPhone,
  } = useOnboarding();
  const [ninError, setNinError] = useState('');

  const handleNinVerified = useCallback(
    (result) => {
      if (result.verdict === 'approved') {
        setNinVerification(result);
        setNinError('');
        navigate(ROUTES.SUMMARY);
      } else {
        setNinError('NIN verification did not pass. Please check the number and try again.');
      }
    },
    [navigate, setNinVerification]
  );

  // Work out whether an earlier step is incomplete, and where to send the user to fix it
  const getMissingStep = () => {
    if (!serviceForm?.firstName?.trim() || !serviceForm?.email?.trim()) {
      return { message: 'Your details are missing. Please fill in the information form first.', step: ROUTES.INFO };
    }
    if (!selectedPlan) {
      return { message: 'Please select a plan first.', step: ROUTES.PLAN };
    }
    if (!availabilityDate || !installationPhone) {
      return { message: 'Please complete your installation details first.', step: ROUTES.VERIFICATION };
    }
    return null;
  };

  const missingStep = getMissingStep();

  // Already verified (e.g. the user came back to this page): skip straight to the summary
  if (ninVerification?.verdict === 'approved') {
    return (
      <div className="gsf-page">
        <div className="gsf-canvas">
          <div className="gsf-card">
            <div className="gsf-form">
              <p className="nin-success">✓ Identity already verified</p>
              <button
                type="button"
                className="gsf-verify-continue"
                onClick={() => navigate(ROUTES.SUMMARY)}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gsf-page">
      <div className="gsf-canvas">

        <div className="gsf-stepper-wrapper">
          <div className="gsf-stepper-row">

            <div className="gsf-step">
              <div className="gsf-step-circle completed">
                <img src={checkIcon} alt="Completed" className="gsf-step-check" />
              </div>
              <div className="gsf-step-label-wrap">
                <span className="gsf-step-label completed">Select Plan</span>
              </div>
            </div>
            <div className="gsf-step-track">
              <div className="gsf-step-track-fill filled"></div>
            </div>

            <div className="gsf-step">
              <div className="gsf-step-circle completed">
                <img src={checkIcon} alt="Completed" className="gsf-step-check" />
              </div>
              <div className="gsf-step-label-wrap">
                <span className="gsf-step-label completed">Details</span>
              </div>
            </div>
            <div className="gsf-step-track">
              <div className="gsf-step-track-fill filled"></div>
            </div>

            <div className="gsf-step">
              <div className="gsf-step-circle active">
                <span className="gsf-step-number">3</span>
              </div>
              <div className="gsf-step-label-wrap">
                <span className="gsf-step-label active">Verification</span>
              </div>
            </div>
            <div className="gsf-step-track">
              <div className="gsf-step-track-fill"></div>
            </div>

            <div className="gsf-step">
              <div className="gsf-step-circle">
                <span className="gsf-step-number">4</span>
              </div>
              <div className="gsf-step-label-wrap">
                <span className="gsf-step-label">Payment</span>
              </div>
            </div>

          </div>
        </div>

        <div className="gsf-heading-container">
          <h1 className="gsf-heading">Step 3: Identity Verification</h1>
          <p className="gsf-subheading">
            Confirm your NIN to complete identity verification.
          </p>
        </div>

        <div className="gsf-card">
          <div className="gsf-form">
            {missingStep ? (
              <>
                <span className="gsf-error">{missingStep.message}</span>
                <button
                  type="button"
                  className="gsf-verify-continue"
                  onClick={() => navigate(missingStep.step)}
                >
                  Go back
                </button>
              </>
            ) : (
              <Ninverification
                // No request id exists in the new flow. The email is unique per account
                // (POST /checkout creates the account with it), so it identifies this customer.
                userId={serviceForm.email.trim().toLowerCase()}
                onVerified={handleNinVerified}
                onRetry={() => setNinError('')}
              />
            )}
            {ninError && <span className="gsf-error">{ninError}</span>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default NinVerificationPage;