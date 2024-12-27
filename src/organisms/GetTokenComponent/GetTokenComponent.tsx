import React, { useState } from "react";
import TokenViewer from "../../molecules/TokenViewer/TokenViewer";

interface GetTokenComponentProps {
  storedParams: {
    token_endpoint: string | null;
    redirect_uri: string | null;
    client_id: string | null;
  };
  responseData: {
    code: string | null;
  };
}

const GetTokenComponent: React.FC<GetTokenComponentProps> = ({
  responseData: { code },
  storedParams: { token_endpoint, redirect_uri, client_id },
}) => {
  if (!code || !token_endpoint || !redirect_uri || !client_id) {
    return null;
  }
  const [clientSecret, setClientSecret] = useState('');
  const [tokenResponse, setTokenResponse] = useState<
    { success: boolean; message?: string; id_token?: string; access_token?: string } | null>(null);

  const handleExchangeCode = async () => {
    if (!token_endpoint || !code || !redirect_uri || !client_id || !clientSecret) {
      setTokenResponse({ success: false, message: 'Missing required parameters' });
      return;
    }

    try {
      const response = await fetch(token_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri,
          client_id,
          clientSecret,
        }),
      });
      const data: unknown = await response.json();
      if (data) {
        setTokenResponse({
          success: true,
          message: data,
          id_token: data?.id_token, // Assuming presence of id_token in response
          access_token: data?.access_token, // Assuming presence of access_token in response
        });
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
  };

  return (
    <div>
      {code && (
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
          <button onClick={handleExchangeCode}>Exchange Code</button>
          {tokenResponse && (
            <div>
              <h3>Token Response</h3>
              {tokenResponse.success ? (
                <div>
                  <h4>Raw Response:</h4>
                  <pre>{JSON.stringify(tokenResponse.message, null, 2)}</pre>
                  <TokenViewer token={tokenResponse.id_token ?? null} tokenName="ID Token" />
                  <TokenViewer token={tokenResponse.access_token ?? null} tokenName="Access Token" />
                </div>
              ) : (
                <p style={{ color: 'red' }}>{tokenResponse.message}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GetTokenComponent;