import { useEffect, useState } from 'react';
import { Box } from  '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';

export const ScalingVariation = ({ show = true, ...props }) => {
  const bg1Spring = useSpring({
    transform: show ? 'scale(0)' : 'scale(1)',
    config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
    delay: 800,
  });

  const bg2Spring = useSpring({
    transform: show ? 'scale(0)' : 'scale(1)',
    config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
    delay: 500,
  });

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="11"

      {...props}
    >
      <animated.div
        style={{
          ...bg1Spring,
          position: 'absolute',
          transformOrigin: 'center',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          backgroundColor: '#FFF',
          zIndex: 101,
        }}
      />
      <animated.div
        style={{
          ...bg2Spring,
          position: 'absolute',
          transformOrigin: 'center',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          backgroundColor: '#000',
          zIndex: 102,
        }}
      />
    </Box>
  );
};