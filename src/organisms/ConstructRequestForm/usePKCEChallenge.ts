import { useEffect } from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { FormValues } from "./ConstructRequestForm";
import * as pkce from "@/services/pkce/pkce";

const usePKCEChallenge = (
  watch: UseFormWatch<FormValues>,
  setValue: UseFormSetValue<FormValues>
) => {
  const pkceEnabled = watch("pkceEnabled");
  const pkceMethod = watch("pkceMethod");
  const codeVerifier = watch("codeVerifier");

  useEffect(() => {
    if (pkceEnabled && codeVerifier && pkceMethod) {
      void pkce.generateCodeChallenge(codeVerifier, pkceMethod).then((challenge) => {
        setValue("codeChallenge", challenge);
      });
    } else {
      setValue("codeChallenge", "");
    }
  }, [pkceEnabled, codeVerifier, pkceMethod, setValue]);
};

export default usePKCEChallenge;
