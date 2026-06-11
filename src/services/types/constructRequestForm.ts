import { PKCEMethod } from "@/services/types/pkceMethod";
import {
  ResponseModeValue,
  ResponseTypeValue,
} from "@/services/types/responseTypeAndValue";

export interface ConstructRequestFormValues {
  authEndpoint: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: ResponseTypeValue[];
  responseMode?: ResponseModeValue;
  state?: string;
  nonce?: string;
  prompt?: string;
  tokenEndpoint?: string;
  additionalParams?: { name: string; value: string }[];
  pkceEnabled?: boolean;
  pkceMethod?: PKCEMethod;
  codeVerifier?: string;
  codeChallenge?: string;
}
