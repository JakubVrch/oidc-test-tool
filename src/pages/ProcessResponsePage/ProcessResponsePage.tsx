import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredOidcParams, clearStoredOidcParams, OidcParams } from '../../services/storageService/storageService';

const ProcessResponsePage: React.FC = () => {
  const location = useLocation();
  const [storedParams, setStoredParams] = useState<OidcParams>({ nonce: null, state: null, token_endpoint: null, client_id: null, redirect_uri: null });
  const effectRan = useRef(false);
  const [clientSecret, setClientSecret] = useState('');
  const [tokenResponse, setTokenResponse] = useState<{success: boolean,  message?: string } | null>(null);

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
  let code: string | null = '';
  let params: URLSearchParams | null = null;

  if (isQueryMode) {
    mode = 'query';
    params = queryParams;
    if (queryParams.has('code')) {
      responseType = 'Authorization Code';
      code = queryParams.get('code') ?? null;
    } else if (queryParams.has('id_token') || queryParams.has('access_token')) {
      responseType = 'Implicit';
    }
  } else if (isFragmentMode) {
    mode = 'fragment';
    params = fragmentParams;
    if (fragmentParams.has('code')) {
      responseType = 'Authorization Code';
      code = fragmentParams.get('code') ?? null;
    } else if (fragmentParams.has('id_token') || fragmentParams.has('access_token')) {
      responseType = 'Implicit';
    }
  }

  const handleExchangeCode = async () => {
    if (!storedParams.token_endpoint || !code || !storedParams.redirect_uri || !storedParams.client_id || !clientSecret) {
      setTokenResponse({ success: false, message: 'Missing required parameters' });
      return;
    }

    try {
      const response = await fetch(storedParams.token_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: storedParams.redirect_uri,
          client_id: storedParams.client_id,
          client_secret: clientSecret,
        }),
      });
      const data: unknown = await response.json();
      if (data) {
        setTokenResponse({ success: true, message: JSON.stringify(data) });
      } else {
        setTokenResponse({ success: false, message: 'Invalid response format' });
      }
    } catch (error) {
      if (error instanceof Error) {
        setTokenResponse({ success: false, message: `Failed to retrieve token: ${error.message}` });
      } else {
        setTokenResponse({ success: false, message: 'Failed to retrieve token: Unknown error' });
      }
    }
    return
  };

  return (
    <div>
      <h1>Redirect Page</h1>
      <p>Mode: {mode}</p>
      <p>Response Type: {responseType}</p>
      <div>
        <h2>Stored Parameters:</h2>
        <ul>
          <li><strong>Nonce:</strong> {storedParams.nonce}</li>
          <li><strong>State:</strong> {storedParams.state}</li>
          <li><strong>Token Endpoint:</strong> {storedParams.token_endpoint}</li>
          <li><strong>Client ID:</strong> {storedParams.client_id}</li>
          <li><strong>Redirect URI:</strong> {storedParams.redirect_uri}</li>
        </ul>
      </div>
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
      {responseType === 'Authorization Code' && (
        // display button to exchange code for tokens and display curl command to get it manually
        <div>
          <h2>Exchange Authorization Code for Tokens</h2>
          <label>
            Client Secret:
            <input
              type="password"
              name="clientSecret"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
            />
          </label>
          <div>
            <h3>cURL Command</h3>
            <pre>
          {`curl -X POST ${storedParams.token_endpoint ?? 'TOKEN_ENDPOINT'} \\
          -d 'grant_type=authorization_code' \\
          -d 'code=${code ?? 'AUTHORIZATION_CODE'}' \\
          -d 'redirect_uri=${storedParams.redirect_uri ?? 'REDIRECT_URI'}' \\
          -d 'client_id=${storedParams.client_id ?? 'CLIENT_ID'}' \\
          -d 'client_secret=CLIENT_SECRET'`}
            </pre>
          </div>
          <button onClick={handleExchangeCode}>Exchange Code</button>
          {tokenResponse && (
            <div>
              <h3>Token Response</h3>
                {tokenResponse.success ? (
                <div>
                  <h4>Raw Response:</h4>
                  <pre>{JSON.stringify(tokenResponse.message, null, 2)}</pre>
                  <h4>Parsed Response:</h4>
                  <ul>
                  {Object.entries(JSON.parse(tokenResponse.message ?? '{}') as Record<string, unknown>).map(([key, value]) => (
                    <li key={key}>
                    <strong>{key}:</strong> {String(value)}
                    </li>
                  ))}
                  </ul>
                </div>
                ) : (
          <p style={{ color: 'red' }}>{tokenResponse.message}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessResponsePage;