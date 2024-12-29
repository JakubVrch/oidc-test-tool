import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormControl from '../FormControl/FormControl';

interface SelectInputProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, options, defaultValue = '' }) => {
  const { register } = useFormContext();

  return (
    <FormControl id={id} label={label}>
      <select id={id} {...register(id)} defaultValue={defaultValue}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormControl>
  );
};

export default SelectInput;