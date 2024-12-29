import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import FormControl from '../FormControl/FormControl';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  registerOptions?: RegisterOptions;
}

const TextInput: React.FC<TextInputProps> = ({ id, label, type = 'text', defaultValue = '', registerOptions = {} }) => {
  const { register} = useFormContext();

  return (
    <FormControl id={id} label={label}>
      <input id={id} type={type} {...register(id, { ...registerOptions })} defaultValue={defaultValue} />
    </FormControl>
  );
};

export default TextInput;