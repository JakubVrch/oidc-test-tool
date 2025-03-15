import { Box, Flex, Link, Text, Separator, HStack } from '@chakra-ui/react';

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
            <Link href="/">
              Initiate flow
            </Link>
            <Link href="/redirect">
              Inspect redirect
            </Link>
          </HStack>
        </HStack>
        <Link href="https://www.linkedin.com/in/vrchlabsky" >
          By Jakub Vrchlabský
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;