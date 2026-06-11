import React from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { get } from "lodash";
import { Fieldset } from "@chakra-ui/react/fieldset";
import { CheckboxGroup } from "@chakra-ui/react";
import Checkbox from "@/atoms/Checkbox/Checkbox";

interface CheckboxInputProps {
  name: string;
  label: string;
  registerOptions?: RegisterOptions;
  items: { value: string; label: string }[];
}

const CheckboxField: React.FC<CheckboxInputProps> = ({
  name,
  label,
  registerOptions,
  items,
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);
  const invalid = !!error;

  const group = useController({
    name: name,
    defaultValue: [],
    rules: registerOptions,
  });

  return (
    <Fieldset.Root invalid={invalid}>
      <Fieldset.Legend>{label}</Fieldset.Legend>
      <CheckboxGroup
        invalid={invalid}
        value={Array.isArray(group.field.value) ? group.field.value : []}
        onValueChange={(value) => group.field.onChange(value)}
        name={group.field.name}
      >
        <Fieldset.Content>
          {items.map((item) => (
            <Checkbox key={item.value} value={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </Fieldset.Content>
      </CheckboxGroup>

      {error && (
        <Fieldset.ErrorText>
          {typeof error.message === "string"
            ? error.message
            : JSON.stringify(error?.message)}
        </Fieldset.ErrorText>
      )}
    </Fieldset.Root>
  );
};

export default CheckboxField;
