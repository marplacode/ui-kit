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
  lineColor = "#FFF",
  thickness = 2,
  sides = { top: null, bottom: null, left: null, right: null },
  ...props
}) => {
  const thicknessOffset = `10${thickness}%`;
console.log('WW',width)
  const renderLines = useCallback(
    () => (
      <VStack position="absolute" display="flex" w={width} h={height}>
        {/* LEFT - RIGHT lines */}
        <HStack
          detectMobile={false}
          position="absolute"
          justifyContent="space-between"
          w={width}
        >
          <VLine
            direction="top"
            bg={lineColor}
            h={height}
            show={show}
            delay={delay}
            thickness={thickness}
            initialValues={{ y: thicknessOffset }}
            {...sides["left"]}
          />
          <VLine
            direction="bottom"
            h={height}
            bg={lineColor}
            show={show}
            thickness={thickness}
            delay={delay + 0.6}
            initialValues={{ y: thicknessOffset }}
            {...sides["right"]}
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
            initialValues={{ x: thicknessOffset }}
            {...sides["top"]}
          />
          <HLine
            show={show}
            delay={delay + 0.4}
            bg={lineColor}
            w={width}
            // w={300}
            thickness={thickness}
            initialValues={{ x: thicknessOffset }}
            {...sides["bottom"]}
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
      <Box ref={childrenRef}><Box {...props}>{children}</Box></Box>
      {width && renderLines()}
    </VStack>
  );
};
