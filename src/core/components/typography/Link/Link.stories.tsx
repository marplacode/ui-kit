import { Box, VStack } from "@chakra-ui/react";
import type { StoryObj } from "@storybook/react";
import React from "react";
import { Link } from "./Link";

const Scene = (props: any) => {
  return (
    <VStack>
    {/* <Box h="100%"/> */}
    <VStack w="400px">
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    </VStack>
    <VStack w="400px">
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    </VStack>
    <VStack w="400px">
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    </VStack>
      <Link {...props}>{props.text}</Link>
      <VStack w="400px">
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae labore dolorem sed, numquam quis optio, eum ipsam ad sunt sequi hic illum illo vitae soluta corrupti alias amet delectus voluptas.</p>
    </VStack>
      {/* <Box h="100%"/> */}
    </VStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Typography/Link",
  component: Scene,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    // variation: { options: ['sliding','colorchange'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a: any) => console.log(a) },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: any = {
  args: {
    // text:'asdsa',
    // isLoading: true,
    // color:'black'
    fontWeight: "600",
    // delay:0.1,
    // duration:0.5,
    // easing:"easeIn",
    // color:"teal.500",
    // letters: letterAnimations,
    fontSize: "4rem",
    direction: "bottom",
    // show: true,
    // timingGap: 20,
    showInView: true,
    text: "MARPLACODE;",
  },
};
