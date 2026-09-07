import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Ninverification from './Ninverification';
import checkIcon from '../assets/vectorcheck.png';
import { useOnboarding } from '../context/OnboardingContext';
import './getStartedVerification.css'; // reuse the same stepper/card styles

function NinVerificationPage() {
  const navigate = useNavigate();
  const { ninVerification, setNinVerification } = useOnboarding();
  const [ninError, setNinError] = useState('');
  const requestId = localStorage.getItem('requestId');

  const handleNinVerified = useCallback((result) => {
    if (result.verdict === 'approved') {
      setNinVerification(result);
      setNinError('');
      navigate('/verifypayment/');
    } else {
      setNinError('NIN verification did not pass. Please check the number and try again.');
    }
  }, [navigate, setNinVerification]);

  // Already verified (either earlier this session, or restored from
  // localStorage after a reload) — skip mounting the paid widget entirely.
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
                onClick={() => navigate('/verifypayment/')}
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
            {requestId ? (
  <Ninverification
    userId={requestId}
    onVerified={handleNinVerified}
    onRetry={() => setNinError('')}
  />
) : (
  <span className="gsf-error">Missing request info. Please restart from Step 1.</span>
)}
{ninError && <span className="gsf-error">{ninError}</span>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default NinVerificationPage;