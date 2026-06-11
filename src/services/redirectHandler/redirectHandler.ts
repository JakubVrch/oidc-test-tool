import { ConstructRequestFormValues } from "@/services/types/constructRequestForm";
import {
  storeOidcParams,
  OidcParams,
} from "@/services/storageService/storageService";
import { constructUrl } from "@/services/urlManager/urlManager";
import { setLocationHref } from "./setLocationHref";

export const redirectToOidcProvider = (params: ConstructRequestFormValues) => {
  const result = constructUrl(params);

  if (result.error || !result.url) {
    console.error("Error constructing URL:", result.error);
    return;
  } else {
    // Store nonce and state in localStorage
    const {
      clientId,
      redirectUri,
      state,
      nonce,
      tokenEndpoint,
      pkceEnabled,
      codeVerifier,
    } = params;
    const oidcParams: OidcParams = {
      nonce: nonce ?? null,
      state: state ?? null,
      tokenEndpoint: tokenEndpoint ?? null,
      clientId,
      redirectUri,
      codeVerifier: pkceEnabled && codeVerifier ? codeVerifier : null,
    };
    storeOidcParams(oidcParams);

    // Redirect to OIDC provider
    setLocationHref(result.url.toString());
    return;
  }
};
