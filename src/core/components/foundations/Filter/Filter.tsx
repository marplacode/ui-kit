import { Box, LinkBox, styled } from "@chakra-ui/react";
import { FilterComponentProps } from "@types/FilterComponent";
import { motion } from "framer-motion";
import { FC } from "react";
import { CUBIC_MOTION_FUNCTION_1, CUBIC_MOTION_FUNCTION_3 } from "../MotionBox";

const AnimatedBox = motion(Box);

const shapes = {
  circle: "circle(50% at 50% 50%)",
  ellipse: "ellipse(50% 50% at 50% 50%)",
  polygon: "polygon(50% 0%, 0% 100%, 100% 100%)",
  inset: "inset(10% 20% 30% 40%)",
  // Add more shapes as needed
};

const effects = {
  breathing: {
    y: [0, -10, 0], // Adjust the y values for the up and down effect
    x: [0, 5, -5, 0], // Add slight horizontal movement
    // rotate: [0, 0.5, -0.5, 0],  // Add slight rotation
    // scale: [1, 1.05, 1],  // Add slight scaling
  },
};

/**
 * @description This component handles all kind of filters to apply on top of MotionBox
 * its useful when you want to overflow with a shape or color gradient
 * @param param0
 * @returns
 */
export const Filter: FC<FilterComponentProps> = ({
  shape = "none",
  effect = "none",
  disabled = false,
  children,
  ...props
}) => {
  if (disabled) {
    return <>{children}</>;
  }

  if (effect == "color") {
    return <ColorTransitionFilter {...props}>{children}</ColorTransitionFilter>;
  }

  if (effect == "breathing") {
    return <BreathingEffect {...props}>{children}</BreathingEffect>;
  }

  const finalShape: any = shapes[shape] || "none";

  return (
    <Box clipPath={finalShape} transition="ease-in" {...props}>
      {children}
    </Box>
  );
  // <div style={{"filter": "hue-rotate(90deg)"}}>
  //   {children}
  // </div>
};

const BreathingEffect = ({ children, ...props }) => {
  return (
    <motion.div
      animate={effects.breathing}
      transition={{
        duration: 4,
        ease: CUBIC_MOTION_FUNCTION_1,
        repeat: Infinity,
        repeatType: "mirror",
      }}
      style={{
        display: "inline-block",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};



// const FilterWrapper = styled(motion.div)`
//   display: inline-block;
//   filter: ;
//   transition: filter 0.5s ease-in-out;
// `;

// const ColorEffect = ({ blur, color, children, show,...props }) => {
//   return (
//     <AnimatedBox
//       display="inline-block"
//       // filter={`blur(${blur}px) ${color}`}
//       blur={blur}
//       bgColor={color}
//       initial={{ filter: `blur(0px) hue-rotate(0deg)` }}
//       animate={{ filter: show?  `blur(${blur}px) hue-rotate(${blur}deg)` : `blur(0px) hue-rotate(0deg)` }}
//       transition={{ duration: 1, ease: CUBIC_MOTION_FUNCTION_1 }}
//       {...props}
//     >
//       {children}
//     </AnimatedBox>
//   );
// };


const ColorTransitionFilter = ({ blur, startColor, endColor, show, children, ...props }) => {
  return (
    <AnimatedBox
      initial={{ filter: `blur(${blur}px)`, backgroundColor: startColor }}
      animate={{ backgroundColor: show ? endColor : startColor }}
      transition={{ duration: 1, ease: CUBIC_MOTION_FUNCTION_3 }}
      style={{ filter: `blur(${blur}px)` }}
      {...props}
    >
      {children}
    </AnimatedBox>
  );
};
