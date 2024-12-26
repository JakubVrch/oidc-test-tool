import { FormValues } from '../../organisms/ConstructRequestForm/ConstructRequestForm';
import { storeOidcParams, OidcParams } from '../storageService/storageService';
import {constructUrl } from '../urlManager/urlManager';

export const redirectToOidcProvider = (params: FormValues) => {
  const result = constructUrl(params);

  if (result.error || !result.url) {
    console.error('Error constructing URL:', result.error);
    return;
  } else {
  // Store nonce and state in localStorage
  const {
    client_id,
    redirect_uri,
    state,
    nonce,
    token_endpoint
  } = params;
  const oidcParams: OidcParams = {
    nonce: nonce ?? null,
    state: state ?? null,
    token_endpoint: token_endpoint ?? null,
    client_id,
    redirect_uri
  };
  storeOidcParams(oidcParams);

  // Redirect to OIDC provider
  window.location.href = result.url.toString();
  return;
  }
};