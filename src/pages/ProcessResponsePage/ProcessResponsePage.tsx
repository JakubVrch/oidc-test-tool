import React from "react";
import ReceivedParameters from "../../atoms/ReceivedParameters/ReceivedParameters";
import ResponseSummary from "../../atoms/ResponseSummary/ResponseSummary";
import TokenViewer from "../../molecules/TokenViewer/TokenViewer";
import GetTokenComponent from "../../organisms/GetTokenComponent/GetTokenComponent";
import useOIDCResponseData from "./useOIDCResponseData";
import useStoredOidcParams from "./useStoredOIDCParams";
import DefaultTemplate from "@/templates/Default/Default";
import { Stack } from "@chakra-ui/react";

const ProcessResponsePage: React.FC = () => {
  const { mode, responseType, code, id_token, access_token, params } =
    useOIDCResponseData();
  const { tokenEndpoint, redirectUri, clientId, state, codeVerifier } = useStoredOidcParams();

  return (
    <DefaultTemplate title="Inspect redirect">
      <Stack align="flex-start" gap="8" w="100%" maxW="4xl">
        <ResponseSummary {...{ mode, responseType }} />
        {params && <ReceivedParameters {...{ state, params }} />}
        <TokenViewer token={id_token} tokenName="ID Token" />
        <TokenViewer token={access_token} tokenName="Access Token" />
        {code && tokenEndpoint && redirectUri && clientId && (
          <GetTokenComponent
            {...{ tokenEndpoint, redirectUri, clientId, code, codeVerifier }}
          />
        )}
      </Stack>
    </DefaultTemplate>
  );
};

export default ProcessResponsePage;
