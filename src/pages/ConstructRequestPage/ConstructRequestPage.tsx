import React, { useRef } from 'react';
import ConstructRequestForm, { FormRef, FormValues } from '../../organisms/ConstructRequestForm/ConstructRequestForm';
import { redirectToOidcProvider } from '../../services/redirectHandler/redirectHandler';
import Prefill from '../../organisms/PrefillComponent/PrefillComponent';
import { prefillConfig } from '../../config/prefillConfig';
import DefaultTemplate from '@/templates/Default/Default';

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
    <DefaultTemplate title="Construct Request">
      <Prefill onPrefill={handlePrefill} prefillConfig={prefillConfig} />
      <ConstructRequestForm onSubmit={onSubmit} ref={formRef} />
    </DefaultTemplate>
  );
};

export default ConstructRequestPage;