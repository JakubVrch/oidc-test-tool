import { forwardRef, useImperativeHandle } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ConstructedUrlDisplay from '../../atoms/ConstructedUrlDisplay/ConstructedUrlDisplay';
import CheckboxField from '../../molecules/CheckboxInput/CheckboxInput';
import SelectInput from '../../molecules/SelectInput/SelectInput';
import TextInput from '../../molecules/TextInput/TextInput';
import AdditionalParameters from '../AdditionalParametersFormPart/AdditionalParameters';
import useConstructedUrl from './useConstructedUrl';
import { DevTool } from '@hookform/devtools';
import { prefillFormData } from '../../services/prefillFormData/prefillFormData';
import { createListCollection } from '@chakra-ui/react';
import Button from '@/atoms/Button/Button';
import { ResponseModeValue, ResponseTypeValue } from '@/services/types/responseTypeAndValue'
import FormStack from '@/atoms/FormStack/FormStack';

const responseTypeOptions = Object.values(ResponseTypeValue).map((value) => ({
  value,
  label: value,
}));

const responseModeOptions = createListCollection({
  items: Object.values(ResponseModeValue).map((value) => ({
    value,
    label: value,
  })),
})

export interface FormValues {
  authEndpoint: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: ResponseTypeValue[];
  responseMode?: ResponseModeValue;
  state?: string;
  nonce?: string;
  prompt?: string;
  tokenEndpoint?: string;
  additionalParams?: { name: string; value: string }[];
}

export interface FormRef {
  prefill: (data: FormValues) => void;
}

interface ConstructRequestFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const ConstructRequestForm = forwardRef<FormRef, ConstructRequestFormProps>(({ onSubmit }, ref) => {

  const methods = useForm<FormValues>();
  const { handleSubmit, setValue, watch, control } = methods;

  const constructedUrl = useConstructedUrl(watch);

  useImperativeHandle<unknown, FormRef>(ref, () => ({
    prefill: (data: FormValues) => {
      prefillFormData<FormValues>(setValue, data);
    },
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <FormStack>
          <DevTool control={control} /> {/* Enable DevTools */}
          <TextInput id="authEndpoint" label="Authorization Endpoint" type="url" registerOptions={{ required: "This field is required" }} />
          <TextInput id="clientId" label="Client ID" type="text" registerOptions={{ required: "This field is required" }} />
          <TextInput id="redirectUri" label="Redirect URI" type="url" registerOptions={{ required: "This field is required" }} />
          <TextInput id="tokenEndpoint" label="Token Endpoint" type="url" />
          <TextInput id="scope" label="Scope" type="text" registerOptions={{ required: "This field is required" }} />
          <CheckboxField name="responseType" label="Response Type" items={responseTypeOptions} registerOptions={{
            validate: (value) => Array.isArray(value) && value.length > 0 || "At least one response type is required"
          }} />
          <SelectInput id="responseMode" label="Response Mode" options={responseModeOptions} />
          <TextInput id="state" label="State" type="text" />
          <TextInput id="nonce" label="Nonce" type="text" />
          <TextInput id="prompt" label="Prompt" type="text" />
          <AdditionalParameters name="additionalParams" />
          <ConstructedUrlDisplay url={constructedUrl} />
          <Button type="submit">Redirect</Button>
        </FormStack>
      </form>
    </FormProvider>
  );
});

ConstructRequestForm.displayName = 'ConstructRequestForm';

export default ConstructRequestForm;