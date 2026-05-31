import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/molecules/TextInput/TextInput";
import CheckboxInput from "@/molecules/CheckboxInput/CheckboxInput";
import Button from "@/atoms/Button/Button";
import { Stack } from "@chakra-ui/react";

export interface ExchangeCodeFormData {
  useClientSecret: boolean;
  clientSecret?: string;
  useCodeVerifier: boolean;
  codeVerifier?: string;
}

interface ExchangeCodeFormProps {
  onSubmit: SubmitHandler<ExchangeCodeFormData>;
  codeVerifier?: string | null;
}

const ExchangeCodeForm: React.FC<ExchangeCodeFormProps> = ({
  onSubmit,
  codeVerifier,
}) => {
  const methods = useForm<ExchangeCodeFormData>({
    defaultValues: {
      useClientSecret: !codeVerifier,
      clientSecret: "",
      useCodeVerifier: !!codeVerifier,
      codeVerifier: codeVerifier ?? "",
    },
  });

  const { handleSubmit, watch, setError, clearErrors, trigger } = methods;
  const useClientSecretChecked = watch("useClientSecret");
  const useCodeVerifierChecked = watch("useCodeVerifier");

  useEffect(() => {
    if (codeVerifier != null) {
      if (!useClientSecretChecked && !useCodeVerifierChecked) {
        setError("useClientSecret", {
          message: "Select at least one authentication method",
        });
      } else {
        clearErrors("useClientSecret");
      }
    }
    void trigger("clientSecret");
  }, [useClientSecretChecked, useCodeVerifierChecked, codeVerifier, setError, clearErrors, trigger]);

  useEffect(() => {
    void trigger("codeVerifier");
  }, [useCodeVerifierChecked, trigger]);

  const onFormSubmit = (
    data: ExchangeCodeFormData,
    event?: React.BaseSyntheticEvent,
  ) => {
    if (codeVerifier != null && !data.useClientSecret && !data.useCodeVerifier) {
      return;
    }
    onSubmit(data, event);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack gap="2" maxW="30em">
          <CheckboxInput id="useClientSecret" label="Use Client Secret" />
          <TextInput
            id="clientSecret"
            label="Client Secret:"
            type="password"
            registerOptions={{
              required: useClientSecretChecked ? "Client Secret is required" : false,
            }}
          />
          {codeVerifier != null && (
            <>
              <CheckboxInput id="useCodeVerifier" label="Use Code Verifier" />
              <TextInput
                id="codeVerifier"
                label="Code Verifier:"
                type="text"
                defaultValue={codeVerifier}
                registerOptions={{
                  required: useCodeVerifierChecked ? "Code Verifier is required" : false,
                }}
              />
            </>
          )}
          <Button type="submit">Exchange Code</Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default ExchangeCodeForm;

