import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import TextInput from '../../molecules/TextInput/TextInput';
import Button from '@/atoms/Button/Button';

interface AdditionalParametersProps {
  name: string;
}

const AdditionalParameters: React.FC<AdditionalParametersProps> = ({ name }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <h3>Additional Parameters</h3>
      {fields.map((field, index) => (
        <div key={field.id}>
          <TextInput id={`${name}.${index}.name`} label="Name" type='text' registerOptions={{required: "Please fill in this field"}} />
          <TextInput id={`${name}.${index}.value`} label="Value" type='text' registerOptions={{required: "Please fill in this field"}}   />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={() => append({ name: '', value: '' })}>Add Parameter</Button>
    </div>
  );
};

export default AdditionalParameters;