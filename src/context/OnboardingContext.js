import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const OnboardingContext = createContext(null);
const STORAGE_KEY = 'imbil_onboarding_state';

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

function loadPersisted() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function OnboardingProvider({ children }) {
  const persisted = loadPersisted();

  const [serviceForm, setServiceForm] = useState(persisted?.serviceForm ?? emptyServiceForm);
  const [selectedPlan, setSelectedPlan] = useState(persisted?.selectedPlan ?? null);
  const [requestId, setRequestId] = useState(persisted?.requestId ?? null);
  const [availabilityDate, setAvailabilityDate] = useState(persisted?.availabilityDate ?? '');
  const [installationPhone, setInstallationPhone] = useState(persisted?.installationPhone ?? '');
  // uploadedFile itself is never restored — File objects can't survive serialization
  const [uploadedFile, setUploadedFileState] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(persisted?.uploadedFileName ?? '');
  const [ninVerification, setNinVerification] = useState(persisted?.ninVerification ?? null);

  // Mirror every serializable field into sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          serviceForm,
          selectedPlan,
          requestId,
          availabilityDate,
          installationPhone,
          uploadedFileName,
          ninVerification,
        })
      );
    } catch {
      // e.g. private/incognito mode blocking storage — don't crash the flow
    }
  }, [serviceForm, selectedPlan, requestId, availabilityDate, installationPhone, uploadedFileName, ninVerification]);

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
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
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