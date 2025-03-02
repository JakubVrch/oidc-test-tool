import React from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '../FormControl/FormControl';
import { ListCollection } from '@chakra-ui/react';
import Select from '@/atoms/Select/Select';

interface SelectInputProps {
  id: string;
  label: string;
  options: ListCollection;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, options }) => {

  return (
    <FormControl id={id} label={label}>
      <Controller
        name={id}
        render={({ field }) => (
          <Select
            collection={options}
            field = {field}
          />
        )}
      />
    </FormControl>
  );
};

export default SelectInput;