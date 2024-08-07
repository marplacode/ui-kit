import type { Meta, StoryObj } from "@storybook/react";
import { LoaderBox } from "./LoaderBox";
import { Image } from "@components/media";
import ExampleImage from "../../../../stories/assets/example.png";

const Scene = ({ show }: any) => {
  return (
    <LoaderBox show={show}>
      <Image
        src={ExampleImage}
        direction="right"
        width={"300px"}
        height={"300px"}
        // effect="breathing"
        show={show}
        delay={0.5}
      />
    </LoaderBox>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Foundations/LoaderBox",
  component: Scene,
  parameters: {
    backgrounds: {
      default: "dark",
    },
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variation: { options: ["sliding", "colorchange"] },
    direction: { options: ["left", "top", "intercalated"] },
    // appear:  true,
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a: any) => console.log(a) },
} satisfies Meta<typeof Line>;

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Imasge: any = {
  args: {
    show: true,
  },
};
