import { Box } from "@chakra-ui/react";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { HiddenBoxProps } from "@types/HiddenBox";
import { motion, useInView } from "framer-motion";
import { FC, useMemo } from "react";

const MotionBox2 = motion(Box);

export const CUBIC_MOTION_FUNCTION_1 = [0.37, 0.23, 0, 1.01];
export const CUBIC_MOTION_FUNCTION_2 = [0.72, 0.08, 0, 1.05];
export const CUBIC_MOTION_FUNCTION_3 = [0.61, -0.01, 0, 0.99];
export const EASING_VALUES_1 = [0.38, -0.01, 0.58, 1];

const showPosition = { x: 0, y: 0 };

export const MotionBox: FC<HiddenBoxProps> = ({
  children,
  animationDisabled = false,
  show = true,
  showInView = false,
  direction = "top",
  delay = 0,
  duration = 0.8,
  height: initialHeight = null,
  easingValues = CUBIC_MOTION_FUNCTION_1,
  isInViewConfig = {},
  initialValues = undefined,
}) => {
  const initialPosition = useMemo(() => {
    if (initialValues) {
      return initialValues;
    }
    switch (direction) {
      case "top":
        return { y: "-100%" };
      case "bottom":
        return { y: "100%" };
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      default:
        return {};
    }
  }, [direction]);
  const {
    ref: childrenRef,
    size: { width, height },
  } = useCalculateNodeSize({ formatToPixels: true });
  const isInView = useInView(childrenRef, isInViewConfig);

  const calculateAnimation = useMemo(() => {
    if (animationDisabled) {
      return showPosition;
    }
    if (showInView) {
      return isInView ? showPosition : initialPosition;
    }
    return show ? showPosition : initialPosition;
  }, [initialPosition, showPosition, isInView, animationDisabled, show]);

  return (
    <Box
      overflow={"hidden"}
      display="flex"
      width={width}
      height={initialHeight}
    >
      <MotionBox2
        display="flex"
        initial={animationDisabled ? { x: 0, y: 0 } : initialPosition}
        animate={calculateAnimation}
        transition={{ delay, duration, ease: easingValues }}
        ref={childrenRef}
      >
        {children}
      </MotionBox2>
    </Box>
  );
};
