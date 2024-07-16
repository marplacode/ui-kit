import { useEffect, useState } from 'react';
import { Box } from  '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';

export const SlidingSideVariation = ({  show = true, 
  direction = 'top'
   // 'top', 'left', 'bottom', 'intercalated'
  ,...props }:any) => {
  // const effectDirection = side == 'left' || side == 'right' ? 'horizontal' : 'vertical'
  // const translateAxe = {
  //   direction: { horizontal: 'X', vertical: 'X' },
  //   show: [-100, 100]
  // }
  
  
  // const bg1Spring = useSpring({
  //   // transform: show ? 'translateX(-100%)' : 'translateX(0%)',
  //   transform: `translate${translateAxe.direction[effectDirection]}(${translateAxe.show[show]}%)`,
  //   config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
  //   delay: 800,
  // });

  // const bg2Spring = useSpring({
  //   // transform: show ? 'translateX(-100%)' : 'translateX(0%)',
  //   transform: `translate${translateAxe.direction[effectDirection]}(${translateAxe.show[show]}%)`,
  //   config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
  //   delay: 500,
  // });

  // // useEffect( ()=> {
  // //   bg1Spring.transform.
  // // }, [])

  // return (
  //   <Box
  //     position="fixed"
  //     top="0"
  //     left="0"
  //     width="100%"
  //     height="100%"
  //     zIndex="11"
  //     {...props}
  //   >
  //     <animated.div
  //       style={{
  //         ...bg1Spring,
  //         position: 'absolute',
  //         transformOrigin: 'left',
  //         width: '100%',
  //         height: '100%',
  //         top: '0',
  //         left: '0',
  //         backgroundColor: '#FFF',
  //         zIndex: 101,
  //       }}
  //     />
  //     <animated.div
  //       style={{
  //         ...bg2Spring,
  //         position: 'absolute',
  //         transformOrigin: 'left',
  //         width: '100%',
  //         height: '100%',
  //         top: '0',
  //         left: '0',
  //         backgroundColor: '#000',
  //         zIndex: 102,
  //       }}
  //     />
  //   </Box>
  // );
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
  });

  const bg2Spring = useSpring({
    transform: getTransform(show, direction, 2),
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
      pointerEvents='none'
      // visibility={show ? 'hidden' : 'visible'}
      // {...props}
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
