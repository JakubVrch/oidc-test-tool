import React from "react";
import { useFormContext } from "react-hook-form";
import FormControl from "../FormControl/FormControl";
import Checkbox from "@/atoms/Checkbox/Checkbox";

interface CheckboxProps {
  id: string;
  label: string;
}

const CheckboxInput: React.FC<CheckboxProps> = ({ id, label }) => {
  const { register } = useFormContext();
  return (
    <FormControl id={id}>
      <Checkbox id={id} {...register(id)}>
        {label}
      </Checkbox>
    </FormControl>
  );
};

export default CheckboxInput;
