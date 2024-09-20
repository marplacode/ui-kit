import { Box } from "@chakra-ui/react";
import { Filter, MotionBox } from "@components/foundations";
import { MarplaCommonComponent } from "@commonTypes/MarplaCommonComponent";
import { FC, useEffect, useRef } from "react";
import { getMotionProps } from "@utils/getMotionProps";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { useIsInView } from "@hooks/useIsInView";

export const Video: FC<MarplaCommonComponent & any> = ({
  width,
  height,
  src,
  shape,
  effect,
  loop = true,
  startTime,
  endTime,
  autoPlay: initAutoPlay = true,
  // playbackrate
  // 1.0 is normal speed
  // 0.5 is half speed (slower)
  // 2.0 is double speed (faster)
  playbackRate = 1.0,
  ...props
}) => {
  const { motionProps, rest } = getMotionProps(props);
  const { ref: sizeRef, size } = useCalculateNodeSize({ formatToPixels: true });
  const isInView = useIsInView(sizeRef, {
    enabled: motionProps.showInView,
    executeOnce: motionProps.showOnce,
  });
  const autoPlay =
    motionProps.showInView || motionProps.showOnce ? false : initAutoPlay;
  const ref: any = useRef(null);

  // Handle start and end time/ loop
  useEffect(() => {
    const videoElement = ref.current;

    if (!videoElement) return () => {};

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

    const playVideo = () => {
      videoElement.currentTime = startTime;
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.play();
    };

    // if showInView is provided validate that isInView 
    if (motionProps.showInView || (motionProps.showOnce && !autoPlay)) {
      if (isInView) {
        playVideo();
      }
    } else {
      playVideo();
    }

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [startTime, endTime, motionProps, autoPlay, isInView, ref.current]);

  return (
    <Box w={"100%"}>
      {/* Override ChakraUI global mediaquery */}
      <style>
        {`
          :where(video) {
            max-width: 100%;
            height: ${height ? height : "auto"};
          }
        `}
      </style>
      {/* DUMB COMPONENT TO CALCULATE WIDTH */}
      <Box ref={sizeRef} w={"100%"} />
      {size.width && (
        <MotionBox width={size.width} height={height} {...motionProps}>
          <Filter effect={effect ?? "linear-gradient"}>
            <Box width={size.width} height={height}>
              <video
                loop={loop}
                autoPlay={autoPlay}
                muted
                preload="auto"
                playsInline
                ref={ref}
                src={src}
                width={width}
                height={height}
                {...rest}
              />
            </Box>
          </Filter>
        </MotionBox>
      )}
    </Box>
  );
};
