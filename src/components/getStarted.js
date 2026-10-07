import React, { useState, useRef, useEffect } from 'react';
import './getStarted.css';
import SuccessPopup from './SuccessPopup';
import nameIcon from '../assets/peopleVector.png';
import emailIcon from '../assets/startedemail.png';
import numberIcon from '../assets/startedcall.png';
import expandArrow from '../assets/Expand Arrow.png';
import { useOnboarding } from '../context/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../api/authService';
import { AREA_OPTIONS, AREA_PLACEHOLDER } from '../constants/areas';
import { ROUTES } from '../constants/routes';
import { normalizeNigerianPhone } from '../utils/phone';

const ABOUT_US_OPTIONS = [
  { label: 'Social Media', value: 'SOCIAL_MEDIA' },
  { label: 'Website', value: 'WEBSITE' },
  { label: 'Friend', value: 'FRIEND' },
  { label: 'Estate Manager', value: 'ESTATE_MANAGER' },
  { label: 'Sales Agent', value: 'SALES_AGENT' },
];

const API_ERRORS = {
  VALIDATION_002: { field: 'submit', message: 'Please fill in all required fields.' },
  VALIDATION_003: { field: 'email', message: 'Please enter a valid email address.' },
  VALIDATION_004: { field: 'phone', message: 'Please enter a valid phone number.' },
  VALIDATION_005: { field: 'email', message: 'A request with this email already exists.' },
  VALIDATION_008: { field: 'preferredaboutus', message: 'Please select how you heard about us.' },
};

const mapApiError = (error) => {
  if (error.response?.status === 429) {
    return { submit: 'Too many submissions. Please wait a few minutes and try again.' };
  }
  const data = error.response?.data;
  const code = data?.code || data?.error?.code;
  const known = API_ERRORS[code];
  if (known) return { [known.field]: known.message };
  return { submit: data?.message || 'An error occurred. Please try again.' };
};

