import { storeOidcParams, OidcParams } from '../storageService/storageService';

export interface FormValues {
  auth_endpoint: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  response_type_code: boolean;
  response_type_token: boolean;
  response_type_id_token: boolean;
  response_mode?: 'query' | 'fragment' | 'form_post';
  state?: string;
  nonce?: string;
  prompt?: string;
}

export const redirectToOidcProvider = ({
  auth_endpoint,
  client_id,
  redirect_uri,
  scope,
  response_type_code,
  response_type_token,
  response_type_id_token,
  response_mode,
  state,
  nonce,
  prompt
}: FormValues) => {
  // Validate inputs
  if (!auth_endpoint) {
    throw new Error('Authorization Endpoint is required');
  }
  if (!client_id) {
    throw new Error('Client ID is required');
  }
  if (!redirect_uri) {
    throw new Error('Redirect URI is required');
  }
  if (!scope) {
    throw new Error('Scope is required');
  }

  // Construct response_type array
  const responseTypeArray = [];
  if (response_type_code) responseTypeArray.push('code');
  if (response_type_token) responseTypeArray.push('token');
  if (response_type_id_token) responseTypeArray.push('id_token');

  if (responseTypeArray.length === 0) {
    throw new Error('Response Type is required');
  }

  // Store nonce and state in localStorage
  const oidcParams: OidcParams = {
    nonce: nonce ?? null,
    state: state ?? null,
  };
  storeOidcParams(oidcParams);

  // Construct the URL
  const url = new URL(auth_endpoint);
  url.searchParams.append('client_id', client_id);
  url.searchParams.append('redirect_uri', redirect_uri);
  url.searchParams.append('scope', scope);
  url.searchParams.append('response_type', responseTypeArray.join(' '));
  if (response_mode) url.searchParams.append('response_mode', response_mode);
  if (state) url.searchParams.append('state', state);
  if (nonce) url.searchParams.append('nonce', nonce);
  if (prompt) url.searchParams.append('prompt', prompt);

  window.location.href = url.toString();
};