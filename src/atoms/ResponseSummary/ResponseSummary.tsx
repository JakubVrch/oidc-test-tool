import React from 'react';
import { ResponseMode, ResponseType } from '../../pages/ProcessResponsePage/useOIDCResponseData';

interface ResponseDetailsProps {
  mode: ResponseMode | null;
  responseType: ResponseType | null;
}

const ResponseDetails: React.FC<ResponseDetailsProps> = ({ mode, responseType }) => {
  return (
    <>
      {(mode && responseType) ? (
        <>
          <p>Success</p>
          <p>Mode: {mode?.valueOf() ?? 'N/A'}</p>
          <p>Response Type: {responseType?.valueOf() ?? 'N/A'}</p>
        </>
      ) : (
        <p>Response is invalid</p>
      )}
    </>
  );
};

export default ResponseDetails;