const Started = () => {
  const navigate = useNavigate();
  const { serviceForm: formData, updateServiceForm } = useOnboarding();

  const termsAgreed = formData.termsAgreed;
  const setTermsAgreed = (value) => updateServiceForm({ termsAgreed: value });

  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [aboutusDropdownOpen, setAboutusDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const areaDropdownRef = useRef(null);
  const aboutusDropdownRef = useRef(null);

  // Close either dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target)) {
        setAreaDropdownOpen(false);
      }
      if (aboutusDropdownRef.current && !aboutusDropdownRef.current.contains(event.target)) {
        setAboutusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateServiceForm({ [name]: value });
    clearError(name);
  };

  const handleAreaSelect = (area) => {
    updateServiceForm({ preferredarea: area });
    setAreaDropdownOpen(false);
    clearError('preferredarea');
  };

  const handleAboutusSelect = (aboutus) => {
    updateServiceForm({
      preferredaboutus: aboutus.label,
      heardAboutUsValue: aboutus.value,
      salesAgentName: aboutus.value === 'SALES_AGENT' ? formData.salesAgentName : '',
    });
    setAboutusDropdownOpen(false);
    clearError('preferredaboutus');
  };

  const validateForm = () => {
    const newErrors = {};
    const nameParts = (formData.name || '').trim().split(/\s+/).filter(Boolean);

    if (nameParts.length === 0) newErrors.name = 'Full name is required';
    else if (nameParts.length < 2) newErrors.name = 'Please enter your first and last name';

    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';

    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';

    if (!formData.address?.trim()) newErrors.address = 'Address is required';

    if (!formData.preferredarea || formData.preferredarea === AREA_PLACEHOLDER) {
      newErrors.preferredarea = 'Please select your area';
    }

    if (!formData.heardAboutUsValue) {
      newErrors.preferredaboutus = 'Please select how you heard about us';
    }

    if (formData.heardAboutUsValue === 'SALES_AGENT' && !formData.salesAgentName?.trim()) {
      newErrors.salesAgentName = "Please enter the sales agent's name";
    }

    if (!termsAgreed) newErrors.terms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const nameParts = formData.name.trim().split(/\s+/);

      const payload = {
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' '),
        email: formData.email.trim().toLowerCase(),
        phone_number: normalizeNigerianPhone(formData.phone),
        address: formData.address.trim(),
        location: formData.preferredarea,
        property_type: formData.residence || 'RESIDENTIAL',
        heard_about_us: formData.heardAboutUsValue,
      };

      if (formData.heardAboutUsValue === 'SALES_AGENT') {
        payload.sales_agent_name = formData.salesAgentName.trim();
      }

      // The backend stores the request and emails the customer about coverage
      await createRequest(payload);
      setShowPopup(true);
    } catch (error) {
      console.error('Backend response:', error.response?.data);
      setErrors(mapApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInClick = () => {
    navigate(ROUTES.SIGN_IN);
  };

  // Runs when the popup auto-closes (after 8s) or the user clicks ×
  const handleClosePopup = () => {
    setShowPopup(false);

    // Carry the details over so the Information Form opens pre-filled
    const nameParts = (formData.name || '').trim().split(/\s+/);
    updateServiceForm({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' '),
      termsAgreed: false,
    });

    navigate(ROUTES.INFO);
  };

  return (
    <div className="get-started-container">
      <div className="frame-168-mobile">
        <button className="hero-close-btn" onClick={() => navigate(ROUTES.HOME)}>✕</button>
      </div>

      <div className="frame-241">
        <div className="frame-208">
          <div className="frame-215">
            <div className="frame-207">
              <h1 className="get-started-title">Service Request Form</h1>
            </div>

            <div className="frame-169">
              {/* Name field */}
              <div className="text-field">
                <label className="field-label">Full Name</label>
                <div className="frame-163">
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className="startedinput-field"
                  />
                  <div className="component-3">
                    <img src={nameIcon} alt="" className="field-icon" />
                  </div>
                </div>
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              {/* Email field */}
              <div className="text-field">
                <label className="field-label">Email</label>
                <div className="frame-163">
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="startedinput-field"
                  />
                  <div className="component-3">
                    <img src={emailIcon} alt="" className="field-icon" />
                  </div>
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              {/* Phone Number field */}
              <div className="text-field">
                <label className="field-label">Phone Number</label>
                <div className="frame-163">
                  <div className="country-code">
                    <span className="country-code-text">+234</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="0800 000 0000"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="startedinput-field"
                  />
                  <div className="component-3">
                    <img src={numberIcon} alt="" className="field-icon" />
                  </div>
                </div>
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>

              {/* Address field */}
              <div className="text-field">
                <label className="field-label">Address</label>
                <div className="frame-163">
                  <input
                    type="text"
                    name="address"
                    placeholder="12 Allen Avenue"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    className="startedinput-field"
                  />
                  <div className="component-3">
                    <img src={nameIcon} alt="" className="field-icon" />
                  </div>
                </div>
                {errors.address && <div className="error-message">{errors.address}</div>}
              </div>

              {/* Area dropdown */}
              <div className="text-field-dropdown" ref={areaDropdownRef}>
                <div className="text-field">
                  <label className="field-label">Area</label>
                  <div
                    className="frame-163 dropdown-field"
                    onClick={() => setAreaDropdownOpen((open) => !open)}
                  >
                    <div className="preferred-plan-text">{formData.preferredarea}</div>
                    <img
                      src={expandArrow}
                      alt=""
                      className={`expand-arrow ${areaDropdownOpen ? 'rotate' : ''}`}
                    />
                  </div>

                  {areaDropdownOpen && (
                    <div className="dropdown-options">
                      {AREA_OPTIONS.map((area) => (
                        <div
                          key={area}
                          className={`dropdown-option ${formData.preferredarea === area ? 'selected' : ''}`}
                          onClick={() => handleAreaSelect(area)}
                        >
                          {area}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.preferredarea && <div className="error-message">{errors.preferredarea}</div>}
                </div>
              </div>

              {/* How did you hear about us */}
              <div className="text-field-dropdown" ref={aboutusDropdownRef}>
                <div className="text-field">
                  <label className="field-label">How did you hear about us</label>
                  <div
                    className="frame-163 dropdown-field"
                    onClick={() => setAboutusDropdownOpen((open) => !open)}
                  >
                    <div className="preferred-plan-text">{formData.preferredaboutus}</div>
                    <img
                      src={expandArrow}
                      alt=""
                      className={`expand-arrow ${aboutusDropdownOpen ? 'rotate' : ''}`}
                    />
                  </div>

                  {aboutusDropdownOpen && (
                    <div className="dropdown-options">
                      {ABOUT_US_OPTIONS.map((aboutus) => (
                        <div
                          key={aboutus.value}
                          className={`dropdown-option ${
                            formData.heardAboutUsValue === aboutus.value ? 'selected' : ''
                          }`}
                          onClick={() => handleAboutusSelect(aboutus)}
                        >
                          {aboutus.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.preferredaboutus && (
                    <div className="error-message">{errors.preferredaboutus}</div>
                  )}
                </div>
              </div>

              {/* Sales Agent */}
              {formData.heardAboutUsValue === 'SALES_AGENT' && (
                <div className="text-field">
                  <label className="field-label">Sales Agent Name</label>
                  <div className="frame-163">
                    <input
                      type="text"
                      name="salesAgentName"
                      placeholder="Enter the sales agent's name"
                      value={formData.salesAgentName || ''}
                      onChange={handleInputChange}
                      className="startedinput-field"
                    />
                  </div>
                  {errors.salesAgentName && (
                    <div className="error-message">{errors.salesAgentName}</div>
                  )}
                </div>
              )}

              {/* Terms agreement checkbox */}
              <div className="check-agreement">
                <div className="terms-row">
                  <div
                    className={`frame-167 ${termsAgreed ? 'checked' : ''}`}
                    onClick={() => setTermsAgreed(!termsAgreed)}
                  >
                    <div className="done-check"></div>
                  </div>
                  <div className="terms-text">I have agreed to the terms and condition.</div>
                </div>
                {errors.terms && <div className="error-message">{errors.terms}</div>}
              </div>

              {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

              <button className="large-button" onClick={handleSubmit} disabled={isSubmitting}>
                <span className="button-text">
                  {isSubmitting ? 'Processing...' : 'Submit Request'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="frame-240">
          <div className="signup-text">
            Already have an account?{' '}
            <span className="sign-in-link" onClick={handleSignInClick}>
              Sign in
            </span>
          </div>
        </div>
      </div>

      <div className="frame-168-desktop"></div>

      <SuccessPopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        title="Request Submitted Successfully"
        message="Thank you! We'll be in touch by email. Taking you to the next step now…"
      />
    </div>
  );
};

export default Started;