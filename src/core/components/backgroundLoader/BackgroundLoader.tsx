import { useEffect, useMemo, useState } from 'react';
import { Box } from  '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';
import { SlidingSideVariation } from './SlidingSideVariation';
import { ScalingVariation } from './ScalingVariation';
import { FragmentedVariation } from './FragmentedVariation';

const VARIATIONS:any = {
  'sliding': SlidingSideVariation,
  'scaling': ScalingVariation,
  'fragmented': FragmentedVariation
}

const MAX_REPEAT_AMOUNT = 2

export const BackgroundLoader = ({ show = true, autoChange = true, delay = 2000, repeat = 2, variation='sliding', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [repeatCounter, setRepeatCounter] = useState(0);

  useEffect(() => {
    const showHandler = () => {
      setIsLoaded((show)=> (!autoChange || repeatCounter >= (repeat ?? MAX_REPEAT_AMOUNT)) ? false : !show)
      setRepeatCounter(repeatCounter+1)
    }
    //auto showing logic
    const autoChangeIntervalId = autoChange ? setInterval(showHandler,delay) : undefined

    if(autoChangeIntervalId) return

    if (!show) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }

    return () => {
      clearInterval(autoChangeIntervalId)

    }
  }, [show]);


  const Variation = useMemo( () => VARIATIONS[variation],[variation]) 
    

  return (
    <Variation show={isLoaded} {...props} />
  );
};
