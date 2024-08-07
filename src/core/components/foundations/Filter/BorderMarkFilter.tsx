import { MotionBoxProps } from "@types/HiddenBox";
import { FC, useCallback } from "react";
import { VLine, HLine, HStack, Box } from "@components";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { VStack } from "@chakra-ui/react";
import { formatUnit } from "@utils";

export const BorderMarkFilter: FC<MotionBoxProps> = ({
  show,
  children,
  width,
  height,
  childrenRef,
  delay,
  thickness = 2,
  ...props
}) => {
  console.log("SHOWW", show);
  console.log("widd", width);

  const lineColor = "#FFF";
  const thicknessOffset = `10${thickness}%`

  const renderLines = useCallback(
    () => (
      <VStack
        position="absolute"
        display="flex"
        w={width}
        h={height}
      >
        {/* LEFT - RIGHT lines */}
        <HStack
          detectMobile={false}
          position="absolute"
          justifyContent="space-between"
          w={width}
        >
          <VLine
            direction="top"
            h={height}
            show={show}
            delay={delay}
            thickness={thickness}
            // initialValues={{ y: -2}}
            initialValues={{ y: thicknessOffset}}
          />
          <VLine
            direction="bottom"
            h={height}
            bg={lineColor}
            show={show}
            // delay={delay}
            thickness={thickness}
            delay={delay + 0.6}
            initialValues={{ y: thicknessOffset}}
          />
        </HStack>

        {/* TOP - BOTTOM lines */}
        <VStack position="absolute" justifyContent="space-between" h={height}>
          <HLine
            show={show}
            delay={delay}
            bg={lineColor}
            w={width}
            thickness={thickness}
            initialValues={{ x: thicknessOffset}}
          />
          <HLine
            show={show}
            delay={delay + 0.4}
            bg={lineColor}
            w={width}
            thickness={thickness}
            initialValues={{ x: thicknessOffset}}
          />
        </VStack>
      </VStack>
    ),
    [width, height, show]
  );

  console.log("chil", childrenRef);
  console.log("WIDDTHH", { width, height });

  return (
    <VStack>
      <Box ref={childrenRef}>{children}</Box>
      {width && renderLines()}
    </VStack>
  );
};
