import React, { useState } from "react";
import { HDStack } from "../../layout/HDStack";
import { Box, VStack } from "@chakra-ui/react";
import { Toast } from "./Toast";
import TrucksIcon from "@stories/assets/truck_icon.svg";

const Scene = (props: any) => {
  return (
    <VStack w="100%" color="black">
      <Toast
        label="Upload your design"
        icon={TrucksIcon}
        show={props.show}
        onClick={() => console.log("ASDDAS")}
        {...props}
      />
    </VStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Display/Toast",
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
    title: "Accesories",
    description: "Not for sale",
  },
};
