import { Box, Flex, Link, Text, Separator, HStack } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box py={2} px={5} bg="bg.muted">
      <Flex alignItems="center" justifyContent="space-between">
        <HStack gap="1em">
          <Text fontSize="xl" fontWeight="bold" >
            OIDC Test Tool
          </Text>
          <Separator orientation="vertical" height="1.2em" size="md" />
          <HStack gap="2em">
            <Link fontSize="medium" href="/">
              Initiate flow
            </Link>
            <Link fontSize="medium" href="/redirect">
              Inspect redirect
            </Link>
          </HStack>
        </HStack>
        <Link href="https://www.linkedin.com/in/vrchlabsky" fontSize="sm">
          By Jakub Vrchlabský
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;