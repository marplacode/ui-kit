import { VStack } from "@chakra-ui/react";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { ArrowButton, HLine } from "@components";
import { Box, Image, Text } from "@components";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { useToggle } from "@hooks/useToggle";
import { PropsWithChildren, FC, useState, useEffect, useMemo } from "react";
import { HDStack } from "../../layout/HDStack";

export interface InfoRevealProps extends PropsWithChildren, MotionBoxProps {
  icon: string;
  label: string;
  contentEnabled?: boolean;
  initialOpen?: boolean;
  arrowOrientation?: string;
  arrowSize?: string;
  onClick?: () => void;
  onChange?: () => void;
}

export const InfoReveal: FC<InfoRevealProps> = ({
  icon = "images/icon.svg",
  label,
  show,
  initialOpen = false,
  contentEnabled = true,
  arrowOrientation = "up",
  arrowSize = "4",
  children,
  onChange,
  onClick = () => {},
}) => {
  const [initialShow] = useState(show);
  const { toggle: toggleContent, value: showContent } = useToggle(initialOpen);
  const { ref: contentRef, size } = useCalculateNodeSize({
    formatToPixels: false,
  });
  const { ref: mainSectionRef, size: mainSectionSize } = useCalculateNodeSize({
    formatToPixels: false,
  });
  const contentHeight = Number(size.height) + Number(mainSectionSize.height)

  // useEffect(() => {
  //   if (show !== showContent) {
  //     toggleContent();
  //   }
  // }, [show]);

  const openContent = () => {
    if (contentEnabled) {
      toggleContent();
    }
    onClick();
  };

  return (
    <VStack
      w="100%"
      transition="all 0.3s ease"
      style={{ height: showContent ? contentHeight: mainSectionSize.height }}
      overflow="hidden"
      spacing="0"
    >
      {/* HEADER */}
      <VStack
        w="100%"
        alignItems={"space-between"}
        onClick={openContent}
        cursor={"pointer"}
        ref={mainSectionRef}
      >
        <VStack>
          <HDStack w="100%" align="center" spacing="4" justify="space-between">
            <HDStack>
              <Box w="20px">
                <Image show={initialShow} delay={1.2} src={icon} />
              </Box>
              <Text
                show={initialShow}
                delay={1.4}
                fontWeight="600"
                color="#FFF"
              >
                {label}
              </Text>
            </HDStack>

            <VStack h="100%" w="20px" justify="center" position={"relative"}>
              <Box
                w="20px"
                h="60%"
                position={"absolute"}
                top={showContent ? "2" : "0"}
              >
                <ArrowButton
                  show={!!showContent}
                  delay={1.6}
                  size={arrowSize}
                  orientation={arrowOrientation}
                />
              </Box>
            </VStack>
          </HDStack>
        </VStack>

        <HLine show={initialShow} delay={0.8} />
      </VStack>

    {/* CONTENT */}
      <Box ref={contentRef} w="100%">{children}</Box>
    </VStack>
  );
};
