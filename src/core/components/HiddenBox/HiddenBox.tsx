import { Box } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { FC, useLayoutEffect, useMemo, useRef, useState } from "react";
import { HiddenBoxProps } from "../../types/HiddenBox";

const MotionBox = motion(Box);

export const CUBIC_MOTION_FUNCTION_1 = [0.37, 0.23, 0, 1.01];
export const CUBIC_MOTION_FUNCTION_2 = [0.72, 0.08, 0, 1.05];
export const CUBIC_MOTION_FUNCTION_3 = [0.61, -0.01, 0, 0.99];
export const EASING_VALUES_1 = [0.38, -0.01, 0.58, 1];

const showPosition = { x: 0, y: 0 };

export const HiddenBox: FC<HiddenBoxProps> = ({
  children,
  animationDisabled = false,
  show = true,
  showInView = false,
  direction = "top",
  delay = 0,
  duration = 0.8,
  height: initialHeight = null,
  easingValues = CUBIC_MOTION_FUNCTION_1,
  isInViewConfig = {}
}) => {
  const initialPosition = useMemo(() => {
    switch (direction) {
      case "top":
        return { y: "-100%" };
      case "bottom":
        return { y: "100%" };
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      case "top left":
        return { x: "-100%", y: "-100%" };
      case "top right":
        return { x: "100%", y: "-100%" };
      case "bottom left":
        return { x: "-100%", y: "100%" };
      case "bottom right":
        return { x: "100%", y: "100%" };
      default:
        return {};
    }
  }, [direction]);
  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 });
  const childRef = useRef(null);
  const isInView = useInView(childRef, isInViewConfig);

  const calculateAnimation = useMemo(() => {
    if (animationDisabled) {
      return showPosition;
    }
    if (showInView) {
      return isInView ? showPosition : initialPosition;
    }
    return show ? showPosition : initialPosition;
  }, [initialPosition, showPosition, isInView, animationDisabled, show]);

  useLayoutEffect(() => {
    if (childRef.current) {
      setDimensions({
        width: childRef.current.clientWidth,
        height: childRef.current.clientHeight,
      });
    }
  }, [children]);

  return (
    <Box
      overflow={"hidden"}
      display="flex"
      width={width}
      height={initialHeight}
    >
      <MotionBox
        display="flex"
        initial={animationDisabled ? { x: 0, y: 0 } : initialPosition}
        animate={calculateAnimation}
        transition={{ delay, duration, ease: easingValues }}
        ref={childRef}
      >
        {children}
      </MotionBox>
    </Box>
  );
};
