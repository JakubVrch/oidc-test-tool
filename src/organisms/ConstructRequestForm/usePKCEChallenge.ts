import { useEffect } from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ConstructRequestFormValues } from "@/services/types/constructRequestForm";
import { generateCodeChallenge } from "@/services/pkce/pkce";

const usePKCEChallenge = (
  watch: UseFormWatch<ConstructRequestFormValues>,
  setValue: UseFormSetValue<ConstructRequestFormValues>,
) => {
  const pkceEnabled = watch("pkceEnabled");
  const pkceMethod = watch("pkceMethod");
  const codeVerifier = watch("codeVerifier");

  useEffect(() => {
    if (pkceEnabled && codeVerifier && pkceMethod) {
      void generateCodeChallenge(codeVerifier, pkceMethod).then((challenge) => {
        setValue("codeChallenge", challenge);
      });
    } else {
      setValue("codeChallenge", "");
    }
  }, [pkceEnabled, codeVerifier, pkceMethod, setValue]);
};

export default usePKCEChallenge;
