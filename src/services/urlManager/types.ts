import {
  ResponseModeValue,
  ResponseTypeValue,
} from "@/services/types/responseTypeAndValue";

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
  additionalParams?:
    | ({ name?: string; value?: string } | undefined)[]
    | undefined;
  pkceEnabled?: boolean;
  pkceMethod?: string;
  codeChallenge?: string;
  codeVerifier?: string;
}

export interface UrlResult {
  url?: string;
  error?: string;
}

export interface ParseResult {
  params?: UrlParams;
  error?: string;
}