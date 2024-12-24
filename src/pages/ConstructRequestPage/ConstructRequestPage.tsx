import React, { useRef } from 'react';
import ConstructRequestForm, { FormRef, FormValues } from '../../organisms/ConstructRequestForm/ConstructRequestForm';
import { redirectToOidcProvider } from '../../services/redirectHandler/redirectHandler';
import Prefill from '../../organisms/PrefillComponent/PrefillComponent';

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
      <Prefill onPrefill={handlePrefill} />
      <ConstructRequestForm onSubmit={onSubmit} ref={formRef} />
    </div>
  );
};

export default ConstructRequestPage;