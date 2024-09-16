import { Box } from "@chakra-ui/react";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { motion } from "framer-motion";
import { FC, useMemo, useRef } from "react";
import { CUBIC_MOTION_FUNCTION_1 } from "@config";
import { useUiKit } from "@hooks/useUiKit";
import { useIsInView } from "@hooks/useIsInView";

const MotionBox2 = motion(Box);
const showPosition = { x: 0, y: 0 };

export const MotionBox: FC<MotionBoxProps> = ({
  children,
  animationDisabled = false,
  show = true,
  showInView = false,
  showOnce = false,
  direction = "top",
  delay = 0,
  duration = 0.8,
  height: initialHeight = null,
  easingValues = CUBIC_MOTION_FUNCTION_1,
  isInViewConfig = {},
  initialValues = undefined,
  visibleBg = 'transparent'
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
  const visibleBoxRef = useRef(null)
  const isInView = useIsInView(visibleBoxRef, { enabled: showInView, executeOnce: showOnce });
  const store:any = useUiKit();
  const globalTransitionConfig = store.config.transition

  const calculateAnimation = useMemo(() => {
    if (animationDisabled) {
      return showPosition;
    }
    if (showInView) {
      return isInView ? showPosition : initialPosition;
    }
    return show ? showPosition : initialPosition;
  }, [initialPosition, showPosition, isInView, animationDisabled, show, showInView]);

  return (
    <Box
      overflow={"hidden"}
      display="flex"
      width={width}
      height={initialHeight}
      bg={visibleBg}
      ref={visibleBoxRef}
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
