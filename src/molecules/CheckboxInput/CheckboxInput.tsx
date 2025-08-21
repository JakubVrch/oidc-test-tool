import React from "react";
import { Controller } from "react-hook-form";
import FormControl from "../FormControl/FormControl";
import Checkbox from "@/atoms/Checkbox/Checkbox";

interface CheckboxProps {
  id: string;
  label: string;
}

const CheckboxInput: React.FC<CheckboxProps> = ({ id, label }) => {
  return (
    <FormControl id={id}>
      <Controller
        name={id}
        render={({ field }) => (
          <Checkbox
            checked={Boolean(field.value)}
            onCheckedChange={({ checked }) => field.onChange(checked)}
          >
            {label}
          </Checkbox>
        )}
      />
    </FormControl>
  );
};

export default CheckboxInput;
