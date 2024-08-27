import { Box, Image as CImage } from "@chakra-ui/react";
import { Filter, MotionBox } from "@components/foundations";
import { MarplaCommonComponent } from "@commonTypes/MarplaCommonComponent";
import { FC } from "react";

export const Image: FC<MarplaCommonComponent & any> = ({
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
      {/* <MotionBox width={width - 20} height={height - 20} {...rest}> */}
        <Box width={width} height={height}>
          <CImage src={src} width={width} height={height} />
        </Box>
      </MotionBox>
    </Filter>
  );
};
