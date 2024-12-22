import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}

//TODO: This function should be moved to a separate file and eslint errors should be fixed
function getSubObject(obj: any, path: string): any {
  if (!obj || typeof obj !== 'object' || !path || typeof path !== 'string') {
    return undefined;
  }

  return path.split('.').reduce((acc, part) => 
    acc && typeof acc === 'object' && Object.prototype.hasOwnProperty.call(acc, part) ? acc[part] : undefined, obj);
}


const TextInput: React.FC<TextInputProps> = ({ id, label, type = 'text', required = false, defaultValue = '' }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = getSubObject(errors, id);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...register(id, { required })} defaultValue={defaultValue} />
      {error && <span>This field is required</span>}
    </div>
  );
};

export default TextInput;