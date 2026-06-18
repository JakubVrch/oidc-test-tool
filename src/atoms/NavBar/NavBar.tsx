import { Link as RouterLink } from "react-router-dom";
import { Box, Grid, Link as ChakraLink, Text, HStack } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box py={2} px={5} bg="bg.muted" w="full" maxW="full" overflowX="clip">
      <Grid
        templateAreas={{
          base: `
            "brand author"
            "routes routes"
          `,
          md: `"brand routes author"`,
        }}
        templateColumns={{
          base: "initial",
          md: "max-content max-content auto",
        }}
        alignItems="left"
        columnGap="4"
        rowGap="2"
        w="100%"
      >
        <Text
          gridArea="brand"
          fontSize="xl"
          fontWeight="bold"
          textWrap="nowrap"
        >
          OIDC Test Tool
        </Text>

        <HStack
          gridArea="routes"
          gap="8"
          wrap="nowrap"
          minW="0"
          alignSelf="left"
        >
          <RouterLink to="/">
            <ChakraLink as="span">Initiate flow</ChakraLink>
          </RouterLink>
          <RouterLink to="/redirect">
            <ChakraLink as="span">Inspect redirect</ChakraLink>
          </RouterLink>
        </HStack>

        <ChakraLink
          gridArea="author"
          textAlign="right"
          justifySelf="end"
          as="span"
          href="https://www.linkedin.com/in/vrchlabsky"
          fontSize="sm"
        >
          By Jakub Vrchlabský
        </ChakraLink>
      </Grid>
    </Box>
  );
};

export default Navbar;
