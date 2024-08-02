import { useEffect, useState } from 'react';
import { Box } from  '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';

export const FragmentedVariation = ({ show = true, direction = 'vertical',...props }) => {
  const { primaryColor, secondaryColor } = props;

  if(direction== 'vertical') {
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
        {...props}
      >
        {slices}
      </Box>
    );
  
  }
 
  if(direction== 'horizontal') {
  const slices = new Array(10).fill(0).map((_, index) => (
    <animated.div
      key={index}
      style={{
        transform: useSpring({
          transform: show 
            ? index % 2 === 0 ? 'translateX(-100%)' : 'translateX(100%)'
            : 'translateX(0%)',
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
      {...props}
    >
      {slices}
    </Box>
  );
  }

  if(direction== 'zigzag') {
  const slices = new Array(20).fill(0).map((_, index) => (
    <animated.div
      key={index}
      style={{
        transform: useSpring({
          transform: show 
            ? index % 2 === 0 ? 'translateY(-100%)' : 'translateY(100%)'
            : 'translateY(0%)',
          config: { duration: 1200 + index * 50, easing: t => (1 - (1 - t) ** 4) },
          delay: index * 50,
        }).transform,
        position: 'absolute',
        width: `${100 / 20}%`,
        height: '100%',
        top: '0',
        left: `${(100 / 20) * index}%`,
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
      {...props}
    >
      {slices}
    </Box>
  );
  }
};