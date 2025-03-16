import React from "react";
import { Controller } from "react-hook-form";
import FormControl, { FormControlProps } from "../FormControl/FormControl";
import { ListCollection } from "@chakra-ui/react";
import Select from "@/atoms/Select/Select";

interface SelectInputProps
  extends Omit<FormControlProps, "children" | "registerOptions"> {
  options: ListCollection;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  options,
  helperText,
}) => {
  return (
    <FormControl id={id} label={label} helperText={helperText}>
      <Controller
        name={id}
        render={({ field }) => <Select collection={options} field={field} />}
      />
    </FormControl>
  );
};

export default SelectInput;
