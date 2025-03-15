import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../../molecules/TextInput/TextInput';
import Button from '@/atoms/Button/Button';
import { HStack } from '@chakra-ui/react';

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
        <HStack gap="1em" alignItems="flex-end" maxW="30em">
          <TextInput
            id="clientSecret" label="Client Secret:" type="password" registerOptions={{ required: "This field is required" }} />
          <Button type="submit">Exchange Code</Button>
        </HStack>
      </form>
    </FormProvider>

  );
};

export default ExchangeCodeForm;