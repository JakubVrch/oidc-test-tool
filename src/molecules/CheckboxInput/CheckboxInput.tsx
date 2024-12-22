import React from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxInputProps {
  name: string;
  label: string;
  validate: (value: boolean) => boolean | string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ name, label, validate }) => {
  const { register, getValues, formState: { errors } } = useFormContext();

  return (
    <label>
      <input
        type="checkbox"
        {...register(name, { validate })}
        defaultChecked={getValues(name) as boolean}
      />
      {label}
      {errors[name] && <span>{typeof errors[name].message === 'string' ? errors[name].message : JSON.stringify(errors[name].message)}</span>}
    </label>
  );
};

export default CheckboxInput;