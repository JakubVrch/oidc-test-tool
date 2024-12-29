import { PrefillConfig } from "../organisms/PrefillComponent/PrefillComponent";
import { FormValues } from "../organisms/ConstructRequestForm/ConstructRequestForm";

export const prefillConfig: PrefillConfig<FormValues> = [
  {
    label: 'Okta samples',
    description: 'With this example you are able to start authentication/signup flow with Okta sample environment. You will not be able to used debugger part of this application.',
    data: {
      auth_endpoint: 'https://samples.auth0.com/authorize',
      client_id: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
      redirect_uri: 'https://openidconnect.net/callback',
      scope: 'openid profile email phone address',
      response_type_code: false,
      response_type_token: false,
      response_type_id_token: true,
    },
  },
];
