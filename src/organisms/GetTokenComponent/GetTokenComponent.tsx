import React from "react";
import TokenViewer from "../../molecules/TokenViewer/TokenViewer";
import ExchangeCodeForm from "../ExchangeCodeForm/ExchangeCodeForm";
import useTokenExchange from "./useTokenExchange";
import { Heading, Text, Alert, Stack } from "@chakra-ui/react";
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
          <Stack w="100%" gap="2">
            <Heading size="xl">Exchange Authorization Code for Tokens</Heading>
            <Alert.Root status="info">
              <Alert.Indicator />
              <Alert.Title>Please be careful when sharing secrets!</Alert.Title>
            </Alert.Root>
            <ExchangeCodeForm onSubmit={handleExchangeCode} />
            {(tokenResponse && !tokenResponse.success) && (
              <Text style={{ color: 'red' }}>{tokenResponse.message}</Text>
            )}
          </Stack>
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