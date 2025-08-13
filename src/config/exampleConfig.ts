import { PrefillConfig } from "../organisms/PrefillComponent/PrefillComponent";
import { FormValues } from "../organisms/ConstructRequestForm/ConstructRequestForm";
import {
  ResponseTypeValue,
  ResponseModeValue,
} from "@/services/types/responseTypeAndValue";

export const prefillConfig: PrefillConfig<FormValues> = [
 
  {
    label: "Implicit flow - Id token via fragment",
    description:
      "Gets an id token via fragment from my Auth0 test instance, so the response can be inspected \n Login with the username: user@example.com and password: abcdedf",
    data: {
      authEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/authorize",
      clientId: "DvJpXHCp2hmIC5F7OSEVAvgsm6IXiHDt",
      redirectUri:
        "https://calm-plant-0cc61d103.6.azurestaticapps.net/redirect",
      scope: "openid profile",
      tokenEndpoint: "https://dev-bfpvq5utqmrksbsp.us.auth0.com/oauth/token",
      responseMode: ResponseModeValue.FRAGMENT,
      responseType: [ResponseTypeValue.ID_TOKEN],
      nonce: "123456",
    },
  },
];
