import { create } from "@storybook/theming"
// @ts-expect-error
import brandImage from "./storybook-logo.svg"

export default create({
  base: "dark",
  brandTitle: "Marplacode UI-KIT",
  brandUrl: "https://marplacode.com",
  brandImage,
})