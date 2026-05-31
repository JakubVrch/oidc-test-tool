import React from "react";
import { Text, Heading } from "@chakra-ui/react";
import { ResponseMode, ResponseType } from "@/services/types/oidcResponseTypeAndMode";

interface ResponseSummaryProps {
  mode: ResponseMode | null;
  responseType: ResponseType | null;
}

const ResponseSummary: React.FC<ResponseSummaryProps> = ({
  mode,
  responseType,
}) => {
  return (
    <>
      {mode && responseType ? (
        <div>
          <Heading fontSize="2xl" color="border.success">
            Success
          </Heading>
          <Text fontSize="sm">Mode: {mode?.valueOf() ?? "N/A"}</Text>
          <Text fontSize="sm">
            Response Type: {responseType?.valueOf() ?? "N/A"}
          </Text>
        </div>
      ) : (
        <Text fontSize="2xl" color="border.error">
          Response is invalid
        </Text>
      )}
    </>
  );
};

export default ResponseSummary;
