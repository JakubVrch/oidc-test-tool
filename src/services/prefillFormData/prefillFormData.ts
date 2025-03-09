import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

export const prefillFormData = function <T extends FieldValues>(setValue: UseFormSetValue<T>, data: T): void {
  for (const key of Object.keys(data)) {
    const value = data[key as keyof T];
    setValue(key as Path<T>, value, {
      shouldValidate: true,
      shouldDirty: true
    });
  }
};