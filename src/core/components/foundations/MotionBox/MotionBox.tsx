import { Box } from "@chakra-ui/react";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { motion, useInView } from "framer-motion";
import { FC, useMemo } from "react";
import { useGlobalConfig } from "@context/Provider";
import { CUBIC_MOTION_FUNCTION_1 } from "@config";

const MotionBox2 = motion(Box);

const showPosition = { x: 0, y: 0 };

export const MotionBox: FC<MotionBoxProps> = ({
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
  // config = { inView: {}, animation: {}, etc configs...  }
}) => {
  // globalMotionConfig = useContext UiKitProvider
  const globalMotionConfig = {};
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
  const { transition: globalTransitionConfig } = useGlobalConfig();

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
        initial={animationDisabled ? showPosition : initialPosition}
        animate={calculateAnimation}
        // transition={{ delay, duration, ease: easingValues }}
        transition={{
          delay: delay + globalTransitionConfig.delay,
          duration: duration + globalTransitionConfig.duration,
          ease: easingValues,
        }}
        ref={childrenRef}
      >
        {children}
      </MotionBox2>
    </Box>
  );
};
