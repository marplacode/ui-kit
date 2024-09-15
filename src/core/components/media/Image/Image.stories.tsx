import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Image } from ".";
// @ts-ignore
import ExampleImage from '@stories/assets/example.png'

const Scene = (props: any) => {
  console.log('sdas',props)
  return (
    <VStack spacing="0">
      { props.showInView && <Box h="100vh" w="100%" bg="black" /> }
     <Image  src={ExampleImage} {...props}/>
    </VStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Media/Image",
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
} ;

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

export const Default: any = {
  args: {
    show: true,
    direction: "bottom",
    width: 300,
    height: 500,
    // src: '/assets/example.png'
  },
};

export const WithShapeFilter: any = {
  args: {
    show: true,
    direction: "right",
    width: 300,
    height: 300,
    shape: 'circle'
    // src: '/assets/example.png'
  },
};

export const BreathingFilter: any = {
  args: {
    show: true,
    direction: "right",
    width: 300,
    height: 300,
    effect: 'breathing'
  },
};

export const ShowInView: any = {
  args: {
    showInView: true,
    direction: "top",
    width: 300,
    height: 300,
  },
};



