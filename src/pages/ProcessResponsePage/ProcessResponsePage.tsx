import React from 'react';

import { useOIDCResponseData } from './useOIDCResponseData';
import useStoredOidcParams from './useStoredOIDCParams';
import GetTokenComponent from '../../organisms/GetTokenComponent/GetTokenComponent';
import ResponseDetails from '../../atoms/ResponseSummary/ResponseSummary';
import ReceivedParameters from '../../atoms/ReceivedParameters/ReceivedParameters';
import TokenViewer from '../../molecules/TokenViewer/TokenViewer';

const ProcessResponsePage: React.FC = () => {
  const storedParams = useStoredOidcParams();
  const responseData = useOIDCResponseData();

  return (
    <div>
      <h1>Redirect Page</h1>
      <ResponseDetails {...responseData} />
      <ReceivedParameters storedParams={storedParams} responseData={responseData} />
      <TokenViewer token={responseData.id_token} tokenName="ID Token" />
      <TokenViewer token={responseData.access_token} tokenName="Access Token" />
      <GetTokenComponent storedParams={storedParams} responseData={responseData} />
    </div>
  );
};

export default ProcessResponsePage;