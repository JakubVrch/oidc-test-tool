export interface OidcParams {
  nonce: string | null;
  state: string | null;
  token_endpoint: string | null;
  client_id: string | null;
  redirect_uri: string | null;
}

export const storeOidcParams = (params: OidcParams) => {
  if (params.nonce) {
    localStorage.setItem('oidc_nonce', params.nonce);
  }
  if (params.state) {
    localStorage.setItem('oidc_state', params.state);
  }
  if (params.token_endpoint) {
    localStorage.setItem('oidc_token_endpoint', params.token_endpoint);
  }
  if (params.client_id) {
    localStorage.setItem('oidc_client_id', params.client_id);
  }
  if (params.redirect_uri) {
    localStorage.setItem('oidc_redirect_uri', params.redirect_uri);
  }
};

export const getStoredOidcParams = (): OidcParams => {
  const nonce = localStorage.getItem('oidc_nonce');
  const state = localStorage.getItem('oidc_state');
  const token_endpoint = localStorage.getItem('oidc_token_endpoint');
  const client_id = localStorage.getItem('oidc_client_id');
  const redirect_uri = localStorage.getItem('oidc_redirect_uri');
  return { nonce, state, token_endpoint, client_id, redirect_uri };
};

export const clearStoredOidcParams = () => {
  localStorage.removeItem('oidc_nonce');
  localStorage.removeItem('oidc_state');
  localStorage.removeItem('oidc_token_endpoint');
  localStorage.removeItem('oidc_client_id');
  localStorage.removeItem('oidc_redirect_uri');
};