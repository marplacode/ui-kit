import { MotionBoxProps } from "@types/HiddenBox";
import { FC, useCallback } from "react";
import { VLine, HLine, HStack, Box } from "@components";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { VStack } from "@chakra-ui/react";

export const BorderMarkFilter: FC<MotionBoxProps> = ({
  show,
  children,
  width, 
  height,
  childrenRef,
  ...props
}) => {
  console.log('SHOWW',show)
  const lineColor = "#FFF";


  const renderLines = useCallback(
    () => (
      <VStack
        position="absolute"
        display="flex"
        w={width}
        h={height}
        // justifyContent="space-between"
        // display='inline-block'
        // w={100}
        // h={100}
      >
        {/* LEFT - RIGHT lines */}
        <HStack position="absolute" justifyContent="space-between" w={width}>
          <VLine direction="top" h={height} show={show} />
          <VLine direction="bottom" h={height} bg={lineColor} show={show} />
        </HStack>

        {/* TOP - BOTTOM lines */}
        <VStack position="absolute" justifyContent="space-between" h={height}>
          <HLine show={show} bg={lineColor} w={width} />
          <HLine show={show} bg={lineColor} w={width} />
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
      {/* <HLine show={show} bg={lineColor} 
        width={width}
        /> */}
      {width && renderLines()}
    </VStack>
  );
};
