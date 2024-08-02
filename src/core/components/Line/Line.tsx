import { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";

const AnimatedBox = animated(Box);

const MOTION_CUBIC_BEZIER = "cubic-bezier(0.76, 0, 0.2, 1)";

const VerticalLineBottom = ({
  show = true,
  direction = "horizontal",
  width = "100%",
  height = "2px",
  primaryColor,
  secondaryColor,
  ...props
}:any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!show);
  }, [show]);

  const style = useSpring({
    transition: `transform 1000ms ${MOTION_CUBIC_BEZIER} 0s`,
    transform: isLoaded
      ? "translate3d(-100%, 0%, 0px)"
      : "translate3d(0%, 0%, 0px)",
  });
  const isHorizontal = direction == "horizontal";

  return (
    <Box
      width="100%"
      overflow="hidden"
      bg={primaryColor ? primaryColor : "transparent"}
    >
      <AnimatedBox
        style={style}
        width="100%"
        height="2px"
        bg={secondaryColor ? secondaryColor : "black"}
      />
    </Box>
  );
};

const DashedLineCenter = ({ show = true, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!show);
  }, [show]);

  const style = useSpring({
    width: isLoaded ? "100%" : "0%",
    transform: isLoaded ? "translateX(0%)" : "translateX(-100%)",
    config: { duration: 1200, easing: (t) => 1 - (1 - t) ** 4 },
  });

  return (
    <Box
      position="relative"
      width="100%"
      height="2px"
      backgroundColor="transparent"
      {...props}
    >
      <animated.div
        style={{
          ...style,
          position: "absolute",
          height: "2px",
          backgroundColor: "black",
          backgroundImage:
            "repeating-linear-gradient(90deg, black, black 5px, transparent 5px, transparent 10px)",
        }}
      />
    </Box>
  );
};
export const Line = ({
  show = true,
  variation = "horizontalLineCenter",
  ...props
}) => {
  switch (variation) {
    // case 'horizontalLineCenter':
    //   return <HorizontalLineCenter show={show} {...props} />;
    case "vertical":
      return <VerticalLineBottom show={show} {...props} />;
    // case 'diagonalLineTopLeft':
    //   return <DiagonalLineTopLeft show={show} {...props} />;
    // case 'zigzagLine':
    //   return <ZigzagLine show={show} {...props} />;
    case "dashed":
      return <DashedLineCenter show={show} {...props} />;
    // default:
    //   return <HorizontalLineCenter show={show} {...props} />;
  }
};

// import { chakra, BoxProps } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// // import { AnimationProps } from '../animations/common';
// // import { withAnimation } from '../animations/withAnimation';

// interface LineProps extends BoxProps {}

// const MotionBox = motion(chakra.div);

// export const Line: React.FC<LineProps& any> = ({
//   direction = 'horizontal',
//   easing = 'easeInOut',
//   delay = 0,
//   duration = 0.5,
//   loop = true,
//   ...props
// }) => {
//   const horizontal = direction === 'horizontal';

//   const variants = {
//     initial: {
//       width: horizontal ? '0%' : '100%',
//       height: horizontal ? '100%' : '0%',
//     },
//     animate: {
//       width: horizontal ? '100%' : '2px',
//       height: horizontal ? '2px' : '100%',
//       transition: {
//         ease: easing,
//         duration,
//         delay,
//         repeat: loop ? Infinity : 0,
//       },
//     },
//   };

//   const style = horizontal
//     ? { height: '2px', width: '100%' }
//     : { width: '2px', height: '100%' };

//   return (
//     <MotionBox
//       style={style}
//       variants={variants}
//       initial="initial"
//       animate="animate"

//       {...props}
//     />
//   );
// };
