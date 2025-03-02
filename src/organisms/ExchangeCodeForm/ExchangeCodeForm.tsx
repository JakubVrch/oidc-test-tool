import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../../molecules/TextInput/TextInput';
import Button from '@/atoms/Button/Button';

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
        <TextInput id="clientSecret" label="Client Secret:" type="password"  registerOptions={{required: "This field is required"}} />
        <Button type="submit">Exchange Code</Button>
      </form>
    </FormProvider>
  );
};

export default ExchangeCodeForm;