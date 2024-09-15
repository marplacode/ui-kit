import { Box } from "@chakra-ui/react";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { motion, useInView } from "framer-motion";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { CUBIC_MOTION_FUNCTION_1 } from "@config";
import { useUiKit } from "@hooks/useUiKit";

const MotionBox2 = motion(Box);

const showPosition = { x: 0, y: 0 };



function useIsInView(ref: React.RefObject<HTMLElement>, enabled = true): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, enabled]);

  return isInView;
}


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
  // const isInView = useInView(childrenRef, isInViewConfig);
  const isInView = useIsInView(visibleBoxRef, showInView);
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
