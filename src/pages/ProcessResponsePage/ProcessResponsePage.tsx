import React from 'react';

import { useOIDCResponseData } from './useOIDCResponseData';
import useStoredOidcParams from './useStoredOIDCParams';
import GetTokenComponent from '../../organisms/GetTokenComponent/GetTokenComponent';

const ProcessResponsePage: React.FC = () => {
  const storedParams = useStoredOidcParams();
  const responseData = useOIDCResponseData();

  return (
    <div>
      <h1>Redirect Page</h1>
      <p>Mode: {responseData.mode}</p>
      <p>Response Type: {responseData.responseType}</p>
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
      {responseData.params && (
        <div>
          <h2>Received Parameters:</h2>
          <ul>
            {Array.from(responseData.params.entries()).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      <GetTokenComponent {...storedParams} {...responseData} />
    </div>
  );
};

export default ProcessResponsePage;