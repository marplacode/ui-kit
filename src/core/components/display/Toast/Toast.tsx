import { VStack } from "@chakra-ui/react";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { MotionBox, Box, Image, Text } from "@components";
import { useToggle } from "@hooks/useToggle";
import { PropsWithChildren, FC, useEffect } from "react";
import { HDStack } from "../../layout/HDStack";

export interface ToastProps extends PropsWithChildren, MotionBoxProps {
  icon: string;
  title: string;
  description: string;
  show?: boolean;
  isClosable?: boolean;
  duration?: number;
  iconSize?: number;
  titleProps,
  descriptionProps,
}

export const Toast: FC<ToastProps> = ({
  icon = "images/icon.svg",
  iconSize = 60,
  title,
  description,
  duration = 4,
  show,
  titleProps,
  descriptionProps,
}) => {
  const { toggle, value: showContent, on, off } = useToggle(show);

  useEffect(() => {
    let timeoutId = null;
    
    if (show) {
      on()
      timeoutId = setTimeout(() => off(), duration * 1000);
    } else {
      off()
    }

    return () => clearTimeout(timeoutId);
  }, [duration, show]);

  return (
    <MotionBox show={showContent}>
      <HDStack
        w="100%"
        spacing="4"
        backgroundColor="#ffffff47"
        maxW="360px"
        borderRadius="15px"
        p="6"
      >
        <VStack w="100%" spacing="0" alignItems={"space-between"}>
          <Text show={showContent} delay={.6} fontWeight="600" color="#FFF" {...titleProps}>
            {title}
          </Text>
          <Text show={showContent} delay={.8} fontWeight="100" color="#FFF" {...descriptionProps}>
            {description}
          </Text>
        </VStack>

        <Box w={`${iconSize}px`}>
          <Image show={showContent} delay={1} src={icon} />
        </Box>
      </HDStack>
    </MotionBox>
  );
};
