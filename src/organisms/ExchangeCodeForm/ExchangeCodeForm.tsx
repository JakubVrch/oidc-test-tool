import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../../molecules/TextInput/TextInput';

interface ExchangeCodeFormData {
  clientSecret: string;
}

interface ExchangeCodeFormProps {
  onSubmit: SubmitHandler<ExchangeCodeFormData>;
}
const ExchangeCodeForm: React.FC<ExchangeCodeFormProps> = ({ onSubmit }) => {
  const methods = useForm<ExchangeCodeFormData>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput id="clientSecret" label="Client Secret:" type="password" required />
        <button type="submit">Exchange Code</button>
      </form>
    </FormProvider>
  );
};

export default ExchangeCodeForm;