import React from "react";
import { jwtDecode } from "jwt-decode";
import CodeViewer from "@/atoms/CodeViewer/CodeViewer";

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
    tokenBody = jwtDecode(token);
    tokenHeader = jwtDecode(token, { header: true });
  } catch {
    // If decoding fails, assume it's not a JWT
  }

  return (
    <CodeViewer headingText={tokenName + " Information"}>
      {tokenHeader || tokenBody ? (
        <>
          Header: <br />
          {JSON.stringify(tokenHeader, null, 2)}
          <br />
          Body: <br />
          {JSON.stringify(tokenBody, null, 2)}
        </>
      ) : (
        <>
          <p>Token: {token}</p>
        </>
      )}
    </CodeViewer>
  );
};

export default TokenViewer;
