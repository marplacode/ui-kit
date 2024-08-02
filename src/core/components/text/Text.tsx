// import { useEffect, useState } from 'react';
// import { Box, Text as CT } from '@chakra-ui/react';
// import { useSpring, animated } from '@react-spring/web';

import { BoxProps,Box, chakra } from "@chakra-ui/react";
import { motion,} from "framer-motion";

// export const Text = ({ isLoading = true, text = 'Loading...', ...props }) => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     if (!isLoading) {
//       setIsLoaded(true);
//     } else {
//       setIsLoaded(false);
//     }
//   }, [isLoading]);

//   const textSpring = useSpring({
//     transform: isLoaded ? 'translateY(-100%)' : 'translateY(0%)',
//     opacity: isLoaded ? 0 : 1,
//     config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
//   });

//   return (
//     <Box
//       position="fixed"
//       top="50%"
//       left="50%"
//       transform="translate(-50%, -50%)"
//       zIndex="103"
//       // visibility={isLoaded ? 'hidden' : 'visible'}
//       {...props}
//     >
//       <animated.div style={textSpring}>
//         <CT fontSize="2xl" color={props.color}>{text}</CT>
//       </animated.div>
//     </Box>
//   );
// };

interface LetterAnimation {
  y?: number; // Move up or down
  opacity?: number; // Opacity change
  rotateX?: number; // 3D rotation
}

interface MotionTextProps extends BoxProps {
  text: string;
  delay?: number;
  duration?: number;
  easing?: string;
  animations?: { [key: string]: LetterAnimation }; // Object mapping letters to animations
} 

const MotionBox = motion(chakra.div);

export const Text: React.FC<any> = ({
  text,
  delay = 0.1,
  duration = 0.8,
  easing = 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  letters: lettersConfig = {}, // Default to empty object if not provided
  show = true,
  ...props
}) => {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const getLetterVariants = (letter: string) => {
    const animation = lettersConfig[letter] || {};
    console.log('anim',animation,letter)
    return {
      hidden: {
        y: animation.y !== undefined ? animation.y : -50,
        opacity: animation.opacity !== undefined ? animation.opacity : 0,
        rotateX: animation.rotateX !== undefined ? animation.rotateX : -90,
      },
      visible: {
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
          duration,
          ease: easing,
        },
        ...animation
      },
    };
  };

  return (
    <chakra.div overflow="hidden" display="inline-block" {...props}>
      <MotionBox
        initial="hidden"
        animate={show ?"visible" : 'hidden' }
        variants={containerVariants}
        display="flex"
      >
        {letters.map((letter, index) => (
          <MotionBox
            key={index}
            variants={getLetterVariants(letter)}
            display="inline-block"
          >
            {letter}
          </MotionBox>
        ))}
      </MotionBox>
    </chakra.div>
  );
};