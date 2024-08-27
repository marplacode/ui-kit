import { Filter } from "../Filter";
import { MotionBox } from "../MotionBox";
import { StaggerBox } from "../StaggerBox";
import { Box } from "@components/layout";
import { useDebounce } from "@hooks/useDebounce";
import { delay } from "framer-motion";
import { useState } from "react";

export const LoaderBox = ({
  children,
  width = '300px',
  height = '300px',
  delay,
  show: initalShow,
  showInView,
  ...props
}) => {
  const [show, setShow] = useState(!initalShow);

  useDebounce(
    () => {
      setShow(initalShow);
    },
    delay * 1000,
    [initalShow]
  );

  return (
    <Box width={width} height={height} {...props}>
      <StaggerBox stackDirection="stack">
        <MotionBox show={show} direction="right" delay={0.39} showInView={showInView}>
          <Box bg="#FFF" width={width} height={height} blendMode="difference" />
        </MotionBox>
        <MotionBox show={show} direction="right" delay={0.6}>
          <Box
            bg="#c2c2c2"
            width={width}
            height={height}
            blendMode="difference"
          />
        </MotionBox>
      <MotionBox show={show} direction="right" delay={0.9} showInView={showInView}>
          <Box
            bg="#6e6e6e"
            width={width}
            height={height}
            blendMode="difference"
          />
        </MotionBox>

        <Filter effect={"border"} show={show} showInView={showInView}>
          {children}
        </Filter>
      </StaggerBox>
    </Box>
  );
};
