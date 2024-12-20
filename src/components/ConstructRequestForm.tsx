import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
}

interface ConstructRequestFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

// TODO: Handle autofill better, it probably has something to do with (un)controlled components, so it will be better to handle it when I implement some UI component library
const ConstructRequestForm: React.FC<ConstructRequestFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FormValues>();

  useEffect(() => {
    // Register autofilled values for text inputs and selects
    const inputs = document.querySelectorAll('input[type="text"], input[type="url"], select');
    inputs.forEach(input => {
      const element = input as HTMLInputElement | HTMLSelectElement;
      if (element.value) {
        setValue(element.name as keyof FormValues, element.value);
      }
    });

    // Handle checkboxes separately
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      const element = checkbox as HTMLInputElement;
      setValue(element.name as keyof FormValues, element.checked);
    });
  }, [setValue]);

  //TODO: handleSubmit need handling for errors, but it is working fine for now
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="auth_endpoint">Authorization Endpoint</label>
        <input id="auth_endpoint" type="url" {...register('auth_endpoint', { required: true })} />
        {errors.auth_endpoint && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="client_id">Client ID</label>
        <input id="client_id" type="text" {...register('client_id', { required: true })} />
        {errors.client_id && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="redirect_uri">Redirect URI</label>
        <input id="redirect_uri" type="url" {...register('redirect_uri', { required: true })} />
        {errors.redirect_uri && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="token_endpoint">Token Endpoint</label>
        <input id="token_endpoint" type="url" {...register('token_endpoint', { required: true })} />
        {errors.token_endpoint && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="scope">Scope</label>
        <input id="scope" type="text" {...register('scope', { required: true })} />
        {errors.scope && <span>This field is required</span>}
      </div>
      <div>
        <label>Response Type</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="code"
              {...register('response_type_code')}
              defaultChecked={getValues('response_type_code')}
            />
            code
          </label>
          <label>
            <input
              type="checkbox"
              value="token"
              {...register('response_type_token')}
              defaultChecked={getValues('response_type_token')}
            />
            token
          </label>
          <label>
            <input
              type="checkbox"
              value="id_token"
              {...register('response_type_id_token')}
              defaultChecked={getValues('response_type_id_token')}
            />
            id_token
          </label>
        </div>
        {errors.response_type_code && <span>This field is required</span>}
        {errors.response_type_token && <span>This field is required</span>}
        {errors.response_type_id_token && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="response_mode">Response Mode</label>
        <select id="response_mode" {...register('response_mode')} defaultValue="">
          <option value="">None</option>
          <option value="query">query</option>
          <option value="fragment">fragment</option>
          <option value="form_post">form_post</option>
        </select>
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input id="state" type="text" {...register('state')} defaultValue="" />
      </div>
      <div>
        <label htmlFor="nonce">Nonce</label>
        <input id="nonce" type="text" {...register('nonce')} defaultValue="" />
      </div>
      <div>
        <label htmlFor="prompt">Prompt</label>
        <input id="prompt" type="text" {...register('prompt')} defaultValue="" />
      </div>
      <button type="submit">Redirect</button>
    </form>
  );
};

export default ConstructRequestForm;