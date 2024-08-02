import { Box } from "@chakra-ui/react";
import type { StoryObj } from "@storybook/react";
import { CUBIC_MOTION_FUNCTION_2, CUBIC_MOTION_FUNCTION_3, EASING_VALUES_1 } from "../HiddenBox";
import { Line } from "../Line/Line";
import { ExampleContainer } from "../Storybook";
import { AnimatedText } from "./AnimatedText";

const Scene = (props: any) => {
  return (
    <ExampleContainer>
      <AnimatedText show={props.show} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="bottom">
        MARPLACODE;
      </AnimatedText>
      <AnimatedText show={props.show} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="right" easingValues={CUBIC_MOTION_FUNCTION_2}>
        MARPLACODE;
      </AnimatedText>
      <AnimatedText show={props.show} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={CUBIC_MOTION_FUNCTION_3}>
        MARPLACODE;
      </AnimatedText>
      {/* <Box width="400px" h="100vh" bg="red">
      </Box> */}
      <AnimatedText show={props.show} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        MARPLACODE;
      </AnimatedText>
      <AnimatedText animationDisabled timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        MARPLACODE;
      </AnimatedText>
      <AnimatedText show={false} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        MARPLACODE;
      </AnimatedText>
      <AnimatedText show={false} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        MARPLACODE;
      </AnimatedText>
      <AnimatedText showInView timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        MARPLACODE;
      </AnimatedText>

    </ExampleContainer>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Core/Components/AnimatedText",
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
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: any = {
  args: {
    // text:'asdsa',
    // isLoading: true,
    // color:'black'
    fontWeight: "600",
    // delay:0.1,
    // duration:0.5,
    // easing:"easeIn",
    // color:"teal.500",
    // letters: letterAnimations,
    fontSize: "80px",
    show: true,
    timingGap: 4
  },
};
