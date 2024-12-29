import React from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxInputProps {
  name: string;
  label: string;
  validate: (value: boolean) => boolean | string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ name, label, validate }) => {
  const { register, getValues } = useFormContext();

  return (
    <label>
      <input
        type="checkbox"
        {...register(name, { validate })}
        defaultChecked={getValues(name) as boolean}
      />
      {label}
    </label>
  );
};

export default CheckboxInput;