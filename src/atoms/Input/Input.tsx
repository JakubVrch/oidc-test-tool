import React from "react"
import { Input  as ChakraInput } from '@chakra-ui/react';
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  children: React.ReactNode;
  register: UseFormRegisterReturn
}

const Input: React.FC<InputProps> = (props) => {
  const {children, register} = props

  return (
    <ChakraInput {...props } {...register}>{children}</ChakraInput>
  );
};

export default Input