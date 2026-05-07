import React from "react";
import { useFormContext } from "react-hook-form";
import { get } from "lodash";
import Field, { FieldProps } from "./Field";

export interface FormControlProps extends FieldProps {
  id: string;
  children: React.ReactNode;
}

const FormControl: React.FC<FormControlProps> = ({ id, children, ...rest }) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  return (
    <Field
      invalid={error ? true : false}
      errorText={
        error && typeof error.message === "string"
          ? error.message
          : JSON.stringify(error?.message)
      }
      {...rest}
    >
      {children}
    </Field>
  );
};

export default FormControl;
