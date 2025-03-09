import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Stack, Text } from '@chakra-ui/react';
import TextInput from '../../molecules/TextInput/TextInput';
import Button from '@/atoms/Button/Button';
import FormStack from '@/atoms/FormStack/FormStack';

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
    <FormStack>
      <Text fontSize="sm">Additional Parameters</Text>
      {fields.map((field, index) => (
        <Stack key={field.id} direction="row" alignItems="flex-end">
          <TextInput id={`${name}.${index}.name`} label="Name" type='text' registerOptions={{ required: "Please fill in this field" }} />
          <TextInput id={`${name}.${index}.value`} label="Value" type='text' registerOptions={{ required: "Please fill in this field" }} />
          <Button onClick={() => remove(index)}>Remove</Button>
        </Stack>
      ))}
      <Button onClick={() => append({ name: '', value: '' })}>Add Parameter</Button>
    </FormStack>
  );
};

export default AdditionalParameters;