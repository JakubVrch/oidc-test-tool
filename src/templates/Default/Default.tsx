import React from "react"
import { Flex, Heading, VStack } from '@chakra-ui/react';

import Navbar from "@/atoms/NavBar/NavBar";

interface DefaultTemplateProps {
  title: string
  children: React.ReactNode;
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({title, children}) => {

  return (
    <Flex direction="column" minHeight="100vh" mb="2ex">
      <Navbar />
      <VStack gap="4rem" mx="2em" mt="5px" direction="column" minHeight="100vh" alignItems="flex-start">
        <Heading as="h2">{title}</Heading>
        {children}
      </VStack>
    </Flex>
  );
};

export default DefaultTemplate