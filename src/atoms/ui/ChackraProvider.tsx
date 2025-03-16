import { ColorModeProvider } from "@/atoms/ui/color-mode";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { system } from "./theme";

interface ProviderProps {
  children?: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({
  children,
}: ProviderProps) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider forcedTheme="dark">{children}</ColorModeProvider>
    </ChakraProvider>
  );
};
