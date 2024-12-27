import { useLocation } from 'react-router-dom';

export enum ResponseType {
  Code = 'Code',
  Implicit = 'Implicit',
  Hybrid = 'Hybrid',
}

export enum ResponseMode { Query = 'Query', Fragment = 'Fragment' }

function useOIDCResponseData() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fragmentParams = new URLSearchParams(location.hash.slice(1));

  const isQueryMode = queryParams.has('code') || queryParams.has('id_token') || queryParams.has('access_token');
  const isFragmentMode = fragmentParams.has('code') || fragmentParams.has('id_token') || fragmentParams.has('access_token');

  let responseMode: ResponseMode | null = null;
  let responseType: ResponseType | null = null;
  let code: string | null = null;
  let id_token: string | null = null;
  let access_token: string | null = null;
  let params: URLSearchParams | null = null;

  if (isQueryMode) {
    responseMode = ResponseMode.Query;
    code = queryParams.get('code') ?? null;
    id_token = queryParams.get('id_token') ?? null;
    access_token = queryParams.get('access_token') ?? null;
    params = queryParams;
  } else if (isFragmentMode) {
    responseMode = ResponseMode.Fragment;
    code = fragmentParams.get('code') ?? null;
    id_token = fragmentParams.get('id_token') ?? null;
    access_token = fragmentParams.get('access_token') ?? null;
    params = fragmentParams;
  }

  if (code && id_token) {
    responseType = ResponseType.Hybrid;
  } else if (code) {
    responseType = ResponseType.Code;
  } else if (id_token) {
    responseType = ResponseType.Implicit;
  }

  return { mode: responseMode, responseType, code, id_token, access_token, params };
}

export default useOIDCResponseData;