import React, { useRef } from 'react';
import ConstructRequestForm, { FormValues } from '../../organisms/ConstructRequestForm/ConstructRequestForm';
import { redirectToOidcProvider } from '../../services/redirectHandler/redirectHandler';
import Prefill from '../../organisms/PrefillComponent/PrefillComponent';

const ConstructRequestPage: React.FC = () => {
  const onSubmit = (data: FormValues) => {
    redirectToOidcProvider(data);
  };

  const formRef = useRef(null);

  const handlePrefill = (data) => {
    if (formRef.current) {
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