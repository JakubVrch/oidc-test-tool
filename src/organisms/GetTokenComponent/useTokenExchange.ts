import { useState, useCallback } from 'react';

interface TokenExchangeProps {
  token_endpoint: string;
  redirect_uri: string;
  client_id: string;
  code: string;
}

interface TokenResponse {
  success: boolean;
  message?: string;
  id_token?: string | null;
  access_token?: string | null;
}

const useTokenExchange = ({ 
  token_endpoint, 
  redirect_uri, 
  client_id, 
  code,
}: TokenExchangeProps) => {
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(null);

  const handleExchangeCode = useCallback(async ({ clientSecret }: { clientSecret: string }) => {
    try {
      const response = await fetch(token_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirect_uri,
          client_id: client_id,
          client_secret: clientSecret, 
        }),
      });

      if (response.ok) {
        const data: unknown = await response.json();
        setTokenResponse({ 
          success: true, 
          message: JSON.stringify(data, null, 2),
          id_token: getOptionalValue(data, 'id_token'),
          access_token: getOptionalValue(data, 'access_token'),
        });
      } else {
        const data: unknown = await response.json();
        setTokenResponse({ 
          success: false, 
          message: `Error ${response.status}: ${getErrorMessage(data)}`,
        });
      }

    } catch (error) {
      setTokenResponse({ 
        success: false, 
        message: `Failed to retrieve token: ${(error as Error).message}`, 
      });
    }
  }, [token_endpoint, redirect_uri, client_id, code]); 

  return { tokenResponse, handleExchangeCode };
};

const getOptionalValue = <T>(data: unknown, key: string): T | null => {
  return (data as Record<string, T>)?.[key] ?? null;
};

const getErrorMessage = (data: unknown): string => {
  return (data as { error_description?: string }).error_description 
    ?? (data as { error?: string }).error 
    ?? 'Unknown error';
};

export default useTokenExchange;