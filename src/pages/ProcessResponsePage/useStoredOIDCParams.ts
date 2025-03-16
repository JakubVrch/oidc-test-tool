import { useEffect, useState, useRef } from "react";
import {
  getStoredOidcParams,
  OidcParams,
} from "../../services/storageService/storageService";

function useStoredOidcParams() {
  const [storedParams, setStoredParams] = useState<OidcParams>({
    nonce: null,
    state: null,
    tokenEndpoint: null,
    clientId: null,
    redirectUri: null,
  });
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const params = getStoredOidcParams();
      setStoredParams(params);
      effectRan.current = true;
    }
  }, []);

  return storedParams;
}

export default useStoredOidcParams;
