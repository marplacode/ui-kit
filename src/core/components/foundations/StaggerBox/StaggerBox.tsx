import { Box, Stack, VStack } from "@chakra-ui/react";
import { useDebounce } from "@hooks/useDebounce";
import { useEffect, useState } from "react";
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
  show: initialShow,
  textAlign,
  ...props
}:any) => {
  const { delay,...rest } = props
  const [show, setShow] = useState(!initialShow)
  const children = Array.isArray(initialChildren) ? initialChildren : [initialChildren]
  
  if (stackDirection == "stack") {
    return (
      <VStack position='relative'>
        {children.map((child, index) => (
          <Box position={"absolute"}>
            <MotionBox delay={0.05 + index * (timingGap / 100)} show={show} {...rest}>
              {child}
            </MotionBox>
          </Box>
        ))}
      </VStack>
    );
  }

  useDebounce(() => {
    // console.log('debounce ',initalShow)
    setShow(initialShow);
  }, delay * 1000, [initialShow]);
  // console.log('initial showww',initalShow)
  // console.log('showww',show)
  return (
    <Stack direction={stackDirection as any}
     letterSpacing={letterSpacing} 
     spacing={0}
    //  justifyItems={textAlign}
    >
      {children.map((child, index) => (
        <MotionBox delay={0.05 + index * (timingGap / 100)} show={show} {...rest}>
          {child}
        </MotionBox>
      ))}
    </Stack>
  );
};
