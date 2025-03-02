export interface OidcParams {
  nonce: string | null;
  state: string | null;
  tokenEndpoint: string | null;
  clientId: string | null;
  redirectUri: string | null;
}

export const storeOidcParams = (params: OidcParams) => {
  if (params.nonce) {
    localStorage.setItem('oidcNonce', params.nonce);
  }
  if (params.state) {
    localStorage.setItem('oidcState', params.state);
  }
  if (params.tokenEndpoint) {
    localStorage.setItem('oidcTokenEndpoint', params.tokenEndpoint);
  }
  if (params.clientId) {
    localStorage.setItem('oidcClientId', params.clientId);
  }
  if (params.redirectUri) {
    localStorage.setItem('oidcRedirectUri', params.redirectUri);
  }
};

export const getStoredOidcParams = (): OidcParams => {
  const nonce = localStorage.getItem('oidcNonce');
  const state = localStorage.getItem('oidcState');
  const tokenEndpoint = localStorage.getItem('oidcTokenEndpoint');
  const clientId = localStorage.getItem('oidcClientId');
  const redirectUri = localStorage.getItem('oidcRedirectUri');
  return { nonce, state, tokenEndpoint, clientId, redirectUri };
};

export const clearStoredOidcParams = () => {
  localStorage.removeItem('oidcNonce');
  localStorage.removeItem('oidcState');
  localStorage.removeItem('oidcTokenEndpoint');
  localStorage.removeItem('oidcClientId');
  localStorage.removeItem('oidcRedirectUri');
};