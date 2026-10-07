import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import speedIcon from '../assets/lightning.png';
import { useOnboarding } from '../context/OnboardingContext';
import { startCheckout } from '../api/authService';
import { mapCheckoutError } from '../utils/checkoutErrors';
import { normalizeNigerianPhone } from '../utils/phone';
import { ROUTES } from '../constants/routes';
import './getStartedPayment.css';

const STEPS = [
  { number: 1, label: 'Choose Plan' },
  { number: 2, label: 'Verification' },
  { number: 3, label: 'Payment' },
];

function GetStartedPayment() {
  const navigate = useNavigate();
  const currentStep = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const {
    selectedPlan,
    serviceForm,
    availabilityDate,
    installationPhone,
    ninVerification,
  } = useOnboarding();

  const paymentData = {
    planName: selectedPlan?.name || '',
    amount: selectedPlan?.price ? `₦${selectedPlan.price}` : '',
    customerName: [serviceForm?.firstName, serviceForm?.lastName].filter(Boolean).join(' '),
    installationDate: availabilityDate
      ? new Date(availabilityDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC', // avoids showing the previous day in timezones behind UTC
        })
      : '',
    email: serviceForm?.email || '',
    phone: installationPhone || '',
  };

  const handleCompletePayment = async () => {
    setCheckoutError(null);

    // Guards: make sure every earlier step was completed
    if (!selectedPlan) {
      setCheckoutError({ message: 'Please choose a plan first.', step: ROUTES.PLAN });
      return;
    }

    if (!ninVerification) {
      setCheckoutError({ message: 'Please complete your NIN verification first.', step: ROUTES.NIN });
      return;
    }

    if (
      !serviceForm?.firstName ||
      !serviceForm?.lastName ||
      !serviceForm?.email ||
      !serviceForm?.address ||
      !availabilityDate ||
      !installationPhone
    ) {
      setCheckoutError({
        message: 'Some of your details are missing. Please go back and fill them in.',
        step: !serviceForm?.firstName || !serviceForm?.email ? ROUTES.INFO : ROUTES.VERIFICATION,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: serviceForm.firstName.trim(),
        lastName: serviceForm.lastName.trim(),
        email: serviceForm.email.trim().toLowerCase(),
        phone_number: normalizeNigerianPhone(installationPhone),
        address: serviceForm.address.trim(),
        location: serviceForm.preferredarea,
        // plan code from getStartedForm.js, e.g. BASIC
        planType: selectedPlan.code ?? selectedPlan.id?.toUpperCase(),
        availability_date: availabilityDate,
      };

      // Response: { reference, paymentUrl }
      const { paymentUrl } = await startCheckout(payload);

      if (!paymentUrl) {
        setCheckoutError({ message: "We couldn't start your payment. Please try again.", step: null });
        setIsSubmitting(false);
        return;
      }

      // Leave the button disabled while the browser goes to Paystack:
      // every /checkout call starts a new checkout, so a double-click must not fire twice.
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Checkout error:', error.response?.data || error);
      setCheckoutError(mapCheckoutError(error));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gsp-canvas">

      <div className="gsf-stepper-wrapper">
        <div className="gsf-stepper-row">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="gsf-step">
                <div
                  className={`gsf-step-circle ${currentStep === step.number ? 'active' : ''} ${
                    currentStep > step.number ? 'completed' : ''
                  }`}
                >
                  <span className="gsf-step-number">{step.number}</span>
                </div>
                <div className="gsf-step-label-wrap">
                  <span className={`gsf-step-label ${currentStep === step.number ? 'active' : ''}`}>
                    {step.label}
                  </span>
                </div>
              </div>

              {index < STEPS.length - 1 && (
                <div className="gsf-step-track">
                  <div className={`gsf-step-track-fill ${currentStep > step.number ? 'filled' : ''}`} />
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
              <img src={speedIcon} alt="" />
            </div>
          </div>

          <div className="gsp-plan-line">
            <div className="gsp-plan-line__col">
              <span className="gsp-eyebrow">ISP Package</span>
              <span className="gsp-plan-name">{paymentData.planName || '—'}</span>
            </div>
            <div className="gsp-plan-line__col gsp-plan-line__col--right">
              <span className="gsp-eyebrow">Amount</span>
              <span className="gsp-plan-amount">{paymentData.amount || '—'}</span>
            </div>
          </div>
        </div>

        <div className="gsp-card__row gsp-card__row--split">
          <div className="gsp-field">
            <span className="gsp-eyebrow">Customer Name</span>
            <span className="gsp-value">{paymentData.customerName || '—'}</span>
          </div>
          <div className="gsp-field">
            <span className="gsp-eyebrow">Preferred Installation Date</span>
            <span className="gsp-value">{paymentData.installationDate || '—'}</span>
          </div>
        </div>

        <div className="gsp-card__row">
          <span className="gsp-eyebrow">Contact Details</span>
          <div className="gsp-contact">
            <div className="gsp-contact__item">
              <span className="gsp-value">{paymentData.email || '—'}</span>
            </div>
            <div className="gsp-contact__item">
              <span className="gsp-value">{paymentData.phone || '—'}</span>
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
        {checkoutError && (
          <div className="gsf-error-message" role="alert">
            <p>{checkoutError.message}</p>
            {checkoutError.step && (
              <button
                type="button"
                className="gsp-error-link"
                onClick={() => navigate(checkoutError.step)}
              >
                Go back and fix
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          className="gsp-pay-button"
          onClick={handleCompletePayment}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing…' : 'Complete Payment'}
        </button>

        <p className="gsp-fineprint">
          By completing payment, you agree to IMBIL's Terms of Service and Privacy Policy.
        </p>
      </div>

    </div>
  );
}

export default GetStartedPayment;