import React from "react";
import { Box, chakra, Code, Heading } from "@chakra-ui/react";

interface CodeViewerProps {
  children: React.ReactNode;
  headingText: string;
}

const Pre = chakra("pre", {
  base: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const CodeViewer: React.FC<CodeViewerProps> = ({ children, headingText }) => {
  return (
    <Box w="100%">
      <Heading size="xl">{headingText}</Heading>
      <Code size="md" w="100%" py="2">
        <Pre overflow="hidden" textOverflow="ellipsis">
          {children}
        </Pre>
      </Code>
    </Box>
  );
};

export default CodeViewer;
