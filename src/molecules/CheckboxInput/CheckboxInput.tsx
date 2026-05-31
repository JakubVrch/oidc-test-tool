import React from "react";
import { Controller } from "react-hook-form";
import FormControl from "@/molecules/FormControl/FormControl";
import Checkbox from "@/atoms/Checkbox/Checkbox";

interface CheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
}

const CheckboxInput: React.FC<CheckboxProps> = ({ id, label, disabled }) => {
  return (
    <FormControl id={id}>
      <Controller
        name={id}
        render={({ field }) => (
          <Checkbox
            checked={Boolean(field.value)}
            onCheckedChange={({ checked }) => field.onChange(checked)}
            disabled={disabled}
          >
            {label}
          </Checkbox>
        )}
      />
    </FormControl>
  );
};

export default CheckboxInput;
