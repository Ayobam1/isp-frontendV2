import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './getStartedVerification.css';
import phoneIcon from '../assets/veriphone.png';
import fingerprintIcon from '../assets/fingerprint.png';
import encryptionIcon from '../assets/encryption.png';
import uploadIcon from '../assets/uploadIcon.png';
import checkIcon from '../assets/vectorcheck.png';
import { verifyAddressAndGetPaymentLink } from '../api/authService';

function GetStartedVerification({ onBack, onContinue }) {
  const [nin, setNin] = useState('');
  const [phone, setPhone] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleNinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setNin(value);
  };

const navigate = useNavigate();

  const handleFileSelect = (file) => {
    if (!file) return;
    const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, file: 'Please upload a PNG, JPG, or PDF file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: 'File must be under 5MB.' }));
      return;
    }
    setErrors((prev) => ({ ...prev, file: null }));
    setUploadedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleContinue = async () => {
    const newErrors = {};

    if (nin.length !== 11) newErrors.nin = 'Enter a valid 11-digit NIN.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!uploadedFile) newErrors.file = 'Please upload a utility bill.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsVerifying(true);

    try {
      const requestId = localStorage.getItem('requestId');
      const address = localStorage.getItem('requestAddress');
      const selectedPlan = JSON.parse(
        localStorage.getItem('selectedPlan') || 'null'
      );

      console.log('Selected plan from localStorage:', selectedPlan);
      console.log('Selected plan ID:', selectedPlan?.id);
      console.log('Plan being sent:', selectedPlan?.id?.toUpperCase());


      if (!requestId || !address || !selectedPlan) {
        setErrors((prev) => ({
          ...prev,
          general: 'Missing request info. Please restart from Step 1.',
        }));
        return;
      }
          const payload = {
        address,
        planType: selectedPlan.id.toUpperCase(), // "classic" -> "CLASSIC"
      };

      console.log('Verifying address with payload:', payload);

     const response = await verifyAddressAndGetPaymentLink(
  requestId,
  payload
);

console.log(
  'Full response from verifyAddressAndGetPaymentLink:',
  response
);

const { matched, paymentUrl } = response;

console.log('Verify-address response:', response);

if (matched && paymentUrl) {
  localStorage.setItem('paymentUrl', paymentUrl);

  if (onContinue) {
    onContinue({ nin, phone, uploadedFile });
  }

  navigate('/verifypayment/');
} else {
  setErrors((prev) => ({
    ...prev,
    general:
      "We couldn't match this address to your request. Please check it and try again.",
  }));
}

    } catch (error) {
      console.error('Address verification failed:', error);
      console.error('Backend response:', error.response?.data);  
      setErrors((prev) => ({
        ...prev,
        general:
          error.response?.data?.message ||
          'Something went wrong verifying your address. Please try again.',
      }));
    } finally {
      setIsVerifying(false);
    }
  };
    

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
              <div className="gsf-step-circle active">
                <span className="gsf-step-number">2</span>
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
                <span className="gsf-step-number">3</span>
              </div>
              <div className="gsf-step-label-wrap">
                <span className="gsf-step-label">Payment</span>
              </div>
            </div>

          </div>
        </div>

        {/* Heading */}
        <div className="gsf-heading-container">
          <h1 className="gsf-heading">Step 2: Identity &amp; Address Verification</h1>
          <p className="gsf-subheading">
            We need a few details to confirm your eligibility and service coverage.
          </p>
        </div>

        {/* Verification Card */}
        <div className="gsf-card">
          <div className="gsf-form">

            {/* NIN + Phone grid */}
            <div className="gsf-form-grid">
              <div className="gsf-field">
                <label className="gsf-field-label">National Identity Number (NIN)</label>
                <div className="gsf-input-wrapper">
                  <div className="gsf-input-icon nin-icon">
                     <img src={fingerprintIcon} alt="Name" className="fingerprinticon" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="gsf-input"
                    placeholder="Enter your 11-digit NIN"
                    value={nin}
                    onChange={handleNinChange}
                  />
                </div>
                {errors.nin && <span className="gsf-error">{errors.nin}</span>}
                <p className="gsf-field-hint">* We verify your identity via NIMC secure gateway.</p>
              </div>

              <div className="gsf-field">
                <label className="gsf-field-label">Mobile Contact</label>
                <div className="gsf-input-wrapper">
                  <div className="gsf-input-icon phone-icon">
                      <img src={phoneIcon} alt="Name" className="phoneicon" />
                  </div>
                  <input
                    type="tel"
                    className="gsf-input"
                    placeholder="e.g. +234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {errors.phone && <span className="gsf-error">{errors.phone}</span>}
              </div>
            </div>

            {/* Upload zone */}
            <div className="gsf-upload-section">
              <label className="gsf-field-label">Address Verification Document</label>

              <div
                className={`gsf-upload-zone ${isDragging ? 'dragging' : ''} ${uploadedFile ? 'has-file' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="gsf-upload-input"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />

                {!uploadedFile ? (
                  <>
                    <div className="gsf-upload-icon-wrap">
                      <div className="gsf-upload-icon">
                          <img src={uploadIcon} alt="Name" className="uploadicon" />
                      </div>
                    </div>
                    <h3 className="gsf-upload-title">Upload Utility Bill</h3>
                    <p className="gsf-upload-text">
                      Drag and drop or click to upload your light bill or waste management bill from the last 3 months. Accepted formats below.
                    </p>
                    <div className="gsf-upload-tags">
                      <span className="gsf-upload-tag">PNG</span>
                      <span className="gsf-upload-tag">JPG</span>
                      <span className="gsf-upload-tag">PDF, max 5MB</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="gsf-upload-icon-wrap success">
                      <div className="gsf-upload-check"></div>
                    </div>
                    <h3 className="gsf-upload-title">{uploadedFile.name}</h3>
                    <p className="gsf-upload-text">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB — click to replace
                    </p>
                  </>
                )}
              </div>
              {errors.file && <span className="gsf-error">{errors.file}</span>}
            </div>

            {/* Actions */}
            <div className="gsf-verify-actions">
              <div className="gsf-security-note">
                <div className="gsf-security-icon">
                  <img src={encryptionIcon} alt="Name" className="encryptionicon" />
                </div>
                <span>End-to-end encrypted 256-bit connection </span>
              </div>
              <button type="button" className="gsf-verify-continue" onClick={handleContinue}>
                Next
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default GetStartedVerification;