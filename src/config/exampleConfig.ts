import { PrefillConfig } from "../organisms/PrefillComponent/PrefillComponent";
import { FormValues } from "../organisms/ConstructRequestForm/ConstructRequestForm";
import { ResponseTypeValue } from "@/services/types/responseTypeAndValue";

export const prefillConfig: PrefillConfig<FormValues> = [
  {
    label: 'Okta samples',
    description: 'With this example you are able to start authentication/signup flow with Okta sample environment. You will not be able to used debugger part of this application.',
    data: {
      authEndpoint: 'https://samples.auth0.com/authorize',
      clientId: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
      redirectUri: 'https://openidconnect.net/callback',
      scope: 'openid profile email phone address',
      responseType: [ResponseTypeValue.ID_TOKEN]
    },
  },
];
