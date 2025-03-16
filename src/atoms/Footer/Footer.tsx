import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" w="100%" py={1} px={8} bg="bg.muted" mt="auto">
      <Text fontSize="2xs">
        Disclaimer: This is a test tool for OIDC configurations. Not intended
        for production use. Use at your own risk.
      </Text>
    </Box>
  );
};

export default Footer;
