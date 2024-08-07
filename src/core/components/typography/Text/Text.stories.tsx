import type { StoryObj } from "@storybook/react";
import { CUBIC_MOTION_FUNCTION_2, CUBIC_MOTION_FUNCTION_3, EASING_VALUES_1 } from "@components/foundations/MotionBox";
import { Text } from "./Text";

const Scene = (props: any) => {

  return (
    <>
      <Text {...props} fontSize={"8rem"} fontWeight="600" direction="bottom">
        {props.text}
      </Text>
      <Text show={props.show} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="right" easingValues={CUBIC_MOTION_FUNCTION_2}>
        {props.text}
      </Text>
      <Text show={props.show} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={CUBIC_MOTION_FUNCTION_3}>
        {props.text}
      </Text>
      {/* <Box width="400px" h="100vh" bg="red">
      </Box> */}
      <Text show={props.show} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        {props.text}
      </Text>
      <Text animationDisabled timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        {props.text}
      </Text>
      <Text show={false} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        {props.text}
      </Text>
      <Text show={false} timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1}>
        {props.text}
      </Text>
      <Text showInView timingGap={props.timingGap} fontSize={"8rem"} fontWeight="600" direction="left" easingValues={EASING_VALUES_1} letterSpacing={'-0.8rem'} >
        {props.text}
      </Text>

    </>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Typography/Text",
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
    timingGap: 20,
    text: "MARPLACODE;"
  },
};

export const Paragraph: any = {
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
    timingGap: 20,
    text: "MARPLACODE;"
  },
};
