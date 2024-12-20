export interface OidcParams {
  nonce: string | null;
  state: string | null;
}

export const storeOidcParams = (params: OidcParams) => {
  if (params.nonce) {
    localStorage.setItem('oidc_nonce', params.nonce);
    console.log(`Stored nonce: ${params.nonce}`);
  }
  if (params.state) {
    localStorage.setItem('oidc_state', params.state);
    console.log(`Stored state: ${params.state}`);
  }
};

export const getStoredOidcParams = (): OidcParams => {
  const nonce = localStorage.getItem('oidc_nonce');
  const state = localStorage.getItem('oidc_state');
  console.log(`Retrieved nonce: ${nonce}`);
  console.log(`Retrieved state: ${state}`);
  return { nonce, state };
};

export const clearStoredOidcParams = () => {
  localStorage.removeItem('oidc_nonce');
  localStorage.removeItem('oidc_state');
  console.log('Cleared stored OIDC params');
};