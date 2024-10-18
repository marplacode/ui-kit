
import React, { useState } from "react";
import { HDStack } from "../../layout/HDStack";
import { Box, VStack } from "@chakra-ui/react";
import {Switch} from './Switch'
import { useToggle} from '../../../hooks'

const Scene = (props: any) => {
  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const handleImageChange = (index: number) => {
  //   setSelectedIndex(index);
  // };

const {value ,toggle }  = useToggle()

  return (
    <VStack w="100%">
      <Switch 
      size={50}
      value={value}
      onChange={() => toggle()}

      />

    </VStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Inputs/Switch",
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
    
    show:true,
  
  },
};
