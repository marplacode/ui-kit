import { Box, Stack, VStack } from "@chakra-ui/react";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { useDebounce } from "@hooks/useDebounce";
import { forwardRef, useEffect, useState } from "react";
import { MotionBox } from "../MotionBox";

/**
 * @description StaggerBox or StaggerMotionBox is used to stack motion boxes together and create a sequence like effect applying different timingGap values
 * thats way delay is omitted
 * @param param0
 * @returns
 */
export const StaggerBox = forwardRef<any, any>(
  (
    {
      children: initialChildren,
      timingGap = 4,
      stackDirection = "row",
      // direction = 'row',
      letterSpacing = "0rem",
      show: initialShow,
      textAlign,
      flexWrap,
      spacing = 0,
      ...props
    },
    initialRef
  ) => {
    const { delay = 0, ...rest } = props;
    const [show, setShow] = useState(!initialShow);
    const children = Array.isArray(initialChildren)
      ? initialChildren
      : [initialChildren];
    const { ref, size } = useCalculateNodeSize({
      initialRef,
      formatToPixels: true,
    });

    useDebounce(
      () => {
        setShow(initialShow);
      },
      delay * 1000,
      [initialShow]
    );
    
    if (stackDirection == "stack") {
      return (
        <VStack
          position="relative"
          //  w={size.width} h={size.height}
        >
          {children.map((child, index) => (
            <Box position={"absolute"} ref={ref}>
              <MotionBox
                delay={0.05 + index * (timingGap / 100)}
                show={show}
                {...rest}
              >
                {child}
              </MotionBox>
            </Box>
          ))}
        </VStack>
      );
    }

    return (
      <Stack
        direction={stackDirection as any}
        letterSpacing={letterSpacing}
        spacing={spacing}
        textAlign={textAlign}
        flexWrap={flexWrap}
        ref={ref}
      >
        {children.map((child, index) => (
          <MotionBox
            delay={0.05 + index * (timingGap / 100)}
            show={show}
            {...rest}
          >
            {child}
          </MotionBox>
        ))}
      </Stack>
    );
  }
);
