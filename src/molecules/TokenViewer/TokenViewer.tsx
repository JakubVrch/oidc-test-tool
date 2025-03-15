import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Box, chakra, Code, Heading } from '@chakra-ui/react';

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

  const Pre = chakra('pre', {
    base: {
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  });


  return (
    <Box w="100%">
      <Heading size="xl">{tokenName} Information</Heading>
      <Code
        size="md"
        w="100%"
      >
        <Pre overflow="hidden" textOverflow="ellipsis">

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

        </Pre>
      </Code>
    </Box>
  );
};

export default TokenViewer;