import { forwardRef, useImperativeHandle } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ConstructedUrlDisplay from "../../atoms/ConstructedUrlDisplay/ConstructedUrlDisplay";
import CheckboxField from "../../molecules/CheckboxInput/CheckboxInput";
import CheckboxGroupField from "../../molecules/CheckboxGroupInput/CheckboxGroupInput";
import SelectInput from "../../molecules/SelectInput/SelectInput";
import TextInput from "../../molecules/TextInput/TextInput";
import AdditionalParameters from "../AdditionalParametersFormPart/AdditionalParameters";
import useConstructedUrl from "./useConstructedUrl";
import usePKCEChallenge from "./usePKCEChallenge";
import { prefillFormData } from "../../services/prefillFormData/prefillFormData";
import { createListCollection } from "@chakra-ui/react";
import Button from "@/atoms/Button/Button";
import {
  ResponseModeValue,
  ResponseTypeValue,
} from "@/services/types/responseTypeAndValue";
import { PKCEMethod } from "@/services/types/pkceMethod";
import * as pkce from "@/services/pkce/pkce";
import FormStack from "@/atoms/FormStack/FormStack";
import { DevTool } from "@hookform/devtools";

const responseTypeOptions = Object.values(ResponseTypeValue).map((value) => ({
  value,
  label: value,
}));

const responseModeOptions = createListCollection({
  items: Object.values(ResponseModeValue).map((value) => ({
    value,
    label: value,
  })),
});

const pkceMethodOptions = createListCollection({
  items: Object.values(PKCEMethod).map((value) => ({
    value,
    label: value,
  })),
});

export interface FormValues {
  authEndpoint: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: ResponseTypeValue[];
  responseMode?: ResponseModeValue;
  state?: string;
  nonce?: string;
  prompt?: string;
  tokenEndpoint?: string;
  additionalParams?: { name: string; value: string }[];
  pkceEnabled?: boolean;
  pkceMethod?: PKCEMethod;
  codeVerifier?: string;
  codeChallenge?: string;
}

export interface FormRef {
  prefill: (data: FormValues) => void;
}

interface ConstructRequestFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const ConstructRequestForm = forwardRef<FormRef, ConstructRequestFormProps>(
  ({ onSubmit }, ref) => {
    const methods = useForm<FormValues>({
      defaultValues: async () => {
        const codeVerifier = pkce.generateCodeVerifier();
        const codeChallenge = await pkce.generateCodeChallenge(
          codeVerifier,
          "S256",
        );
        return {
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
          codeVerifier,
          codeChallenge,
        };
      },
    });
    const { handleSubmit, setValue, watch, control } = methods;

    usePKCEChallenge(watch, setValue);
    const pkceEnabled = watch("pkceEnabled");

    const constructedUrl = useConstructedUrl(watch);

    useImperativeHandle<unknown, FormRef>(ref, () => ({
      prefill: (data: FormValues) => {
        prefillFormData<FormValues>(setValue, data);
      },
    }));

    return (
      <FormProvider {...methods}>
        <DevTool control={control} /> {/* set up the dev tool */}
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

            <CheckboxField id="pkceEnabled" label="Enable PKCE" />
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
                  registerOptions={{ disabled: true }}
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
