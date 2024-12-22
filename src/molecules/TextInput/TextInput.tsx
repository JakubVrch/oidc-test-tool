import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}

const TextInput: React.FC<TextInputProps> = ({ id, label, type = 'text', required = false, defaultValue = '' }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...register(id, { required })} defaultValue={defaultValue} />
      {errors[id] && <span>This field is required</span>}
    </div>
  );
};

export default TextInput;