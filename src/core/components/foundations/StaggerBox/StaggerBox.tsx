import { Box, Stack, VStack } from "@chakra-ui/react";
import { MotionBox } from "../MotionBox";

/**
 * @description StaggerBox or StaggerMotionBox is used to stack motion boxes together and create a sequence like effect applying different timingGap values
 * thats way delay is omitted
 * @param param0 
 * @returns 
 */
export const StaggerBox = ({
  children: initialChildren,
  timingGap = 4,
  stackDirection = "row",
  letterSpacing = "0rem",
  ...props
}) => {
  const { delay, ...rest } = props
  const children = Array.isArray(initialChildren) ? initialChildren : [initialChildren]
  if (stackDirection == "stack") {
    return (
      <VStack position='relative'>
        {children.map((child, index) => (
          <Box position={"absolute"}>
            <MotionBox delay={0.05 + index * (timingGap / 100)} {...rest}>
              {child}
            </MotionBox>
          </Box>
        ))}
      </VStack>
    );
  }

  return (
    <Stack direction={stackDirection as any}
     letterSpacing={letterSpacing} 
     spacing={0}
    >
      {children.map((child, index) => (
        <MotionBox delay={0.05 + index * (timingGap / 100)} {...rest}>
          {child}
        </MotionBox>
      ))}
    </Stack>
  );
};
