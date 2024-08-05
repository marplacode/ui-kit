import { Text as CText } from "@chakra-ui/react";
import { CUBIC_MOTION_FUNCTION_1 } from "@components/foundations";
import { StaggerBox } from "@components/foundations/StaggerBox";

export const Text = ({
  children = "",
  direction = "top",
  show = true,
  showInView = false,
  timingGap = 0,
  animationDisabled = false,
  easingValues = CUBIC_MOTION_FUNCTION_1,
  letterSpacing = "0rem",
  delay = 0,
  ...props
}) => {
  console.log('CHILDRENN',children)
  if (typeof children !== "string") {
    throw new Error("Children needs to be string");
  }

  return (
    <StaggerBox
      show={show}
      showInView={showInView}
      timingGap={timingGap}
      direction={direction}
      animationDisabled={animationDisabled}
      easingValues={easingValues}
      letterSpacing={letterSpacing}
      delay={delay}
    >
      {`${children}`.split("").map((letter) => (
        <CText padding={0} margin={0} {...props}>
          {letter}
        </CText>
      ))}
    </StaggerBox>
  );
};
