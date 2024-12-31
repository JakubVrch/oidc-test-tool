import React from "react"
import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  const {children} = props

  return (
    <ChakraButton {...props}>{children}</ChakraButton>
  );
};

export default Button