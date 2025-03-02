import React from "react";
import TokenViewer from "../../molecules/TokenViewer/TokenViewer";
import ExchangeCodeForm from "../ExchangeCodeForm/ExchangeCodeForm";
import useTokenExchange from "./useTokenExchange";

interface GetTokenComponentProps {
  tokenEndpoint: string;
  redirectUri: string;
  clientId: string;
  code: string;
};

const GetTokenComponent: React.FC<GetTokenComponentProps> = ({
  code, tokenEndpoint, redirectUri, clientId,
}) => {
  const {
    tokenResponse,
    handleExchangeCode
  } = useTokenExchange({
    tokenEndpoint,
    redirectUri,
    clientId,
    code
  });

  return (
    <div>
      {code && (
        <div>
          <h2>Exchange Authorization Code for Tokens</h2>
          <ExchangeCodeForm onSubmit={handleExchangeCode} />
          {tokenResponse && (
            <div>
              <h3>Token Response</h3>
              {tokenResponse.success ? (
                <div>
                  <h4>Raw Response:</h4>
                  <pre>{tokenResponse.message}</pre>
                  <TokenViewer token={tokenResponse.idToken ?? null} tokenName="ID Token" />
                  <TokenViewer token={tokenResponse.accessToken ?? null} tokenName="Access Token" />
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