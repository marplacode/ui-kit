import { Box, HStack, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Video } from "./Video";
import { LoaderBox } from "../../foundations/LoaderBox";
import ExampleVideo from "@stories/assets/liquidd.mp4";

const Scene = (props: any) => {
  return (
    <HStack>
      {/* <h1>MARPLACODE;</h1>   */}
      {/* <div style={{height: '20px', width: '20px', backgroundColor: 'red'}}/> */}
      <HStack w="800px">
        {props.loaderBox ? (
          <LoaderBox w="100%" show={props.show}>
            <Video
              src={ExampleVideo}
              height="100%"
              width="100%"
              config={{ gradient: { color2: "#000" } }}
              startTime={2}
              endTime={6}
              delay={1.6}
              {...props}
            />
          </LoaderBox>
        ) : (
          <Video
            src={ExampleVideo}
            height="100%"
            width="100%"
            config={{ gradient: { color2: "#000" } }}
            startTime={2}
            endTime={6}
            {...props}
          />
        )}
      </HStack>
    </HStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Media/Video",
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

export const Appearing: any = {
  args: {
    show: true,
    direction: "bottom",
  },
};

export const Effects: any = {
  args: {
    show: true,
    direction: "left",
    effect: ["blur", "linear-gradient"],
  },
};

export const WithLoaderBox: any = {
  args: {
    loaderBox: true,
    show: true,
    direction: "left",
    effect: ["blur", "linear-gradient"],
  },
};

export const StartEndTime: any = {
  args: {
    loaderBox: true,
    show: true,
    startTime: 4,
    endTime: 8
  },
};
