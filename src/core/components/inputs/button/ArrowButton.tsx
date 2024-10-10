import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { HLine, Box } from "@components";
import { StaggerBox, MotionBox } from "@components/foundations";
import { PropsWithChildren, FC } from "react";

export interface ArrowButtonProps extends PropsWithChildren, MotionBoxProps {
  width?: string;
  height?: string;
  size?: string;
  onClick?: () => void;
}

export const ArrowButton: FC<ArrowButtonProps> = ({
  show,
  delay = 0,
  width = "40px",
  height = "20px",
  size = "10",
  onClick,
  ...rest
}) => {
  return (
    <Box onClick={onClick} pr="4" cursor="pointer" {...rest}>
      <StaggerBox stackDirection="stack" show delay={delay}>
        <MotionBox show={!show}>
          <Box
            w={size}
            h={size}
            //   w={width} h={height}

            position={"relative"}
            overflow="hidden"
          >
            <Box
              transform="rotate(45deg)"
              w="100%"
              position={"absolute"}
              top="-1%"
            >
              <HLine />
            </Box>

            <Box
              transform="rotate(-45deg)"
              w="100%"
              position={"absolute"}
              top="-1%"
            >
              <HLine />
            </Box>
          </Box>
        </MotionBox>

        <MotionBox show={show}>
          <Box
            w={size}
            h={size}
            // w={width} h={height}
            position={"relative"}
            overflow="hidden"
            transform="rotate(180deg)"
          >
            <Box
              transform="rotate(45deg)"
              w="100%"
              position={"absolute"}
              top="-1%"
            >
              <HLine />
            </Box>
            <Box
              transform="rotate(-45deg)"
              w="100%"
              position={"absolute"}
              top="-1%"
            >
              <HLine color="#ffffff4a" />
            </Box>
          </Box>
        </MotionBox>
      </StaggerBox>
    </Box>
  );
};
