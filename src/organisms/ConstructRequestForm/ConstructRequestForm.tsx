import { forwardRef, useImperativeHandle } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ConstructedUrlDisplay from '../../atoms/ConstructedUrlDisplay/ConstructedUrlDisplay';
import CheckboxField from '../../molecules/CheckboxInput/CheckboxInput';
import SelectInput from '../../molecules/SelectInput/SelectInput';
import TextInput from '../../molecules/TextInput/TextInput';
import AdditionalParameters from '../AdditionalParametersFormPart/AdditionalParameters';
import useAutofill from './useAutofill';
import useConstructedUrl from './useConstructedUrl';
import { DevTool } from '@hookform/devtools';
import { prefillFormData } from '../../services/prefillFormData/prefillFormData';
import { createListCollection } from '@chakra-ui/react';
import Button from '@/atoms/Button/Button';
import {ResponseModeValue, ResponseTypeValue} from '@/services/types/responseTypeAndValue'

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

  const methods= useForm<FormValues>();
  const { handleSubmit, setValue, getValues, watch, control } = methods;

  //TODO: Fix tests (and type errors)
  //TODO: Clean and refactor form and UI components
  //TODO: Implement autofill for checkbox group and fix issues
  //useAutofill(setValue);
  const constructedUrl = useConstructedUrl(watch);

  // TODO: Checkbox array should be refactored after we implement UI library together with the CheckboxInput component and validation
  const validateResponseType = () => {
    const values = getValues(['response_type_code', 'response_type_token', 'response_type_id_token']);
    return values.some(value => value) || 'At least one response type is required';
  };

  useImperativeHandle<unknown, FormRef>(ref, () => ({
    prefill: (data: FormValues) => {
        prefillFormData<FormValues>(setValue, data);
    },
  }));



  //TODO: handleSubmit need handling for errors, but it is working fine for now
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} /> {/* Enable DevTools */}
        <TextInput id="authEndpoint" label="Authorization Endpoint" type="url"  registerOptions={{required: "This field is required"}} />
        <TextInput id="clientId" label="Client ID" type="text"  registerOptions={{required: "This field is required"}} />
        <TextInput id="redirectUri" label="Redirect URI" type="url"  registerOptions={{required: "This field is required"}} />
        <TextInput id="tokenEndpoint" label="Token Endpoint" type="url"/>
        <TextInput id="scope" label="Scope" type="text"  registerOptions={{required: "This field is required"}} />
        <CheckboxField name="responseType" label="Response Type" items={responseTypeOptions} />
        <SelectInput id="responseMode" label="Response Mode" options={responseModeOptions} />
        <TextInput id="state" label="State" type="text"/>
        <TextInput id="nonce" label="Nonce" type="text"/>
        <TextInput id="prompt" label="Prompt" type="text"/>
        <AdditionalParameters name="additionalParams" />
        <ConstructedUrlDisplay url={constructedUrl} />
        <Button type="submit">Redirect</Button>
      </form>
    </FormProvider>
  );
});

ConstructRequestForm.displayName = 'ConstructRequestForm'; 

export default ConstructRequestForm;