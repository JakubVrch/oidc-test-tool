import React from 'react';
import { jwtDecode } from 'jwt-decode';

interface TokenProps {
  token: string | null;
  tokenName: string;
}

const TokenViewer: React.FC<TokenProps> = ({ token, tokenName }) => {
  let tokenHeader: unknown = null;
  let tokenBody: unknown = null;

  if (!token) {
    return null;
  }

  try {
    tokenHeader = jwtDecode(token);
    tokenBody = jwtDecode(token, { header: true });
  } catch {
    // If decoding fails, assume it's not a JWT
  }

  return (
    <div>
      <h3>{tokenName} Information</h3>
      {tokenHeader || tokenBody ? (
        <pre>
          Header: <br />
          {JSON.stringify(tokenHeader, null, 2)}
          <br />
          Body: <br />
          {JSON.stringify(tokenBody, null, 2)}
        </pre>
      ) : (
        <p>Token: {token}</p>
      )}
    </div>
  );
};

export default TokenViewer;