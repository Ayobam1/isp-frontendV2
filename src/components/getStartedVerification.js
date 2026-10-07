import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import './getStartedVerification.css';
import phoneIcon from '../assets/veriphone.png';
import encryptionIcon from '../assets/encryption.png';
import uploadIcon from '../assets/uploadIcon.png';
import checkIcon from '../assets/vectorcheck.png';
import { getAvailabilityRange, isDateInRange } from '../utils/dateRange';
import { ROUTES } from '../constants/routes';

function GetStartedVerification({ onContinue }) {
  const {
    availabilityDate: availability_date,
    setAvailabilityDate,
    installationPhone: phone,
    setInstallationPhone: setPhone,
    uploadedFile,
    setUploadedFile,
    selectedPlan,
  } = useOnboarding();

  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { min: minDate, max: maxDate } = getAvailabilityRange();

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

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
    clearError('file');
    setUploadedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleContinue = () => {
    const newErrors = {};

    if (!availability_date) {
      newErrors.availability_date = 'Please pick an installation date.';
    } else if (!isDateInRange(availability_date)) {
      newErrors.availability_date = 'Please pick a date between 2 days and 1 month from today.';
    }
    if (!phone?.trim()) newErrors.phone = 'Phone number is required.';
    if (!uploadedFile) newErrors.file = 'Please upload a utility bill.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!selectedPlan) {
      setErrors({ general: 'Please select a plan first.' });
      return;
    }

    if (onContinue) {
      onContinue({ availability_date, phone, uploadedFile });
    }

    navigate(ROUTES.NIN);
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

        <div className="gsf-heading-container">
          <h1 className="gsf-heading">Step 2: Identity &amp; Address Verification</h1>
          <p className="gsf-subheading">
            We need a few details to confirm your eligibility and service coverage.
          </p>
        </div>

        <div className="gsf-card">
          <div className="gsf-form">

            <div className="gsf-form-grid">
              <div className="gsf-field">
                <label className="gsf-field-label">Preferred Installation Date</label>
                <div className="gsf-input-wrapper">
                  <input
                    type="date"
                    className="gsf-input"
                    value={availability_date || ''}
                    min={minDate}
                    max={maxDate}
                    onChange={(e) => {
                      setAvailabilityDate(e.target.value);
                      clearError('availability_date');
                    }}
                  />
                </div>
                {errors.availability_date && <span className="gsf-error">{errors.availability_date}</span>}
              </div>

              <div className="gsf-field">
                <label className="gsf-field-label">Mobile Contact</label>
                <div className="gsf-input-wrapper">
                  <div className="gsf-input-icon phone-icon">
                    <img src={phoneIcon} alt="" className="phoneicon" />
                  </div>
                  <input
                    type="tel"
                    className="gsf-input"
                    placeholder="e.g. 0800 000 0000"
                    value={phone || ''}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearError('phone');
                    }}
                  />
                </div>
                {errors.phone && <span className="gsf-error">{errors.phone}</span>}
              </div>
            </div>

            {/* Utility bill upload */}
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
                        <img src={uploadIcon} alt="" className="uploadicon" />
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

            {errors.general && <span className="gsf-error">{errors.general}</span>}

            <div className="gsf-verify-actions">
              <div className="gsf-security-note">
                <div className="gsf-security-icon">
                  <img src={encryptionIcon} alt="" className="encryptionicon" />
                </div>
                <span>End-to-end encrypted 256-bit connection</span>
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