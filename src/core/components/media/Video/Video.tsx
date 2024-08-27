import { Box } from "@chakra-ui/react";
import { Filter, MotionBox } from "@components/foundations";
import { MarplaCommonComponent } from "@commonTypes/MarplaCommonComponent";
import { FC } from "react";

export const Video: FC<MarplaCommonComponent & any> = ({
  width,
  height,
  src,
  shape,
  effect,
  ...rest
}) => {
  return (
    <Filter shape={shape} effect={effect}>
      <MotionBox width={width} height={height} {...rest}>
        <Box width={width} height={height}>
          <video autoPlay={true} muted loop src={src} width={width} height={height}  />
        </Box>
      </MotionBox>
    </Filter>
  );
};
