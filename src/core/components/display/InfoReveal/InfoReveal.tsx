import { VStack } from "@chakra-ui/react";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { ArrowButton, HLine } from "@components";
import { StaggerBox, MotionBox, Box, Image, Text } from "@components";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { useToggle } from "@hooks/useToggle";
import { PropsWithChildren, FC, useState } from "react";
import { HDStack } from "../../layout/HDStack";

export interface InfoRevealProps extends PropsWithChildren, MotionBoxProps {
  icon: string;
  label: string;
  contentEnabled?: boolean;
  arrowOrientation?: string;
  onClick?: () => void;
  onChange?: () => void;
}

export const InfoReveal: FC<InfoRevealProps> = ({
  icon = "images/icon.svg",
  label,
  show,
  contentEnabled = true,
  arrowOrientation = "down",
  children,
  onChange,
  onClick = () =>{},
}) => {
  const [initialShow,]= useState(show)
  const { toggle: toggleContent, value: showContent } = useToggle(show);
  const { ref: contentRef, size } = useCalculateNodeSize({
    formatToPixels: true,
  });
  const openContent = () => {
    if (contentEnabled) {
      toggleContent();
    }
    onClick();
  };

  return (
    <VStack w="100%" spacing="6">
      <VStack
        w="100%"
        alignItems={"space-between"}
        onClick={() => openContent()}
        cursor={"pointer"}
      >
        <HDStack w="100%" justifyContent="space-between">
          <HDStack>
            <Box w="20px">
              <Image show={initialShow} delay={1.2} src={icon} />
            </Box>
            <Text show={initialShow} delay={1.4} fontWeight="600" color="#FFF">
              {label}
            </Text>
          </HDStack>
          <ArrowButton
            show={!!showContent}
            delay={1.6}
            size="6"
            orientation={arrowOrientation}
          />
        </HDStack>
      </VStack>

      <HLine show={initialShow} delay={0.8} />
      <VStack
        h={showContent ? size.height : 0}
        w="100%"
        transition="all 1s cubic-bezier(0.37, 0.23, 0, 1.01)"
      >
        <VStack 
        w="100%" 
        ref={contentRef}
        >
          <MotionBox show={showContent}>{children}</MotionBox>
        </VStack>
      </VStack>
    </VStack>
  );
};
