import { PrefillConfig } from "@/services/types/prefillConfig";
import { FormValues } from "@/services/types/constructRequestForm";
import {
  ResponseTypeValue,
  ResponseModeValue,
} from "@/services/types/responseTypeAndValue";
import { PKCEMethod } from "@/services/types/pkceMethod";

export const prefillConfig: PrefillConfig<FormValues> = [
 
  {
    label: "PKCE with Authorization Code Flow",
    description:
      "Gets an authorization code using PKCE, then allows exchanging it for tokens at the token endpoint. \n Login with the username: user@example.com and password: abcdedf",
    data: {
      authEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/authorize",
      clientId: "DvJpXHCp2hmIC5F7OSEVAvgsm6IXiHDt",
      redirectUri:
        "https://calm-plant-0cc61d103.6.azurestaticapps.net/redirect",
      scope: "openid profile",
      tokenEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/oauth/token",
      responseMode: ResponseModeValue.QUERY,
      responseType: [ResponseTypeValue.CODE],
      nonce: "123456",
      pkceEnabled: true,
      pkceMethod: PKCEMethod.S256,
    },
  },
  {
    label: "Implicit Flow",
    description:
      "Gets an ID token directly from the authorization endpoint. \n Login with the username: user@example.com and password: abcdedf",
    data: {
      authEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/authorize",
      clientId: "DvJpXHCp2hmIC5F7OSEVAvgsm6IXiHDt",
      redirectUri:
        "https://calm-plant-0cc61d103.6.azurestaticapps.net/redirect",
      scope: "openid profile",
      responseMode: ResponseModeValue.FRAGMENT,
      responseType: [ResponseTypeValue.ID_TOKEN],
      nonce: "123456",
    },
  }
];
