import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "gray",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "IBM Plex Mono, monospace" },
        body: { value: "IBM Plex Mono, monospace" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
