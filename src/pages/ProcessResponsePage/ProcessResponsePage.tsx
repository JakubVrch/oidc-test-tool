import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredOidcParams, clearStoredOidcParams, OidcParams } from '../../services/storageService/storageService';

const ProcessResponsePage: React.FC = () => {
  const location = useLocation();
  const [storedParams, setStoredParams] = useState<OidcParams>({ nonce: null, state: null });
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const params = getStoredOidcParams();
      setStoredParams(params);
      clearStoredOidcParams();
      effectRan.current = true;
    }
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const fragmentParams = new URLSearchParams(location.hash.slice(1));

  const isQueryMode = queryParams.has('code') || queryParams.has('id_token') || queryParams.has('access_token');
  const isFragmentMode = fragmentParams.has('code') || fragmentParams.has('id_token') || fragmentParams.has('access_token');

  let mode = '';
  let responseType = '';
  let params: URLSearchParams | null = null;

  if (isQueryMode) {
    mode = 'query';
    params = queryParams;
    if (queryParams.has('code')) {
      responseType = 'Authorization Code';
    } else if (queryParams.has('id_token')) {
      responseType = 'Implicit (ID Token)';
    } else if (queryParams.has('access_token')) {
      responseType = 'Implicit (Access Token)';
    }
  } else if (isFragmentMode) {
    mode = 'fragment';
    params = fragmentParams;
    if (fragmentParams.has('code')) {
      responseType = 'Authorization Code';
    } else if (fragmentParams.has('id_token')) {
      responseType = 'Implicit (ID Token)';
    } else if (fragmentParams.has('access_token')) {
      responseType = 'Implicit (Access Token)';
    }
  }

  return (
    <div>
      <h1>Redirect Page</h1>
      <p>Mode: {mode}</p>
      <p>Response Type: {responseType}</p>
      {location && (
        <div>
          <h2>Raw response:</h2>
          <p>
            {`${location.pathname}${location.search}${location.hash}`}
          </p>
        </div>
      )}
      {params && (
        <div>
          <h2>Received Parameters:</h2>
          <ul>
            {Array.from(params.entries()).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Stored Parameters:</h2>
        <ul>
          <li><strong>Nonce:</strong> {storedParams.nonce}</li>
          <li><strong>State:</strong> {storedParams.state}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProcessResponsePage;