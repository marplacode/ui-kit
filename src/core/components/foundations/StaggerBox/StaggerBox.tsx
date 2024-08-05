import { Box, Stack } from "@chakra-ui/react";
import { MotionBox } from "../MotionBox";


export const StaggerBox = ({
  children,
  timingGap = 4,
  stackDirection = "row",
  letterSpacing = "0rem",
  ...rest
}) => {
  if (stackDirection == "stack") {
    return (
      <>
        {children.map((child, index) => (
          <Box position={"absolute"}>
            <MotionBox delay={0.05 + index * (timingGap / 100)} {...rest}>
              {child}
            </MotionBox>
          </Box>
        ))}
      </>
    );
  }

  return (
    <Stack direction={stackDirection as any} letterSpacing={letterSpacing} >
      {children.map((child, index) => (
        <MotionBox delay={0.05 + index * (timingGap / 100)} {...rest}>
          {child}
        </MotionBox>
      ))}
    </Stack>
  );
};
