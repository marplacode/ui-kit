import { Filter } from "../Filter";
import { MotionBox } from "../MotionBox";
import { StaggerBox } from "../StaggerBox";
import { Box } from "@components/layout";
import { useDebounce } from "@hooks/useDebounce";
import { delay } from "framer-motion";
import { useState } from "react";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";

export const LoaderBox = ({
  children,
  width,
  height,
  delay,
  show: initalShow,
  showInView,
  ...props
}: any) => {
  const [show, setShow] = useState(!initalShow);
  const { ref, size } = useCalculateNodeSize({ formatToPixels: true });

  useDebounce(
    () => {
      setShow(initalShow);
    },
    delay * 1000,
    [initalShow]
  );

  return (
    <Box width={width} height={height} position="relative" {...props}>
      {size.height != 0 && (
        <StaggerBox stackDirection="stack">
          <MotionBox
            show={show}
            direction="right"
            delay={0.39}
            showInView={showInView}
          >
            <Box
              bg="#FFF"
              width={size.width}
              height={size.height}
              blendMode="difference"
            />
          </MotionBox>
          <MotionBox
            show={show}
            showInView={showInView}
            direction="right"
            delay={0.6}
          >
            <Box
              bg="#c2c2c2"
              width={size.width}
              height={size.height}
              blendMode="difference"
            />
          </MotionBox>
          <MotionBox
            show={show}
            direction="right"
            delay={0.9}
            showInView={showInView}
          >
            <Box
              bg="#6e6e6e"
              width={size.width}
              height={size.height}
              blendMode="difference"
            />
          </MotionBox>
          <Box w={size.width} h={size.height} />
        </StaggerBox>
      )}
      {/* DUMB COMPONENT TO CALCULATE WIDTH */}
      <Box ref={ref} w="100%" h="100%" position="absolute" />
      <Filter effect={"border"} show={show} showInView={showInView}>
        <Box w={size.width}>{children}</Box>
      </Filter>
    </Box>
  );
};
