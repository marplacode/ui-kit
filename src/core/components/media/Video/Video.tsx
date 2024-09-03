import { Box } from "@chakra-ui/react";
import { Filter, MotionBox } from "@components/foundations";
import { MarplaCommonComponent } from "@commonTypes/MarplaCommonComponent";
import { FC, useEffect, useRef } from "react";
import { useInView } from "@react-spring/web";
import { getMotionProps } from "@utils/getMotionProps";

export const Video: FC<MarplaCommonComponent & any> = ({
  width,
  height,
  src,
  shape,
  effect,
  startTime,
  endTime,
  ...props
}) => {
  const { motionProps, rest } = getMotionProps(props);
  const ref: any = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!startTime || !endTime) return () => {};

    const videoElement = ref.current;

    const handleTimeUpdate = () => {
      if (endTime && videoElement.currentTime >= endTime) {
        videoElement.pause();
      }
    };

    videoElement.currentTime = startTime;
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.play();

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [startTime, endTime]);

  return (
    <Filter effect={'linear-gradient'}>
    {/* //   <MotionBox width={width} height={height} {...motionProps}>
    //     <Box width={width} height={height}> */}
    <video
      loop
      autoPlay
      muted
      preload="auto"
      playsInline
      ref={ref}
      src={src}
      width={width}
      height={height}
      {...rest}
    />
    {/* //     </Box>
    //   </MotionBox> */}
    </Filter>
  );
};
