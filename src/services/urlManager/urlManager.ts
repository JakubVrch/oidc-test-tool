import {ResponseModeValue, ResponseTypeValue} from '@/services/types/responseTypeAndValue'

export interface UrlParams {
  authEndpoint?: string;
  clientId?: string;
  redirectUri?: string;
  scope?: string;
  responseType?: (ResponseTypeValue | undefined)[];
  responseMode?: ResponseModeValue;
  state?: string;
  nonce?: string;
  prompt?: string;
  additionalParams?: ({ name?: string; value?: string } | undefined)[] | undefined;
}

export interface UrlResult {
  url?: string;
  error?: string;
}

export interface ParseResult {
  params?: UrlParams;
  error?: string;
}

export const constructUrl = (params: UrlParams): UrlResult => {
  
  if (!params.authEndpoint) return { error: 'Authorization Endpoint is required'} ;
  if (!params.clientId) return  { error: 'Client ID is required' };
  if (!params.redirectUri) return { error: 'Redirect URI is required' };
  if (!params.scope) return { error: 'Scope is required'};
  if (!(Array.isArray(params.responseType) && params.responseType.length > 0)) return { error: 'At least one response type is required' };

  const {
    authEndpoint,
    clientId,
    redirectUri,
    scope,
    responseType,
    responseMode,
    state,
    nonce,
    prompt,
    additionalParams,
  } = params;

  const url = new URL(authEndpoint ?? '');
  url.searchParams.append('client_id', clientId);
  url.searchParams.append('redirect_uri', redirectUri);
  url.searchParams.append('scope', scope);
  url.searchParams.append('response_type', responseType.join(' '));
  if (responseMode) url.searchParams.append('response_mode', responseMode);
  if (state) url.searchParams.append('state', state);
  if (nonce) url.searchParams.append('nonce', nonce);
  if (prompt) url.searchParams.append('prompt', prompt);

  if (additionalParams && Array.isArray(additionalParams)) {
    additionalParams.forEach(param => {
      if (param?.name && param.value) {
        url.searchParams.append(param.name, param.value);
      }
    });
  }

  return { url: url.toString() };
};