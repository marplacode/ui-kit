import React, { useState } from "react";
import { HDStack } from "../../layout/HDStack";
import { Box, VStack } from "@chakra-ui/react";
import { InfoReveal } from "./InfoReveal";

const Scene = (props: any) => {
  if (props.direction === "stacked") return <Scene2 />;

  return (
    <VStack w="100%" color="black">
      <Box borderRadius={"30px"} bg="black" opacity={"0.5"}>
        <InfoReveal
          label="Upload your design"
          icon="images/upload_icon.svg"
          show={props.show}
          // onClick={()=> console.log('ASDDAS')}
        >
          <Box bg="red" w="20" h="20" />
        </InfoReveal>
      </Box>
    </VStack>
  );
};

const Scene2 = (props: any) => {
  return (
    <VStack
      w="100%"
      spacing={4}
      color="black"
      borderRadius={"30px"}
      bg="black"
      opacity={"0.5"}
      p="10"
    >
      <InfoReveal
        label="Upload your design"
        icon="images/upload_icon.svg"
        show={props.show}
        // onClick={()=> console.log('ASDDAS')}
      >
        <Box bg="red" w="20" h="120px" />
      </InfoReveal>

      <InfoReveal
        label="Upload your design"
        icon="images/upload_icon.svg"
        show={props.show}
        // onClick={()=> console.log('ASDDAS')}
      >
        <Box bg="green" w="20" h="40px" />
      </InfoReveal>

      <InfoReveal
        label="Upload your design"
        icon="images/upload_icon.svg"
        show={props.show}
        // onClick={()=> console.log('ASDDAS')}
      >
        <VStack>
        <Box bg="blue" w="20" h="200px" />
        <Box bg="yellow" w="20" h="10px" />
        </VStack>
      </InfoReveal>
    </VStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Display/InfoReveal",
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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: any = {
  args: {
    show: true,
    direction: "column",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Stacked: any = {
  args: {
    show: true,
    direction: "stacked",
  },
};
