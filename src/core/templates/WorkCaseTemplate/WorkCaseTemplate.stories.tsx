import { Box, HStack, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {  WorkCaseTemplateDefault } from ".";

const Scene = (props: any) => {
  return (
    <WorkCaseTemplateDefault {...props}/>
//     props.playground ? 
// <WorkCaseTemplate {...props}/> :
// <WorkCaseTemplateDefault {...props}/>
    
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Templates/WorkCaseTemplate",
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
}

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

export const Default: any = {
  args: {
    show: true,
    text: "MARPLACODE;"
  },
};

export const Playground: any = {
  args: {
    playground:true,
    show: true,
    text: "MARPLACODE;"
  },
};
