import React, { useRef } from 'react';
import ConstructRequestForm, { FormRef, FormValues } from '../../organisms/ConstructRequestForm/ConstructRequestForm';
import { redirectToOidcProvider } from '../../services/redirectHandler/redirectHandler';
import Prefill, { PrefillConfig } from '../../molecules/PrefillComponent/PrefillComponent';

// TODO: Remove this when implementing env variable loading
const prefillConfigs: PrefillConfig<FormValues> = [
  {
    label: 'Config 1',
    data: {
      auth_endpoint: 'https://auth.example.com',
      client_id: 'client_id_1',
      redirect_uri: 'https://redirect.example.com',
      scope: 'scope1',
      response_type_code: true,
      response_type_token: false,
      response_type_id_token: false,
      token_endpoint: 'https://token.example.com',
      additional_params: [
        { name: 'param1', value: 'value1' },
        { name: 'param2', value: 'value2' },
      ],
    },
  },
];

const ConstructRequestPage: React.FC = () => {
  const onSubmit = (data: FormValues) => {
    redirectToOidcProvider(data);
  };

  const formRef = useRef<FormRef>(null);

  const handlePrefill = (data: FormValues) => {
    if (formRef.current?.prefill) {
      formRef.current.prefill(data);
    }
  };

  return (
    <div>
      <h1>Construct Request Page</h1>
      <Prefill onPrefill={handlePrefill} prefillConfig={prefillConfigs}/>
      <ConstructRequestForm onSubmit={onSubmit} ref={formRef} />
    </div>
  );
};

export default ConstructRequestPage;