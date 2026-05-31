import React, { useRef } from "react";
import ConstructRequestForm, { FormRef } from "@/organisms/ConstructRequestForm/ConstructRequestForm";
import { ConstructRequestFormValues } from "@/services/types/constructRequestForm";
import { redirectToOidcProvider } from "@/services/redirectHandler/redirectHandler";
import Prefill from "@/organisms/PrefillComponent/PrefillComponent";
import { prefillConfig } from "@/config/exampleConfig";
import DefaultTemplate from "@/templates/Default/Default";
import { Stack, StackSeparator } from "@chakra-ui/react";

const ConstructRequestPage: React.FC = () => {
  const onSubmit = (data: ConstructRequestFormValues) => {
    redirectToOidcProvider(data);
  };

  const formRef = useRef<FormRef>(null);

  const handlePrefill = (data: ConstructRequestFormValues) => {
    if (formRef.current?.prefill) {
      formRef.current.prefill(data);
    }
  };

  return (
    <DefaultTemplate title="Initiate flow">
      <Stack
        align="flex-start"
        gap="8"
        separator={<StackSeparator />}
        w="100%"
        maxW="2xl"
      >
        <Prefill onPrefill={handlePrefill} prefillConfig={prefillConfig} />
        <ConstructRequestForm onSubmit={onSubmit} ref={formRef} />
      </Stack>
    </DefaultTemplate>
  );
};

export default ConstructRequestPage;
