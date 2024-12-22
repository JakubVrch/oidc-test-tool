import React from 'react';
import { FormProvider, SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import ConstructedUrlDisplay from '../../atoms/ConstructedUrlDisplay/ConstructedUrlDisplay';
import CheckboxInput from '../../molecules/CheckboxInput/CheckboxInput';
import SelectInput from '../../molecules/SelectInput/SelectInput';
import TextInput from '../../molecules/TextInput/TextInput';
import useAutofill from './useAutofill';
import useConstructedUrl from './useConstructedUrl';

export interface FormValues {
  auth_endpoint: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  response_type_code: boolean;
  response_type_token: boolean;
  response_type_id_token: boolean;
  response_mode?: 'query' | 'fragment' | 'form_post';
  state?: string;
  nonce?: string;
  prompt?: string;
  token_endpoint: string;
  additional_params: { name: string; value: string }[];
}

interface ConstructRequestFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const ConstructRequestForm: React.FC<ConstructRequestFormProps> = ({ onSubmit }) => {

  const methods= useForm<FormValues>();
  const { handleSubmit, formState: { errors }, setValue, getValues, watch, register, control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additional_params',
  });

  useAutofill(setValue);
  const constructedUrl = useConstructedUrl(watch);

  // TODO: Checkbox array should be refactored after we implement UI library together with the CheckboxInput component and validation
  const validateResponseType = () => {
    const values = getValues(['response_type_code', 'response_type_token', 'response_type_id_token']);
    return values.some(value => value);
  };

  //TODO: Add another params field that gets added to the constructed URL
  //TODO: handleSubmit need handling for errors, but it is working fine for now
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput id="auth_endpoint" label="Authorization Endpoint" type="url" required/>
        <TextInput id="client_id" label="Client ID" type="text" required/>
        <TextInput id="redirect_uri" label="Redirect URI" type="url" required/>
        <TextInput id="token_endpoint" label="Token Endpoint" type="url"/>
        <TextInput id="scope" label="Scope" type="text" required/>
        <div>
          <label>Response Type</label>
          <div>
            <CheckboxInput name="response_type_code" label="code" validate={validateResponseType} />
            <CheckboxInput name="response_type_token" label="token" validate={validateResponseType} />
            <CheckboxInput name="response_type_id_token" label="id_token" validate={validateResponseType} />
            {errors.response_type_code && <span>At least one response type is required</span>}
          </div>
        </div>
        <SelectInput id="response_mode" label="Response Mode" options={[
          { value: '', label: 'None' },
          { value: 'query', label: 'query' },
          { value: 'fragment', label: 'fragment' },
          { value: 'form_post', label: 'form_post' },
        ]} />
        <TextInput id="state" label="State" type="text"/>
        <TextInput id="nonce" label="Nonce" type="text"/>
        <TextInput id="prompt" label="Prompt" type="text"/>
        <div>
        <h3>Additional Parameters</h3>
        {fields.map((field, index) => (
          <div key={field.id}>
            <label htmlFor={`additional_params.${index}.name`}>Name</label>
            <input
              id={`additional_params.${index}.name`}
              {...register(`additional_params.${index}.name` as const, { required: true })}
            />
            <label htmlFor={`additional_params.${index}.value`}>Value</label>
            <input
              id={`additional_params.${index}.value`}
              {...register(`additional_params.${index}.value` as const, { required: true })}
            />
            <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: '', value: '' })}>Add Parameter</button>
      </div>
        <ConstructedUrlDisplay url={constructedUrl} />
        <button type="submit">Redirect</button>
      </form>
    </FormProvider>
  );
};

export default ConstructRequestForm;