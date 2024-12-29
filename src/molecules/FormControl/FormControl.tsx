import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { get } from 'lodash';

interface FormControlProps {
  id: string;
  label: string;
  registerOptions?: RegisterOptions;
  children: React.ReactNode;
}

const FormControl: React.FC<FormControlProps> = ({id, label, children }) => {
  const { formState: { errors } } = useFormContext();
  const error = get(errors, id);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span>{typeof error.message === 'string' ? error.message : JSON.stringify(error.message)}</span>}
    </div>
  );
};

export default FormControl;