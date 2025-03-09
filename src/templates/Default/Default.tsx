import React from "react"
import { Flex, Heading, VStack } from '@chakra-ui/react';

import Navbar from "@/atoms/NavBar/NavBar";

interface DefaultTemplateProps {
  title: string
  children: React.ReactNode;
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({title, children}) => {

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <VStack gap="2em" ml="4%" mt="5px" direction="column" minHeight="100vh" alignItems="flex-start">
        <Heading as="h2">{title}</Heading>
        {children}
      </VStack>
    </Flex>
  );
};

export default DefaultTemplate