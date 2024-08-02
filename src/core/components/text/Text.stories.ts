import type {  StoryObj } from '@storybook/react';

import { Text } from './Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta:any = {
  title: 'Core/Components/Text',
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    variation: { options: ['sliding','colorchange'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a:any) => console.log(a) },
}

export default meta;
type Story = StoryObj<typeof meta>;

const letterAnimations = {
  'M': {  y: -20, opacity: 1, rotateX: -10 },
  // 'A': { y: 20, opacity: 0, rotateX: 45 },
  // 'R': { y: -30, opacity: 0.5, rotateX: 0 },
  // 'P': { y: 10, opacity: 0.5, rotateX: -30 },

};


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: any = {
  args: {
    // text:'asdsa',
    // isLoading: true,
    // color:'black'
    text:"MARPLACODE",
    fontWeight:"bold",
    delay:0.1,
    duration:0.5,
    easing:"easeIn",
    color:"teal.500",
    letters: letterAnimations,
    fontSize:"80px",
    show: true
  },
};

