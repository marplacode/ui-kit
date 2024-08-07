import { Filter } from "../Filter";
import { MotionBox } from "../MotionBox";
import { StaggerBox } from "../StaggerBox";
import { Box } from "@components/layout";
import { useDebounce } from "@hooks/useDebounce";
import { delay } from "framer-motion";
import { useState } from "react";

export const LoaderBox = ({
  children,
  width,
  height,
  delay,
  show: initalShow,
  ...props
}) => {
  const [show, setShow] = useState(initalShow);
  
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
        <MotionBox show={show} direction="right" delay={0.39}>
          <Box
            bg="#FFF"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        <MotionBox show={show} direction="right" delay={0.6}>
          <Box
            bg="#c2c2c2"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        <MotionBox show={show} direction="right" delay={0.9}>
          <Box
            bg="#6e6e6e"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>

        <Filter effect={"border"} show={show}>
          {children}
        </Filter>
      </StaggerBox>
    </Box>
  );
};
