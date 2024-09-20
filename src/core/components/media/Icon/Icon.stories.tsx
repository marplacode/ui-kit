import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { StaggerBox } from "../../foundations/StaggerBox";
import React from "react";

const Scene = (props: any) => {
  console.log("sdas", props);
  return (
    <>
      <StaggerBox direction="left" show={props.show}>
        <Icon
          Icon={FaInstagram}
          size={60}
          color="#222425"
          colorDelay={0.8}
          href="https://www.instagram.com/marplacode"
        />
        <Icon
          Icon={FaGithub}
          size={60}
          color="#222425"
          colorDelay={0.8}
          href="https://www.instagram.com/marplacode"
        />
        <Icon
          Icon={FaLinkedin}
          size={60}
          color="#222425"
          colorDelay={0.8}
          href="https://www.instagram.com/marplacode"
        />
      </StaggerBox>
    </>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Media/Icon",
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
};

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

export const Default: any = {
  args: {
    show: true,
    direction: "left",
    // width: 300,
    // height: 500,
    // src: '/assets/example.png'
  },
};
