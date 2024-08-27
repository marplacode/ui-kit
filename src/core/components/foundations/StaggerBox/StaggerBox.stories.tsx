import { Text } from "@chakra-ui/react";
import type {  StoryObj } from "@storybook/react";
import { StaggerBox } from "./StaggerBox";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Example usage
const randomColor = getRandomColor();

const Scene = (props: any) => {
  return (
      <StaggerBox show={props.show} {...props}>
        {..."HI!".split("").map((x, index) => (
          <Text
            fontSize={"14rem"}
            fontWeight="600"
            padding={0}
            margin={0}
            width={200}
            textAlign="center"
            bg={getRandomColor()}
            mb={index * 10}
          >
            {x}
          </Text>
        ))}
      </StaggerBox>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Foundations/StaggerBox",
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

export const Stack: any = {
  args: {
    show: true,
    stackDirection: "stack",
    timingGap: 20,
  },
};
