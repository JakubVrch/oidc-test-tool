import { ResponseTypeValue } from "@/services/types/responseTypeAndValue";
import { useEffect } from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { FormValues } from "./ConstructRequestForm";

export const usePKCEValidation = (
  watch: UseFormWatch<FormValues>,
  setValue: UseFormSetValue<FormValues>,
) => {
  const responseTypes = watch("responseType");
  const pkceEnabled = watch("pkceEnabled");
  const canUsePKCE = responseTypes.includes(ResponseTypeValue.CODE);

  useEffect(() => {
    if (!canUsePKCE && pkceEnabled) {
      setValue("pkceEnabled", false);
    }
  }, [canUsePKCE, pkceEnabled, setValue]);

  return { canUsePKCE };
};