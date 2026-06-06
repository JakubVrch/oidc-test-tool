import { useState, useCallback, useRef } from "react";

interface TokenExchangeProps {
  tokenEndpoint: string;
  redirectUri: string;
  clientId: string;
  code: string;
}

export interface CodeExchangeParams {
  useClientSecret: boolean;
  clientSecret?: string;
  useCodeVerifier: boolean;
  codeVerifier?: string;
}

interface TokenResponse {
  success: boolean;
  message: string;
  idToken?: string | null;
  accessToken?: string | null;
}

const useTokenExchange = ({
  tokenEndpoint,
  redirectUri,
  clientId,
  code,
}: TokenExchangeProps) => {
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const isInFlightRef = useRef(false);

  const handleExchangeCode = useCallback(
    async ({
      useClientSecret,
      clientSecret,
      useCodeVerifier,
      codeVerifier,
    }: CodeExchangeParams) => {
      if (isInFlightRef.current) {
        return;
      }

      isInFlightRef.current = true;
      setIsLoading(true);

      try {
        const URLQueryParams: Record<string, string> = {
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
        };

        if (useClientSecret && clientSecret) {
          URLQueryParams.client_secret = clientSecret;
        }

        if (useCodeVerifier && codeVerifier) {
          URLQueryParams.code_verifier = codeVerifier;
        }

        const response = await fetch(tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(URLQueryParams),
        });

        if (response.ok) {
          const data: unknown = await response.json();
          setTokenResponse({
            success: true,
            message: JSON.stringify(data, null, 2),
            idToken: getOptionalValue(data, "id_token"),
            accessToken: getOptionalValue(data, "access_token"),
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
      } finally {
        isInFlightRef.current = false;
        setIsLoading(false);
      }
    },
    [tokenEndpoint, redirectUri, clientId, code],
  );

  return { tokenResponse, isLoading, handleExchangeCode };
};

const getOptionalValue = <T>(data: unknown, key: string): T | null => {
  if (typeof data !== "object" || data === null || !(key in data)) {
    return null;
  }

  return (data as Record<string, unknown>)[key] as T;
};

const getErrorMessage = (data: unknown): string => {
  const error =
    ((data as { error?: string }).error ?? "") +
    " " +
    ((data as { error_description?: string }).error_description ?? "");
  return error ?? "Unknown error";
};

export default useTokenExchange;
