import React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import FormControl from "../FormControl/FormControl";
import { Input as ChakraInput } from "@chakra-ui/react";

interface TextInputProps
  extends Omit<React.ComponentProps<typeof ChakraInput>, "name" | "defaultValue" | "type" | "id"> {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  registerOptions?: RegisterOptions;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  defaultValue = "",
  registerOptions = {},
  ...rest
}) => {
  const { register } = useFormContext();

  return (
    <FormControl id={id} label={label}>
      <ChakraInput
        {...register(id, { ...registerOptions })}
        type={type}
        defaultValue={defaultValue}
        {...rest}
      />
    </FormControl>
  );
};

export default TextInput;
