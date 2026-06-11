import { ResponseTypeValue } from "@/services/types/responseTypeAndValue";
import { useEffect } from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ConstructRequestFormValues } from "@/services/types/constructRequestForm";

export const usePKCEValidation = (
  watch: UseFormWatch<ConstructRequestFormValues>,
  setValue: UseFormSetValue<ConstructRequestFormValues>,
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
