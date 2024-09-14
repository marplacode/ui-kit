import { MotionBox } from "@components/foundations";
import { FC, useState } from "react";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { formatUnit } from "@utils/formatUnit";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { Box } from "@chakra-ui/react";

export const Line: FC<MotionBoxProps & any> = ({
  show,
  direction = "left",
  delay,
  thickness = 1,
  initialValues,
  showInView,
  ...props
}) => {

  return (
    <MotionBox
      direction={direction}
      show={show}
      showInView={showInView}
      delay={delay}
      initialValues={initialValues}
    >
      <Box
        h={
          direction == "left" || direction == "right"
            ? formatUnit(thickness)
            : "100%"
        }
        w={
          direction == "bottom" || direction == "top"
            ? formatUnit(thickness)
            : "100%"
        }
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
  const { ref, size } = useCalculateNodeSize({});

  return (
    <Box ref={ref} w="100%">
      <Box w="100%" ref={ref} h="0.1" />
      {size.width && (
        <Line direction="left" w={`${size.width}px`} {...props} />
      )}
    </Box>
  );
};
