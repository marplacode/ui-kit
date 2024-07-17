import { useEffect, useState } from 'react';
import { Box } from  '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';

export const FragmentedVariation = ({ show = true, ...props }) => {
  const { primaryColor, secondaryColor } = props;
  const slices = new Array(10).fill(0).map((_, index) => (
    <animated.div
      key={index}
      style={{
        transform: useSpring({
          transform: show ? 'translateY(-100%)' : 'translateY(0%)',
          config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
          delay: index * 100,
        }).transform,
        position: 'absolute',
        width: `${100 / 10}%`,
        height: '100%',
        top: '0',
        left: `${(100 / 10) * index}%`,
        backgroundColor: index % 2 === 0 ? primaryColor ?? '#FFF' : secondaryColor ?? '#FFF',
        zIndex: 100 + index,
      }}
    />
  ));

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="11"
      // visibility={show ? 'hidden' : 'visible'}
      {...props}
    >
      {slices}
    </Box>
  );
};