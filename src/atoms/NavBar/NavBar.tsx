import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink, Text, Separator, HStack } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box py={2} px={5} bg="bg.muted">
      <Flex alignItems="center" justifyContent="space-between">
        <HStack gap="4">
          <Text fontSize="xl" fontWeight="bold" >
            OIDC Test Tool
          </Text>
          <Separator orientation="vertical" height="5" size="md" />
          <HStack gap="8">
            <RouterLink to="/">
              <ChakraLink as="span">
                Initiate flow
              </ChakraLink>
            </RouterLink>
            <RouterLink to="/redirect">
              <ChakraLink as="span">
                Inspect redirect
              </ChakraLink>
            </RouterLink>
          </HStack>
        </HStack>
        <ChakraLink href="https://www.linkedin.com/in/vrchlabsky" >
          By Jakub Vrchlabský
        </ChakraLink>
      </Flex>
    </Box>
  );
};

export default Navbar;