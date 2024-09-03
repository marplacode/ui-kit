import { Box, Image as CImage, ImageProps } from "@chakra-ui/react";
import { Filter, MotionBox } from "@components/foundations";
import { MarplaCommonComponent } from "@commonTypes/MarplaCommonComponent";
import { FC } from "react";
import { getMotionProps } from "@utils/getMotionProps";

const getGradientType = (type, imageUrl, config) => {
  const gradients = {
    linear: `linear-gradient(to bottom, ${config.color1}, ${config.color2}),
    url('${imageUrl}')`,
    radial: `radial-gradient(${config.color1}, ${config.color2}),
    url('${imageUrl}')`,
  };
  return gradients[type ?? 'radial'];
};

export const Image: FC<MarplaCommonComponent & ImageProps & any> = ({
  width,
  height,
  src,
  shape,
  effect,
  objectFit,
  shadow,
  gradientConfig = {
    type: "radial",
    color1: "rgba(1,1,1, 0)",
    color2: "rgba(0,0,0, 0.3)",
  },
  ...props
}) => {
  const { motionProps, rest } = getMotionProps(props);
const { showInView } = motionProps
  console.log("Image props", { motionProps, rest });

  console.log("show in view", );
  return (
    <Filter shape={shape} effect={effect}>
      {/* @ts-ignore */}
      <MotionBox width={width} height={height} showInView={showInView} {...motionProps}>
        {/* {shadow && <Box width={width} height={height} bg={`radial-gradient(circle, ${radialShadow.color1.color} ${radialShadow.color1.stength},${radialShadow.color2.color} ${radialShadow.color2.stength})`} /> } */}
        <Box width={width} height={height}>
          <CImage
            width={width}
            height={height}
            fit={objectFit}
            {...(shadow
              ? {
                  bg: getGradientType(
                    typeof shadow == "string"
                      ? shadow
                      : gradientConfig.type,
                    src,
                    gradientConfig
                  ),
                  backgroundSize: "cover"
                }
              : { src })}
            {...rest}
          />
        </Box>
      </MotionBox>
    </Filter>
  );
};
