// @ts-expect-error - no types for this package
import "@fontsource/ibm-plex-mono";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { Provider } from "@/atoms/ui/ChakraProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
);
