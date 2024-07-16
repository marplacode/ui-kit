import { useEffect, useState } from 'react';
import { Box, Text as CT } from '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';

export const Text = ({ isLoading = true, text = 'Loading...', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [isLoading]);

  const textSpring = useSpring({
    transform: isLoaded ? 'translateY(-100%)' : 'translateY(0%)',
    opacity: isLoaded ? 0 : 1,
    config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
  });

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="103"
      // visibility={isLoaded ? 'hidden' : 'visible'}
      {...props}
    >
      <animated.div style={textSpring}>
        <CT fontSize="2xl" color={props.color}>{text}</CT>
      </animated.div>
    </Box>
  );
};

