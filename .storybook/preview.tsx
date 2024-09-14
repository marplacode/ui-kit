import { Box } from "@chakra-ui/react";
import type { Preview } from "@storybook/react";

import React from "react";
import { UiKitProvider } from "../src/core/context";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <Box height="100vh">
        <UiKitProvider 
        config={{ router: { transition: { enabled: false } }}}
        >
          <Story />
        </UiKitProvider>
      </Box>
    ),
  ],

  tags: ["autodocs"],
};

export default preview;
