import { useEffect, useState, useRef } from 'react';
import { getStoredOidcParams, clearStoredOidcParams, OidcParams } from '../../services/storageService/storageService';

function useStoredOidcParams() {
  const [storedParams, setStoredParams] = useState<OidcParams>({
    nonce: null,
    state: null,
    token_endpoint: null,
    client_id: null,
    redirect_uri: null,
  });
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const params = getStoredOidcParams();
      setStoredParams(params);
      clearStoredOidcParams();
      effectRan.current = true;
    }
  }, []);

  return storedParams;
}

export default useStoredOidcParams;