import { useEffect, useRef, useState, useCallback } from 'react';
import { IkycSdk } from '@imbil_kyc/web-sdk';
import './Ninverification.css';

function Ninverification({ userId, onVerified, onRetry }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading'); 
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0); 

  const onVerifiedRef = useRef(onVerified);
  useEffect(() => {
    onVerifiedRef.current = onVerified;
  }, [onVerified]);
  useEffect(() => {
    setStatus('loading');
    setError('');

    let isMounted = true;
    let ikycInstance = null;

    const ikyc = new IkycSdk({
      publicKey: process.env.REACT_APP_IKYC_PUBLIC_KEY,
      apiUrl: process.env.REACT_APP_IKYC_HOST,
      externalUserId: userId,
      onComplete(result) {
        if (!isMounted) return;
        setStatus(result.verdict === 'approved' ? 'complete' : 'failed');
        onVerifiedRef.current?.(result);
      },
      onError(err) {
        if (!isMounted) return;
        setStatus('error');
        setError('We could not verify your NIN. Please try again.');
      },
    });

    ikyc.mount();
    ikycInstance = ikyc;

    return () => {
      isMounted = false;
      setTimeout(() => {
        if (typeof ikycInstance?.unmount === 'function') {
          ikycInstance.unmount();
        }
      }, 0);
    };
  }, [userId, attempt]);

  const handleRetry = useCallback(() => {
    onRetry?.(); 
    setAttempt((a) => a + 1);
  }, [onRetry]);

  return (
    <div className="nin-verification">
      {status === 'loading' && <p className="nin-loading">Loading verification...</p>}
      <div ref={containerRef} style={{ display: status === 'loading' ? 'block' : 'none' }} />

      {status === 'error' && (
        <div className="nin-retry-block">
          <p className="nin-error">{error}</p>
          <button type="button" className="nin-retry-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}

      {status === 'failed' && (
        <div className="nin-retry-block">
          <button type="button" className="nin-retry-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Ninverification;