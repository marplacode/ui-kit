import { useEffect, useState } from 'react';
import { Box } from  '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';

export const SlidingSideVariation = ({  show = true, 
  direction = 'top'
  ,...props }:any) => {
  const {primaryColor, secondaryColor} = props

  const getTransform = (loaded, dir, part) => {
    const translateMap = {
      top: 'translateY(-100%)',
      left: 'translateX(-100%)',
      bottom: 'translateY(100%)',
      intercalated: part === 1 ? 'translateX(100%)' : 'translateX(-100%)'
    };

    return loaded ? translateMap[dir] : 'translate(0%)';
  };

  const bg1Spring = useSpring({
    transform: getTransform(show, direction, 1),
    config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
    delay: 800,
    onRest: props.onAnimationEnd
  });

  const bg2Spring = useSpring({
    transform: getTransform(show, direction, 2),
    config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
    delay: 500, 
    // onRest: props.onAnimationEnd
  });

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="11"
      pointerEvents='none'
    >
      <animated.div
        style={{
          ...bg1Spring,
          position: 'absolute',
          transformOrigin: direction === 'left' || direction === 'intercalated' ? 'left' : 'top',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          backgroundColor: primaryColor ? primaryColor : '#FFF',
          zIndex: 101,
        }}
      />
      <animated.div
        style={{
          ...bg2Spring,
          position: 'absolute',
          transformOrigin: direction === 'left' || direction === 'intercalated' ? 'right' : 'top',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          backgroundColor: secondaryColor ? secondaryColor : '#000',
          zIndex: 102,
        }}
      />
    </Box>
  );
};
