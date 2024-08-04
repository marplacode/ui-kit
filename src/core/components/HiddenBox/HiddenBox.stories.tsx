import { Box, HStack, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { HiddenBox } from ".";
import { UiKitProvider } from "../../context";
import { Line } from "../Line/Line";

const Scene = (props: any) => {
  return (
    <HStack>
      {/* <h1>MARPLACODE;</h1>   */}
      {/* <div style={{height: '20px', width: '20px', backgroundColor: 'red'}}/> */}
      <HiddenBox
        show={props.appear}
        delay={0}
        // duration={0.3}

        // height={'300px'}
        // as="span"
        {...props}
      >
        <Text fontSize={"14rem"} fontWeight="600" padding={0} margin={0}>
          M
        </Text>
      </HiddenBox>

      <HiddenBox
        show={props.appear}
        delay={0.05}
        // duration={0.3}
        {...props}
      >
        <Text fontSize={"14rem"} fontWeight="600" padding={0} margin={0}>
          A
        </Text>
      </HiddenBox>

      <HiddenBox
        show={props.appear}
        delay={0.09}
        // duration={0.3}
        {...props}
      >
        <Text fontSize={"14rem"} fontWeight="600" padding={0} margin={0}>
          R
        </Text>
      </HiddenBox>

      <HiddenBox
        show={props.appear}
        delay={0.11}
        // duration={0.3}
        {...props}
      >
        <Text fontSize={"14rem"} fontWeight="600" padding={0} margin={0}>
          P
        </Text>
      </HiddenBox>

      <HiddenBox
        show={props.appear}
        delay={0.13}
        // duration={0.3}
        {...props}
      >
        <Text fontSize={"14rem"} fontWeight="600" padding={0} margin={0}>
          L
        </Text>
      </HiddenBox>

      <HiddenBox
        show={props.appear}
        delay={0.33}
        // duration={0.3}
        {...props}
        direction="right"
      >
        <Text fontSize={"14rem"} fontWeight="600" padding={0} margin={0}>
          A
        </Text>
      </HiddenBox>
    </HStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Core/Components/HiddenBox",
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
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a: any) => console.log(a) },
} satisfies Meta<typeof Line>;

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

export const Appearing: any = {
  args: {
    show: true,
    direction: "bottom",
  },
};
