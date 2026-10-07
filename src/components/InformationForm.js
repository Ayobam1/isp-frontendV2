import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import { AREA_OPTIONS, AREA_PLACEHOLDER } from '../constants/areas';
import { ROUTES } from '../constants/routes';
import userIcon from '../assets/peopleVector.png';
import mailIcon from '../assets/EmailVector.png';
import phoneIcon from '../assets/startedcall.png';
import './InformationForm.css';

const ABOUT_US_OPTIONS = [
  { label: 'Social Media', value: 'SOCIAL_MEDIA' },
  { label: 'Website', value: 'WEBSITE' },
  { label: 'Friend', value: 'FRIEND' },
  { label: 'Estate Manager', value: 'ESTATE_MANAGER' },
  { label: 'Sales Agent', value: 'SALES_AGENT' },
];



const InformationForm = () => {
  const navigate = useNavigate();
  const { serviceForm, updateServiceForm } = useOnboarding();

  const [coverageConfirmed, setCoverageConfirmed] = useState('yes');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateServiceForm({ [name]: value });
    clearError(name);
  };

  const handleHeardAboutUsChange = (e) => {
    const value = e.target.value;
    const option = ABOUT_US_OPTIONS.find((o) => o.value === value);
    updateServiceForm({
      heardAboutUsValue: value,
      preferredaboutus: option ? option.label : '',
      salesAgentName: value === 'SALES_AGENT' ? serviceForm.salesAgentName : '',
    });
    clearError('heardAboutUsValue');
  };

  const validate = () => {
    const newErrors = {};

    if (!serviceForm.firstName?.trim()) newErrors.firstName = 'Enter your first name.';
    if (!serviceForm.lastName?.trim()) newErrors.lastName = 'Enter your last name.';

    if (!serviceForm.email?.trim()) newErrors.email = 'Enter your email address.';
    else if (!/\S+@\S+\.\S+/.test(serviceForm.email)) newErrors.email = 'Enter a valid email address.';

    if (!serviceForm.phone?.trim()) newErrors.phone = 'Enter your phone number.';
    if (!serviceForm.address?.trim()) newErrors.address = 'Enter your street address.';

    if (coverageConfirmed !== 'yes') {
      newErrors.coverage = 'Check that we cover your area before signing up.';
    }

    if (!serviceForm.preferredarea || serviceForm.preferredarea === AREA_PLACEHOLDER) {
      newErrors.preferredarea = 'Select your area.';
    }

    if (serviceForm.heardAboutUsValue === 'SALES_AGENT' && !serviceForm.salesAgentName?.trim()) {
      newErrors.salesAgentName = "Enter the sales agent's name.";
    }

    if (!termsAgreed) newErrors.terms = 'Agree to the terms and conditions to continue.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    navigate(ROUTES.PLAN);
  };

  return (
    <div className="if-page">
      <form className="if-card" onSubmit={handleSubmit} noValidate>
        <div className="if-container">
          <header className="if-header">
            <h1 className="if-title">Get On The Fastlane!</h1>
            <p className="if-subtitle">Sign-Up with us</p>
          </header>

          <div className="if-form">
            {/* First and last name */}
            <div className="if-row">
              <div className="if-field">
                <label className="if-label" htmlFor="if-firstName">First Name</label>
                <div className="if-input-wrap">
                  <input
                    id="if-firstName"
                    name="firstName"
                    type="text"
                    className="if-input"
                    placeholder="First Name"
                    autoComplete="given-name"
                    value={serviceForm.firstName || ''}
                    onChange={handleChange}
                  />
                 <span className="if-input-icon"><img src={userIcon} alt="" /></span>
                </div>
                {errors.firstName && <p className="if-error">{errors.firstName}</p>}
              </div>

              <div className="if-field">
                <label className="if-label" htmlFor="if-lastName">Last Name</label>
                <div className="if-input-wrap">
                  <input
                    id="if-lastName"
                    name="lastName"
                    type="text"
                    className="if-input"
                    placeholder="Last Name"
                    autoComplete="family-name"
                    value={serviceForm.lastName || ''}
                    onChange={handleChange}
                  />
                <span className="if-input-icon"><img src={userIcon} alt="" /></span>
                </div>
                {errors.lastName && <p className="if-error">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email and phone */}
            <div className="if-row">
              <div className="if-field">
                <label className="if-label" htmlFor="if-email">E-Mail</label>
                <div className="if-input-wrap">
                  <input
                    id="if-email"
                    name="email"
                    type="email"
                    className="if-input"
                    placeholder="email@example.com"
                    autoComplete="email"
                    value={serviceForm.email || ''}
                    onChange={handleChange}
                  />
                 <span className="if-input-icon"><img src={mailIcon} alt="" /></span>
                </div>
                {errors.email && <p className="if-error">{errors.email}</p>}
              </div>

              <div className="if-field">
                <label className="if-label" htmlFor="if-phone">Phone Number</label>
                <div className="if-input-wrap">
                  <input
                    id="if-phone"
                    name="phone"
                    type="tel"
                    className="if-input"
                    placeholder="0800 000 0000"
                    autoComplete="tel"
                    value={serviceForm.phone || ''}
                    onChange={handleChange}
                  />
                <span className="if-input-icon"><img src={phoneIcon} alt="" /></span>
                </div>
                {errors.phone && <p className="if-error">{errors.phone}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="if-field">
              <label className="if-label" htmlFor="if-address">Full Address</label>
              <div className="if-input-wrap">
                <input
                  id="if-address"
                  name="address"
                  type="text"
                  className="if-input"
                  placeholder="Street name, house/suite number"
                  autoComplete="street-address"
                  value={serviceForm.address || ''}
                  onChange={handleChange}
                />
                {/* <span className="if-input-icon"><PinIcon /></span> */}
              </div>
              {errors.address && <p className="if-error">{errors.address}</p>}
            </div>

            {/* Coverage confirmation */}
            <fieldset className="if-coverage">
              <legend className="if-label">Have you confirmed our coverage in your area?</legend>

              <label className="if-radio">
                <input
                  type="radio"
                  name="coverageConfirmed"
                  value="yes"
                  checked={coverageConfirmed === 'yes'}
                  onChange={() => { setCoverageConfirmed('yes'); clearError('coverage'); }}
                />
                <span className="if-radio-mark" aria-hidden="true" />
                Yes
              </label>

              <label className="if-radio">
                <input
                  type="radio"
                  name="coverageConfirmed"
                  value="no"
                  checked={coverageConfirmed === 'no'}
                  onChange={() => setCoverageConfirmed('no')}
                />
                <span className="if-radio-mark" aria-hidden="true" />
                No
              </label>

              <Link to={ROUTES.REQUEST} className="if-link">Not sure? Check coverage here</Link>
              {errors.coverage && <p className="if-error">{errors.coverage}</p>}
            </fieldset>

            {/* Service area */}
            <div className="if-field">
              <label className="if-label" htmlFor="if-area">Service Area</label>
              <select
                id="if-area"
                name="preferredarea"
                className={`if-input if-select ${
                  !serviceForm.preferredarea || serviceForm.preferredarea === AREA_PLACEHOLDER ? 'is-placeholder' : ''
                }`}
                value={serviceForm.preferredarea || AREA_PLACEHOLDER}
                onChange={handleChange}
              >
                <option value={AREA_PLACEHOLDER} disabled>Select your Area</option>
                {AREA_OPTIONS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.preferredarea && <p className="if-error">{errors.preferredarea}</p>}
            </div>

            {/* How did you hear about us */}
            <div className="if-field">
              <label className="if-label" htmlFor="if-heard">How did you hear about us?</label>
              <select
                id="if-heard"
                name="heardAboutUsValue"
                className={`if-input if-select ${!serviceForm.heardAboutUsValue ? 'is-placeholder' : ''}`}
                value={serviceForm.heardAboutUsValue || ''}
                onChange={handleHeardAboutUsChange}
              >
                <option value="">Referral, Social Media, Advertisement</option>
                {ABOUT_US_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {serviceForm.heardAboutUsValue === 'SALES_AGENT' && (
              <div className="if-field">
                <label className="if-label" htmlFor="if-agent">Sales Agent Name</label>
                <div className="if-input-wrap">
                  <input
                    id="if-agent"
                    name="salesAgentName"
                    type="text"
                    className="if-input"
                    placeholder="Enter the sales agent's name"
                    value={serviceForm.salesAgentName || ''}
                    onChange={handleChange}
                  />
                </div>
                {errors.salesAgentName && <p className="if-error">{errors.salesAgentName}</p>}
              </div>
            )}

            {/* Terms */}
            <div className="if-terms-wrap">
              <label className="if-terms">
                <input
                  type="checkbox"
                  className="if-checkbox"
                  checked={termsAgreed}
                  onChange={(e) => { setTermsAgreed(e.target.checked); clearError('terms'); }}
                />
                <span className="if-terms-text">
                  I confirm that all information provided is accurate and I agree to the{' '}
                  <a href="/#/terms" className="if-terms-link" target="_blank" rel="noreferrer">
                    Service Terms and Conditions
                  </a>.
                </span>
              </label>
              {errors.terms && <p className="if-error">{errors.terms}</p>}
            </div>

            <button type="submit" className="if-button">Get Started</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InformationForm;