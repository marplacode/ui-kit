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
  loop = true,
  startTime,
  endTime,
  // playbackrate
  // 1.0 is normal speed
  // 0.5 is half speed (slower)
  // 2.0 is double speed (faster)
  // -1.0 is backwards, normal speed
  // -0.5 is backwards, half speed
  playbackRate = 1.0,
  ...props
}) => {
  const { motionProps, rest } = getMotionProps(props);
  const ref: any = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    const videoElement = ref.current;
    videoElement.playbackRate = playbackRate;
    if (!startTime || !endTime) return () => {};

    const handleTimeUpdate = () => {
      if (endTime && videoElement.currentTime >= endTime) {
        if (loop) {
          videoElement.currentTime = startTime;
        } else {
          videoElement.pause();
        }
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
    <>
      <style>
        {`
          :where(img, video) {
            max-width: 100%;
            height: ${height ? height : 'auto'};
          }
        `}
      </style>
      <Filter effect={"linear-gradient"} {...motionProps}>
        {/* //   <MotionBox width={width} height={height} {...motionProps}>
    //     <Box width={width} height={height}> */}
        <video
          loop={loop}
          autoPlay
          muted
          preload="auto"
          playsInline
          // playbackRate={playbackRate}
          ref={ref}
          src={src}
          width={width}
          height={height}
          {...rest}
        />
        {/* //     </Box>
    //   </MotionBox> */}
      </Filter>
    </>
  );
};
