import React from "react";
import TokenViewer from "../../molecules/TokenViewer/TokenViewer";
import ExchangeCodeForm from "../ExchangeCodeForm/ExchangeCodeForm";
import useTokenExchange from "./useTokenExchange";
import { Heading, Text, Box } from "@chakra-ui/react";
import CodeViewer from "@/atoms/CodeViewer/CodeViewer";

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
    <>
      {code && (
        <>
          <Box w="100%">
            <Heading size="xl">Exchange Authorization Code for Tokens</Heading>
            <ExchangeCodeForm onSubmit={handleExchangeCode} />
            {(tokenResponse && !tokenResponse.success) && (
              <Text style={{ color: 'red' }}>{tokenResponse.message}</Text>
            )}
          </Box>
          <>
            {tokenResponse && tokenResponse.success && (
              <>
                <CodeViewer headingText="Raw Token EP Response"> {tokenResponse.message} </CodeViewer>
                <TokenViewer token={tokenResponse.idToken ?? null} tokenName="Token EP ID Token" />
                <TokenViewer token={tokenResponse.accessToken ?? null} tokenName="Token EP Access Token" />
              </>
            )}
          </>

        </>
      )}
    </>
  )
}

export default GetTokenComponent;