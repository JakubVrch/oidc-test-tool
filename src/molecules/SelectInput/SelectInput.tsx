import React from "react";
import { Controller } from "react-hook-form";
import FormControl, { FormControlProps } from "../FormControl/FormControl";
import { ListCollection } from "@chakra-ui/react";
import Select from "@/atoms/Select/Select";

interface SelectInputProps extends Omit<FormControlProps, "children"> {
  options: ListCollection;
  rules?: Parameters<typeof Controller>[0]["rules"];
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  options,
  helperText,
  rules,
}) => {
  return (
    <FormControl id={id} label={label} helperText={helperText}>
      <Controller
        name={id}
        rules={rules}
        render={({ field }) => <Select collection={options} field={field} />}
      />
    </FormControl>
  );
};

export default SelectInput;
