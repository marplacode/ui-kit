import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    // "@storybook/addon-onboarding",
    // "@storybook/addon-links",
    // "@storybook/addon-essentials",
    // "@chromatic-com/storybook",
    // "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-themes",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
    disableProjectJson: true,
  },
  typescript: {
    reactDocgen: false,
  },
  docs: {}
};
export default config;
