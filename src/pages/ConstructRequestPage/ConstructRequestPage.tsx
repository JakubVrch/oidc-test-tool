import React from 'react';
import ConstructRequestForm, { FormValues } from '../../organisms/ConstructRequestForm/ConstructRequestForm';
import { redirectToOidcProvider } from '../../services/redirectHandler/redirectHandler';

const ConstructRequestPage: React.FC = () => {
  const onSubmit = (data: FormValues) => {
    redirectToOidcProvider(data);
  };

  return (
    <div>
      <h1>Construct Request Page</h1>
      <ConstructRequestForm onSubmit={onSubmit} />
    </div>
  );
};

export default ConstructRequestPage;