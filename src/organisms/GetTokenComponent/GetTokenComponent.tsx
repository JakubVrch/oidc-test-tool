import { useState } from "react";

interface GetTokenComponentProps {
  code: string | null;
  token_endpoint: string | null;
  redirect_uri: string | null;
  client_id: string | null;
};

const GetTokenComponent: React.FC<GetTokenComponentProps> = ({ code, token_endpoint, redirect_uri, client_id }: GetTokenComponentProps) => {
  const [clientSecret, setClientSecret] = useState('');
  const [tokenResponse, setTokenResponse] = useState<{ success: boolean, message?: string } | null>(null);

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
          code: code,
          redirect_uri: redirect_uri,
          client_id: client_id,
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
      {code && (
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
              {`curl -X POST ${token_endpoint ?? 'TOKEN_ENDPOINT'} \\
        -d 'grant_type=authorization_code' \\
        -d 'code=${code ?? 'AUTHORIZATION_CODE'}' \\
        -d 'redirect_uri=${redirect_uri ?? 'REDIRECT_URI'}' \\
        -d 'client_id=${client_id ?? 'CLIENT_ID'}' \\
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
}

export default GetTokenComponent;