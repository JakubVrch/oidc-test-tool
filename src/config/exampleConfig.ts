import { PrefillConfig } from "../organisms/PrefillComponent/PrefillComponent";
import { FormValues } from "../organisms/ConstructRequestForm/ConstructRequestForm";
import {
  ResponseTypeValue,
  ResponseModeValue,
} from "@/services/types/responseTypeAndValue";

export const prefillConfig: PrefillConfig<FormValues> = [
  {
    label: "Okta samples",
    description:
      "With this example you are able to start authentication/signup flow with Okta sample environment. You will not be able to used debugger part of this application.",
    data: {
      authEndpoint: "https://samples.auth0.com/authorize",
      clientId: "kbyuFDidLLm280LIwVFiazOqjO3ty8KH",
      redirectUri: "https://openidconnect.net/callback",
      scope: "openid profile email phone address",
      responseType: [ResponseTypeValue.ID_TOKEN],
    },
  },
  {
    label: "Id token via fragment",
    description:
      "Gets an id token via fragment from my Auth0 test instance so the response can be inspected",
    data: {
      authEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/authorize",
      clientId: "U9986Zh55XpwTKKGFncIm2uziHKqzq09",
      redirectUri:
        "https://calm-plant-0cc61d103.6.azurestaticapps.net/redirect",
      scope: "openid profile",
      tokenEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/oauth/token",
      responseMode: ResponseModeValue.FRAGMENT,
      responseType: [ResponseTypeValue.ID_TOKEN],
      nonce: "123456",
    },
  },
  {
    label: "Code via query",
    description:
      "Gets a code via query from my Auth0 test instance so the response can be inspected",
    data: {
      authEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/authorize",
      clientId: "U9986Zh55XpwTKKGFncIm2uziHKqzq09",
      redirectUri:
        "https://calm-plant-0cc61d103.6.azurestaticapps.net/redirect",
      scope: "openid profile",
      tokenEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/oauth/token",
      responseType: [ResponseTypeValue.CODE],
      responseMode: ResponseModeValue.QUERY,
      nonce: "123456",
    },
  },
];
