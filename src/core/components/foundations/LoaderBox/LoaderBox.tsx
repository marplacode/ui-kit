import { Filter } from "../Filter";
import { MotionBox } from "../MotionBox";
import { StaggerBox } from "../StaggerBox";
import { Box } from "@components/layout";

export const LoaderBox = ({ children, show, ...props }) => {
  return (
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
  );
};
