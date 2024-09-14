import type { StoryObj } from "@storybook/react";
import { LoaderBox } from "./LoaderBox";
import { Image } from "@components/media";
import ExampleImage from "../../../../stories/assets/example.png";
import React from "react";
import { Box, HStack } from "@chakra-ui/react";

const Scene = ({ show , two, imageProps, ...rest}: any) => {
  return (
    <HStack w="100vw" justifyContent="center" bg="black">
      <HStack px="20" w="50%"> 
        <LoaderBox show={show} w="100%" {...rest}>
          <Image
            src={ExampleImage}
            direction="right"
            // width={"300px"}
            height={"300px"}
            // effect="breathing"
            show={show}
            delay={0.8}
            {...imageProps}
          />
        </LoaderBox>
{two && <LoaderBox show={show} w="100%" {...rest}>
          <Image
            src={ExampleImage}
            direction="right"
            // width={"300px"}
            height={"300px"}
            // effect="breathing"
            show={show}
            delay={0.8}
            {...imageProps}
          />
        </LoaderBox>}
        
      </HStack>
    </HStack>
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
};

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithImage: any = {
  args: {
    show: true,
  },
};

export const Two: any = {
  args: {
    show: true,
    two: true,
    imageProps: {
      delay: 6
    },
    delay: 2
  },
};
