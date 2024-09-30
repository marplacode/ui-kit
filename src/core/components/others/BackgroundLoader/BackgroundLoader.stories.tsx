import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { BackgroundLoader } from "./BackgroundLoader";
import { useMotionControls } from "../../../hooks/useMotionControls";
import { useRouter } from "../../../hooks/useRouter";

const Scene = (props: any) => {
  const router = useRouter({ transition: { enabled: true } })
  // const router = useRouter()
  const controls = useMotionControls()
  const newProps = props.imperative
    ? { controls, ...props }
    : props;

  // return (
  //   <>
  //     {/* <BackgroundLoader {...newProps} /> */}
  //     {/* <button onClick={() => { 
        
  //       router.push('ads')
  //       // controls.show({essooo: '112312'})
        
  //       }}>SHOW</button>
  //     <button
  //       onClick={() => {
  //         // controls.hide();
  //         router.back()
  //       }}
  //     >
  //       HIDE
  //     </button>
  //     <h1>MARPLACODE;</h1> */}
  //   </>
  // );
  const imperativeControls = useRef(null);
  // const newProps = props.imperative
  //   ? { controlsRef: imperativeControls, ...props }
  //   : props;
  return (
    <>
      <BackgroundLoader {...props} />
      {/* <button onClick={() => imperativeControls.current.show()}>SHOW</button>
      <button
        onClick={() => {
          imperativeControls.current.hide();
          console.log(imperativeControls.current);
        }}
      >
        HIDE
      </button>
      <h1>MARPLACODE;</h1> */}
    </>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Others/BackgroundLoader",
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
    backgroundColor: { control: "color" },
    variation: { options: ["sliding", "colorchange"] },
    direction: { options: ["left", "top", "intercalated"] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a: any) => console.log(a) },
} satisfies Meta<typeof BackgroundLoader>;

export default meta;
// type Story = StoryObj<typeof meta>;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SlidingBlackAndGrey: any = {
  args: {
    show: false,
    variation: "sliding",
    direction: "left",
  },
};

export const SlidingColors: Story = {
  args: {
    show: false,
    variation: "sliding",
    direction: "left",
    primaryColor: "red",
    secondaryColor: "brown",
  },
};

export const Scaling: Story = {
  args: {
    show: false,
    variation: "scaling",
  },
};

export const Fragmented: Story = {
  args: {
    show: false,
    variation: "fragmented",
    direction: "vertical",
    autoChange: true,
  },
};

export const ImperativeAPI: Story = {
  args: {
    imperative: true,
    show: false,
    variation: "sliding",
    direction: "left",
    autoChange: false,
  },
};
