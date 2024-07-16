import { useEffect, useMemo, useState } from 'react';
import { Box } from  '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';
import { SlidingSideVariation } from './SlidingSideVariation';


const VARIATIONS:any = {
  'sliding': SlidingSideVariation
}
export const BackgroundLoader = ({ show = true, variation='sliding', ...props }) => {
  // const [isLoaded, setIsLoaded] = useState(false);


  // useEffect(() => {
  //   if (!isLoading) {
  //     setIsLoaded(true);
  //   } else {
  //     setIsLoaded(false);
  //   }
  // }, [isLoading]);


  // const bg1Spring = useSpring({
  //   transform: isLoaded ? 'translateY(-100%)' : 'translateY(0%)',
  //   config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) }, // Approximation of cubic-bezier(0,.89,.41,1)
  //   delay: 800,
  // });

  // const bg2Spring = useSpring({
  //   transform: isLoaded ? 'translateY(-100%)' : 'translateY(0%)',
  //   config: { duration: 1600, easing: t => (1 - (1 - t) ** 4) },
  //   delay: 500,
  // });

  // return (
  //   <Box
  //     position="fixed"
  //     top="0"
  //     left="0"
  //     width="100%"
  //     height="100%"
  //     zIndex="11"
  //     visibility={isLoaded ? 'hidden' : 'visible'}
  //     {...props}
  //   >
  //     <animated.div
  //       style={{
  //         ...bg1Spring,
  //         position: 'absolute',
  //         transformOrigin: 'top',
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
  //         transformOrigin: 'top',
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!show) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [show]);


  const Variation = useMemo( () => VARIATIONS[variation],[variation]) 
    
console.log(Variation)
  return (
    <Variation show={isLoaded} {...props} />
  );
};
