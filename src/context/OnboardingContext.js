import { createContext, useContext, useState, useCallback } from 'react';

const OnboardingContext = createContext(null);

const emptyServiceForm = {
  name: '',
  contactPhone: '',
  address: '',
  email: '',
  preferredarea: 'Select City',
  preferredaboutus: 'Select how you heard about us',
  heardAboutUsValue: '',
  salesAgentName: '',
  termsAgreed: false,
};

export function OnboardingProvider({ children }) {
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [installationPhone, setInstallationPhone] = useState('');
  const [uploadedFile, setUploadedFileState] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [ninVerification, setNinVerification] = useState(null);

  const updateServiceForm = useCallback((updates) => {
    setServiceForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const setUploadedFile = useCallback((file) => {
    setUploadedFileState(file);
    setUploadedFileName(file ? file.name : '');
  }, []);

  const clearOnboardingData = useCallback(() => {
    setServiceForm(emptyServiceForm);
    setSelectedPlan(null);
    setRequestId(null);
    setAvailabilityDate('');
    setInstallationPhone('');
    setUploadedFileState(null);
    setUploadedFileName('');
    setNinVerification(null);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        serviceForm,
        updateServiceForm,
        selectedPlan,
        setSelectedPlan,
        requestId,
        setRequestId,
        availabilityDate,
        setAvailabilityDate,
        installationPhone,
        setInstallationPhone,
        uploadedFile,
        uploadedFileName,
        setUploadedFile,
        ninVerification,
        setNinVerification,
        clearOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within an OnboardingProvider');
  return ctx;
}