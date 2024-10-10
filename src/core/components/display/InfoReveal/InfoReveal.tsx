import { VStack } from "@chakra-ui/react";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { ArrowButton, HLine } from "@components";
import { StaggerBox, MotionBox, Box, Image, Text } from "@components";
import { useToggle } from "@hooks/useToggle";
import { PropsWithChildren, FC } from "react";
import { HDStack } from "../../layout/HDStack";

export interface InfoRevealProps extends PropsWithChildren, MotionBoxProps {
  icon: string;
  label: string;
  contentEnabled?: boolean;
  onClick?: () => void;
  onChange?: () => void;
}

export const InfoReveal: FC<InfoRevealProps> = ({
  icon = "images/icon.svg",
  label,
  show,
  contentEnabled = true,
  children,
  onChange,
  onClick,
}) => {
  const { toggle: toggleContent, value: showContent } = useToggle();

  const openContent = () => {
    if (contentEnabled) {
      return toggleContent();
    }
    onClick();
  };

  return (
    <VStack w="100%" spacing="6">
      <VStack
        w="100%"
        alignItems={"space-between"}
        onClick={() => openContent()}
        cursor={ contentEnabled ? "pointer" : 'auto'}
      >
        <HDStack w="100%" justifyContent="space-between">
          <HDStack>
            <Box w="20px">
              <Image show={show} delay={1.2} src={icon} />
            </Box>
            <Text show={show} delay={1.4} fontWeight="600" color="#FFF">
              {label}
            </Text>
          </HDStack>
          <ArrowButton show={showContent} delay={1.6} size="6" />
        </HDStack>
      </VStack>

      <HLine show={show} delay={0.8} />
      {/* TODO change this for unmounting wit animation */}
      {showContent && <MotionBox show={showContent}>{children}</MotionBox>}
    </VStack>
  );
};
