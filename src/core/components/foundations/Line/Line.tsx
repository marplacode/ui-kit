import { MotionBox, Box } from "@components";
import { FC } from "react";
import { MotionBoxProps } from "@types/HiddenBox";

export const Line: FC<MotionBoxProps> = ({
  show,
  direction = "left",
  delay,
  ...props
}) => {
  return (
    <MotionBox direction={direction} show={show} delay={delay} >
      <Box
        h={direction == "left" || direction == "right" ? "2px" : "100%"}
        w={direction == "bottom" || direction == "top" ? "2px" : "100%"}
        bg="white"
        {...props}
      />
    </MotionBox>
  );
};

export const VLine = ({ ...props }) => {
  return <Line direction="bottom" {...props} />;
};
export const HLine = ({ ...props }) => {
  return <Line direction="left" {...props} />;
};
