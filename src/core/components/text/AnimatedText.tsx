
import { BoxProps, Box,Text as CText, chakra } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CUBIC_MOTION_FUNCTION_1, CUBIC_MOTION_FUNCTION_2 } from "../HiddenBox";
import { StaggerBox } from "../StaggerBox";

export const AnimatedText = ({ children = "", direction="top", show = true, showInView = false, timingGap = 0, animationDisabled = false, easingValues = CUBIC_MOTION_FUNCTION_1, ...props }) => {
  if (typeof children !== "string") {
    throw new Error("Children needs to be string");
  }

  return (
    <StaggerBox show={show} showInView={showInView} timingGap={timingGap} direction={direction} animationDisabled={animationDisabled} easingValues={easingValues}>
      {`${children}`.split("").map((letter) => (
        <CText padding={0} margin={0} {...props}>
          {letter}
        </CText>
      ))}
    </StaggerBox>
  );
};
