import React from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectInputProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, options, defaultValue = '' }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...register(id)} defaultValue={defaultValue}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;