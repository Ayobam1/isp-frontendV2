import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyCheckoutPayment } from '../api/authService';
import { useOnboarding } from '../context/OnboardingContext';
import { ROUTES } from '../constants/routes';
import PaymentSuccess from './PaymentSuccess';
import './PaymentVerificationPage.css';

const POLL_INTERVAL_MS = 15000;
const MAX_POLLS = 18;
const FAILED_STATUSES = ['failed', 'abandoned', 'reversed'];

const PaymentVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearOnboardingData } = useOnboarding();
  const reference = searchParams.get('reference');

  // verifying | success | pending | duplicate | reversed | failed | error
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  const pollCount = useRef(0);
  const pollTimer = useRef(null);
  const hasStarted = useRef(false);

  const verify = useCallback(async () => {
    try {
      const data = await verifyCheckoutPayment(reference);

      if (data.checkoutStatus === 'COMPLETED') {
        setStatus('success');
        clearOnboardingData();
        return;
      }

      if (data.checkoutStatus === 'DUPLICATE') {
        setStatus('duplicate');
        return;
      }

      if (data.checkoutStatus === 'REVERSED' || data.status === 'reversed') {
        setStatus('reversed');
        return;
      }

      if (!data.paid && FAILED_STATUSES.includes(data.status)) {
        setStatus('failed');
        return;
      }

      // Still PENDING: check again shortly (the endpoint is safe to call repeatedly)
      if (pollCount.current < MAX_POLLS) {
        pollCount.current += 1;
        setStatus('pending');
        pollTimer.current = setTimeout(verify, POLL_INTERVAL_MS);
      } else {
        setStatus('pending');
        setMessage('This is taking longer than usual. You can check again, or contact support if you were charged.');
      }
    } catch (error) {
      const response = error?.response;
      const code = response?.data?.code;

      if (response?.status === 502 || code === 'EXTERNAL_001') {
        setMessage("We couldn't reach Paystack to confirm your payment. Please try again.");
      } else if (response?.status === 404 || code === 'RESOURCE_001') {
        setMessage("We couldn't find a payment matching this link.");
      } else if (response?.status === 409 || code === 'RESOURCE_002') {
        setMessage("There's a mismatch with this payment. Please contact support.");
      } else if (response?.status === 429) {
        setMessage('Too many checks. Please wait a few minutes and try again.');
      } else {
        setMessage('Something went wrong while confirming your payment.');
      }
      setStatus('error');
    }
  }, [reference, clearOnboardingData]);

  useEffect(() => {
    // React StrictMode runs effects twice in development; only start once
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (!reference) {
      setMessage('No payment reference was found in the link.');
      setStatus('error');
      return;
    }

    verify();
  }, [reference, verify]);

  // Stop polling if the user leaves the page
  useEffect(() => () => clearTimeout(pollTimer.current), []);

  const checkAgain = () => {
    clearTimeout(pollTimer.current);
    pollCount.current = 0;
    setMessage('');
    setStatus('verifying');
    verify();
  };

  // Success: show the styled PaymentSuccess modal (no account ID)
  if (status === 'success') {
    return (
      <PaymentSuccess
        isOpen={true}
        onClose={() => navigate(ROUTES.HOME)}
        referenceId={reference}
      />
    );
  }

  return (
    <div className="pv-page">
      <div className="pv-card">
        {status === 'verifying' && <p className="pv-text">Confirming your payment…</p>}

        {status === 'pending' && (
          <>
            <h2 className="pv-title">Still confirming your payment</h2>
            <p className="pv-text">
              {message || "This can take a moment on Paystack's end. We'll keep checking — please don't close this page."}
            </p>
            {message && (
              <button type="button" className="pv-button" onClick={checkAgain}>Check again</button>
            )}
          </>
        )}

        {status === 'duplicate' && (
          <>
            <h2 className="pv-title">You already have an account</h2>
            <p className="pv-text">
              Your payment went through, but an account already exists for this email, so we
              didn't create a new one. Please contact support to arrange your refund.
            </p>
            <button type="button" className="pv-button" onClick={() => navigate(ROUTES.HOME)}>
              Back to home
            </button>
          </>
        )}

        {status === 'reversed' && (
          <>
            <h2 className="pv-title">Payment refunded</h2>
            <p className="pv-text">
              This payment was refunded before your account was created. Please contact support
              if you'd like to book again.
            </p>
            <button type="button" className="pv-button" onClick={() => navigate(ROUTES.HOME)}>
              Back to home
            </button>
          </>
        )}

        {status === 'failed' && (
          <>
            <h2 className="pv-title">Payment not completed</h2>
            <p className="pv-text">
              Your payment was cancelled or declined, so nothing was charged. You can start again
              from the summary page.
            </p>
            <button type="button" className="pv-button" onClick={() => navigate(ROUTES.SUMMARY)}>
              Try again
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="pv-title">We couldn't confirm your payment</h2>
            <p className="pv-text">{message}</p>
            {reference && (
              <button type="button" className="pv-button" onClick={checkAgain}>Try again</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentVerificationPage;