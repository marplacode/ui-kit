import { Box, Image as CImage, ImageProps } from "@chakra-ui/react";
import { Filter, MotionBox } from "@components/foundations";
import { MarplaCommonComponent } from "@commonTypes/MarplaCommonComponent";
import { FC, useState, useEffect } from "react";
import { getMotionProps } from "@utils/getMotionProps";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";

const getGradientType = (type, imageUrl, config) => {
  const gradients = {
    linear: `linear-gradient(to bottom, ${config.color1}, ${config.color2}),
    url('${imageUrl}')`,
    radial: `radial-gradient(${config.color1}, ${config.color2}),
    url('${imageUrl}')`,
  };
  return gradients[type ?? "radial"];
};
// TODO migrate to the second one
// LEGACY!!!
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
  const { ref, size } = useCalculateNodeSize({ formatToPixels: true });

  const { showInView, showOnce } = motionProps;


  return (
    <Box width={'100%'}>
      {/* DUMB COMPONENT TO CALCULATE WIDTH */}
      <Box ref={ref} w={"100%"} />
      {size.width && (
        <Filter shape={shape} effect={effect}>
          {/* @ts-ignore */}
          <MotionBox
            width={size.width}
            height={height}
            showInView={showInView}
            showOnce={showOnce}
            {...motionProps}
          >
            {/* {shadow && <Box width={width} height={height} bg={`radial-gradient(circle, ${radialShadow.color1.color} ${radialShadow.color1.stength},${radialShadow.color2.color} ${radialShadow.color2.stength})`} /> } */}
            <Box width={size.width} height={height}>
              <CImage
                width={size.width}
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
                      backgroundSize: "cover",
                    }
                  : { src })}
                {...rest}
              />
            </Box>
          </MotionBox>
        </Filter>
      )}
    </Box>
  );
};

export const ImageAutoCalculateSize: FC<MarplaCommonComponent & ImageProps & any> = ({
  width,
  height,
  src,
  shape,
  effect,
  // objectFit = "cover",
  objectFit,
  shadow,
  gradientConfig = {
    type: "radial",
    color1: "rgba(1,1,1, 0)",
    color2: "rgba(0,0,0, 0.3)",
  },
  filterProps = {},
  ...props
}) => {
  const { motionProps, rest } = getMotionProps(props);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      // If width and height are not provided, use the image's natural dimensions
      if (!width && !height) {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      } else {
        setImageSize({
          width: width ? parseInt(width as string) : img.naturalWidth,
          height: height ? parseInt(height as string) : img.naturalHeight,
        });
      }
    };
  }, [src, width, height]);

  const { showInView, showOnce } = motionProps;

  return (
    <Box width="100%">
      {imageSize.width > 0 && (
        <Filter shape={shape} effect={effect} {...filterProps}>
          <MotionBox
            width={imageSize.width}
            height={imageSize.height}
            showInView={showInView}
            showOnce={showOnce}
            {...motionProps}
          >
            <Box width={imageSize.width} height={imageSize.height}>
              <CImage
                width={imageSize.width}
                height={imageSize.height}
                objectFit={objectFit}
                {...(shadow
                  ? {
                      bg: getGradientType(
                        typeof shadow === "string"
                          ? shadow
                          : gradientConfig.type,
                        src,
                        gradientConfig
                      ),
                      backgroundSize: "cover",
                    }
                  : { src })}
                {...rest}
              />
            </Box>
          </MotionBox>
        </Filter>
      )}
    </Box>
  );
};
