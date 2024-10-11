import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { HLine, Box } from "@components";
import { StaggerBox, MotionBox } from "@components/foundations";
import { PropsWithChildren, FC } from "react";

export interface ArrowButtonProps extends PropsWithChildren, MotionBoxProps {
  width?: string;
  height?: string;
  size?: string;
  // arrow direction
  orientation?: string;
  initiaOrientation?: string;
  finalOrientation?: string;
  onClick?: () => void;
}

// export const ArrowButton: FC<ArrowButtonProps> = ({
//   show,
//   delay = 0,
//   width = "40px",
//   height = "20px",
//   size = "10",
//   rotate = null,
//   onClick,
//   ...rest
// }) => {
//   return (
//     <Box onClick={onClick} pr="4" cursor="pointer" {...rest}>
//       <StaggerBox stackDirection="stack" show delay={delay}>
//         <MotionBox show={!show}>
//           <Box
//             w={size}
//             h={size}
//             //   w={width} h={height}
//             transform={`"rotate(${rotate ?? '-180'}deg)"`}
//             position={"relative"}
//             overflow="hidden"
//           >
//             <Box
//               transform="rotate(45deg)"
//               w="100%"
//               position={"absolute"}
//               top="-1%"
//             >
//               <HLine />
//             </Box>

//             <Box
//               transform="rotate(-45deg)"
//               w="100%"
//               position={"absolute"}
//               top="-1%"
//             >
//               <HLine />
//             </Box>
//           </Box>
//         </MotionBox>

//         <MotionBox show={show}>
//           <Box
//             w={size}
//             h={size}
//             // w={width} h={height}
//             position={"relative"}
//             overflow="hidden"
//             // transform="rotate(180deg)"
//             transform={`"rotate(${rotate ?? '180'}deg)"`}
//           >
//             <Box
//               transform="rotate(45deg)"
//               w="100%"
//               position={"absolute"}
//               top="-1%"
//             >
//               <HLine />
//             </Box>
//             <Box
//               transform="rotate(-45deg)"
//               w="100%"
//               position={"absolute"}
//               top="-1%"
//             >
//               <HLine color="#ffffff4a" />
//             </Box>
//           </Box>
//         </MotionBox>
//       </StaggerBox>
//     </Box>
//   );
// };

export const ArrowButton: FC<ArrowButtonProps> = ({
  show,
  delay = 0,
  width = "40px",
  height = "20px",
  size = "10",
  orientation = "right", // New direction prop
  initiaOrientation = null,
  finalOrientation = null,

  onClick,
  ...rest
}) => {
  // Mapping directions to rotation angles
  const getRotationAngle = (orientation: string) => {
    switch (orientation) {
      case "left":
        return [-90, 90];
      case "right":
        return [90, -90];
      case "up":
        return [0, 180];
      case "down":
      default:
        return [180, 0];
    }
  };
  const rotationAngle = initiaOrientation ?? getRotationAngle(orientation)[1];
  const rotationAngle2 = finalOrientation ?? getRotationAngle(orientation)[0];

  return (
    <Box onClick={onClick} cursor="pointer" h={size} {...rest}>
      <StaggerBox
        stackDirection="stack"
        show
        // show={show} delay={delay}
      >
        {/* Arrow when 'show' is false */}
        <MotionBox show={!show}>
          <Box
            w={size}
            h={size}
            position="relative"
            overflow="hidden"
            transform={`rotate(${rotationAngle}deg)`} // Rotate based on direction
          >
            <Box
              transform="rotate(45deg)"
              w="100%"
              position="absolute"
              top="-1%"
            >
              <HLine show={!show} delay={0.4} />
            </Box>

            <Box
              transform="rotate(-45deg)"
              w="100%"
              position="absolute"
              top="-1%"
            >
              <HLine show={!show} delay={0.4} />
            </Box>
          </Box>
        </MotionBox>

        {/* Arrow when 'show' is true */}
        <MotionBox show={show}>
          <Box
            w={size}
            h={size}
            position="relative"
            overflow="hidden"
            transform={`rotate(${rotationAngle2}deg)`} // Rotate based on direction
          >
            <Box
              transform="rotate(45deg)"
              w="100%"
              position="absolute"
              top="-1%"
            >
              <HLine show={show} delay={0.4} />
            </Box>

            <Box
              transform="rotate(-45deg)"
              w="100%"
              position="absolute"
              top="-1%"
            >
              <HLine show={show} delay={0.4} color="#ffffff4a" />
            </Box>
          </Box>
        </MotionBox>
      </StaggerBox>
    </Box>
  );
};
