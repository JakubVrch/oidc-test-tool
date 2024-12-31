import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import Field from '@/atoms/Field/Field';

interface FormControlProps {
  id: string;
  label: string;
  registerOptions?: RegisterOptions;
  children: React.ReactNode;
}

const FormControl: React.FC<FormControlProps> = ({ id, label, children }) => {
  const { formState: { errors } } = useFormContext();
  const error = get(errors, id);

  return (
      <Field
        label={label}
        invalid={error ? true : false}
        errorText={error && typeof error.message === 'string' ? error.message : JSON.stringify(error?.message)}
      >
        {children}
      </Field>
  );
};

export default FormControl;