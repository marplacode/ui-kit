import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HiddenBox } from '../HiddenBox';
import { Line } from './Line';



const Scene = (props:any) => {

  return <div style={{height:'100vh'}}>
    
  <h1>MARPLACODE;</h1>  
  <Line {...props}/>
  
  </div>
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta:any = {
  title: 'Layout/Line',
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
    variation: { options: ['sliding','colorchange'] },
    direction: { options: ['left','top','intercalated'] },
    // appear:  true,
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a:any) => console.log(a) },
}  satisfies Meta<typeof Line>;

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: any = {
  args: {
    show:true,
    variation: 'vertical',

    
    // direction: 'left',
  },
};

export const Appearing: any = {
  args: {
    show:true,
    variation: 'vertical',

  },
};

