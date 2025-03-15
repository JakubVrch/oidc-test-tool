import React from "react"
import { Flex, Heading, VStack } from '@chakra-ui/react';

import Navbar from "@/atoms/NavBar/NavBar";
import Footer from "@/atoms/Footer/Footer";

interface DefaultTemplateProps {
  title: string
  children: React.ReactNode;
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({title, children}) => {
  
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <VStack gap="8" mx="8" mt="1" direction="column" alignItems="flex-start" mb="8">
        <Heading as="h2">{title}</Heading>
        {children}
      </VStack>
      <Footer />
    </Flex>
  );
};

export default DefaultTemplate