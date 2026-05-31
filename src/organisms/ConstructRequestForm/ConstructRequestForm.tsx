import { forwardRef, useImperativeHandle, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ConstructedUrlDisplay from "@/atoms/ConstructedUrlDisplay/ConstructedUrlDisplay";
import CheckboxField from "@/molecules/CheckboxInput/CheckboxInput";
import CheckboxGroupField from "@/molecules/CheckboxGroupInput/CheckboxGroupInput";
import SelectInput from "@/molecules/SelectInput/SelectInput";
import TextInput from "@/molecules/TextInput/TextInput";
import AdditionalParameters from "@/organisms/AdditionalParametersFormPart/AdditionalParameters";
import useConstructedUrl from "./useConstructedUrl";
import usePKCEChallenge from "./usePKCEChallenge";
import { usePKCEValidation } from "./usePKCEValidation";
import { prefillFormData } from "@/services/prefillFormData/prefillFormData";
import Button from "@/atoms/Button/Button";
import {
  ResponseModeValue,
  ResponseTypeValue,
} from "@/services/types/responseTypeAndValue";
import { PKCEMethod } from "@/services/types/pkceMethod";
import { generateCodeVerifier } from "@/services/pkce/pkce";
import FormStack from "@/atoms/FormStack/FormStack";
import { DevTool } from "@hookform/devtools";
import { mapEnumToOptions } from "./mapEnumToOptions";
import { FormValues } from "@/services/types/constructRequestForm";

const responseTypeOptions = Object.values(ResponseTypeValue).map((value) => ({
  value,
  label: value,
}));

const responseModeOptions = mapEnumToOptions(ResponseModeValue);

const pkceMethodOptions = mapEnumToOptions(PKCEMethod);

interface ConstructRequestFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

export interface FormRef {
  prefill: (data: FormValues) => void;
}

const ConstructRequestForm = forwardRef<FormRef, ConstructRequestFormProps>(
  ({ onSubmit }, ref) => {
    const [codeVerifier] = useState(() => generateCodeVerifier());
    const methods = useForm<FormValues>({
      defaultValues: {
        authEndpoint: "",
        clientId: "",
        redirectUri: "",
        scope: "",
        responseType: [],
        responseMode: undefined,
        state: "",
        nonce: "",
        prompt: "",
        tokenEndpoint: "",
        additionalParams: [],
        pkceEnabled: false,
        pkceMethod: undefined,
        codeVerifier: codeVerifier,
        codeChallenge: "",
      },
    });
    const { handleSubmit, setValue, watch, control } = methods;

    usePKCEChallenge(watch, setValue);
    const pkceEnabled = watch("pkceEnabled");
    const { canUsePKCE } = usePKCEValidation(watch, setValue);

    const constructedUrl = useConstructedUrl(watch);

    useImperativeHandle<unknown, FormRef>(ref, () => ({
      prefill: (data: FormValues) => {
        prefillFormData<FormValues>(setValue, data);
      },
    }));

    return (
      <FormProvider {...methods}>
        {process.env.NODE_ENV === "development" && <DevTool control={control} />}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <FormStack>
            <TextInput
              id="authEndpoint"
              label="Authorization Endpoint"
              type="url"
              registerOptions={{ required: "This field is required" }}
            />
            <TextInput
              id="clientId"
              label="Client ID"
              type="text"
              registerOptions={{ required: "This field is required" }}
            />
            <TextInput
              id="redirectUri"
              label="Redirect URI"
              type="url"
              registerOptions={{ required: "This field is required" }}
            />
            <TextInput id="tokenEndpoint" label="Token Endpoint" type="url" />
            <TextInput
              id="scope"
              label="Scope"
              type="text"
              registerOptions={{ required: "This field is required" }}
            />
            <CheckboxGroupField
              name="responseType"
              label="Response Type"
              items={responseTypeOptions}
              registerOptions={{
                validate: (value: string | unknown[]) =>
                  (Array.isArray(value) && value.length > 0) ||
                  "At least one response type is required",
              }}
            />
            <SelectInput
              id="responseMode"
              label="Response Mode"
              helperText="form_post cannot be inspected"
              options={responseModeOptions}
            />
            <TextInput id="state" label="State" type="text" />
            <TextInput id="nonce" label="Nonce" type="text" />
            <TextInput id="prompt" label="Prompt" type="text" />

            <CheckboxField 
              id="pkceEnabled" 
              label="Enable PKCE"
              disabled={!canUsePKCE}
            />
            {pkceEnabled && (
              <>
                <SelectInput
                  id="pkceMethod"
                  label="PKCE Method"
                  options={pkceMethodOptions}
                  rules={{
                    required: "Select a PKCE method",
                  }}
                />
                <TextInput
                  id="codeVerifier"
                  label="Code Verifier"
                  registerOptions={{ required: "This field is required" }}
                />
                <TextInput
                  id="codeChallenge"
                  label="Code Challenge"
                  registerOptions={{}}
                  readOnly={true}
                />
              </>
            )}
            <AdditionalParameters name="additionalParams" />
            <ConstructedUrlDisplay url={constructedUrl} />
            <Button type="submit">Redirect</Button>
          </FormStack>
        </form>
      </FormProvider>
    );
  },
);

ConstructRequestForm.displayName = "ConstructRequestForm";

export default ConstructRequestForm;
