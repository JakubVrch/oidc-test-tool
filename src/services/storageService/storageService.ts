export interface OidcParams {
  nonce: string | null;
  state: string | null;
  tokenEndpoint: string | null;
  clientId: string | null;
  redirectUri: string | null;
  codeVerifier: string | null;
}

const OIDC_PARAMS_KEY = "oidcParams";

const EMPTY_OIDC_PARAMS: OidcParams = {
  nonce: null,
  state: null,
  tokenEndpoint: null,
  clientId: null,
  redirectUri: null,
  codeVerifier: null,
};

const getStringOrNull = (
  record: Partial<OidcParams>,
  key: keyof OidcParams,
): string | null => (typeof record[key] === "string" ? record[key] : null);

export const storeOidcParams = (params: OidcParams) => {
  localStorage.setItem(OIDC_PARAMS_KEY, JSON.stringify(params));
};

export const getStoredOidcParams = (): OidcParams => {
  const serializedParams = localStorage.getItem(OIDC_PARAMS_KEY);
  if (!serializedParams) {
    return { ...EMPTY_OIDC_PARAMS };
  }

  try {
    const parsed: unknown = JSON.parse(serializedParams);
    if (typeof parsed !== "object" || parsed === null) {
      return { ...EMPTY_OIDC_PARAMS };
    }

    const record = parsed as Partial<OidcParams>;
    return {
      nonce: getStringOrNull(record, "nonce"),
      state: getStringOrNull(record, "state"),
      tokenEndpoint: getStringOrNull(record, "tokenEndpoint"),
      clientId: getStringOrNull(record, "clientId"),
      redirectUri: getStringOrNull(record, "redirectUri"),
      codeVerifier: getStringOrNull(record, "codeVerifier"),
    };
  } catch {
    return { ...EMPTY_OIDC_PARAMS };
  }
};

export const clearStoredOidcParams = () => {
  localStorage.removeItem(OIDC_PARAMS_KEY);
};
