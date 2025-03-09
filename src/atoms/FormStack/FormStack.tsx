import { Stack } from '@chakra-ui/react';
import React from 'react';

interface FormControlProps {
  children: React.ReactNode;
}

const FormStack: React.FC<FormControlProps> = ({ children }) => {

  return (
    <Stack  gap="1.5em" align="flex-start">
      {children}
    </Stack>
  );
};

export default FormStack;