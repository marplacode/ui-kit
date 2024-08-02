import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BackgroundLoader } from './BackgroundLoader';



const Scene = (props:any) => {

  return <>
    
  <BackgroundLoader {...props}/>
  <h1>MARPLACODE;</h1>
  </>
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Core/Components/BackgroundLoader',
  component: Scene,
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    variation: { options: ['sliding','colorchange'] },
    direction: { options: ['left','top','intercalated'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a:any) => console.log(a) },
} satisfies Meta<typeof BackgroundLoader>;

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SlidingBlackAndGrey: any = {
  args: {
    show: false,
    variation: 'sliding',
    direction: 'left',
  },
};

export const SlidingColors: Story = {
  args: {
    show: false,
    variation: 'sliding',
    direction: 'left',
    primaryColor: 'red',
    secondaryColor: 'brown',
  },
};

export const Scaling: Story = {
  args: {
    show: false,
    variation: 'scaling',
  },
};

export const Fragmented: Story = {
  args: {
    show: false,
    variation: 'fragmented',
    direction: "vertical",
    autoChange: true
  },
};
