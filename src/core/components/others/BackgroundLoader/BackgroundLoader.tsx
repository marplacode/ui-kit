import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Box } from "@chakra-ui/react";
import { useSpring, animated } from "@react-spring/web";
import { SlidingSideVariation } from "./SlidingSideVariation";
import { ScalingVariation } from "./ScalingVariation";
import { FragmentedVariation } from "./FragmentedVariation";

const VARIATIONS: any = {
  sliding: SlidingSideVariation,
  scaling: ScalingVariation,
  fragmented: FragmentedVariation,
};

const MAX_REPEAT_AMOUNT = 2;

const useMaxZIndex = () => {
  const [maxZIndex, setMaxZIndex] = useState(0);

  useEffect(() => {
    const initTime = performance.now();
    const elements = document.getElementsByTagName("*");
    let maxZ = 0;

    for (let i = 0; i < elements.length; i++) {
      const zIndex = window.getComputedStyle(elements[i]).zIndex;
      if (zIndex !== "auto") {
        maxZ = Math.max(maxZ, parseInt(zIndex, 10));
      }
    }

    setMaxZIndex(maxZ);
    const endTime = performance.now();
    console.log("TIME CONSUME", endTime - initTime);
  }, []);

  return maxZIndex;
};

export interface BackgroundLoaderProps {
  as: string;
}

export const BackgroundLoader = forwardRef(
  (
    {
      show = true,
      initialShow = true,
      autoChange = true,
      delay = 2000,
      repeat = 2,
      variation = "sliding",
      onAnimationEnd = () => {},
      controls,
      // disabled: initDisabled = false,
      disabled = false,
      ...props
    }: any,
    ref: any
  ) => {
    // const [disabled, setDisabled] = useState(initDisabled)
    const [isLoaded, setIsLoaded] = useState(!initialShow);
    const maxIndex = useMaxZIndex();
    const [repeatCounter, setRepeatCounter] = useState(0);

    //  autochange logic
    useEffect(() => {
      const showHandler = () => {
        setIsLoaded((show) =>
          !autoChange || repeatCounter >= (repeat ?? MAX_REPEAT_AMOUNT)
            ? false
            : !show
        );
        setRepeatCounter(repeatCounter + 1);
      };
      //auto showing logic
      const autoChangeIntervalId = autoChange
        ? setInterval(showHandler, delay)
        : undefined;

      if (autoChangeIntervalId) return;

      if (!show) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }

      return () => {
        clearInterval(autoChangeIntervalId);
      };
    }, [show]);

    useEffect(() => {
      console.log('controls 11',controls)
      if (!controls) return () => {};
      controls.subscribe("show", () => {
        console.log('SHOOOOWWWWWW')
        setIsLoaded(false);
      });
      controls.subscribe("hide", () => {
        setIsLoaded(true);
      });
      // controls.subscribe("disable", () => {
      //   setDisabled(true);
      // });
    }, [controls]);

    const Variation = useMemo(() => VARIATIONS[variation], [variation]);

    return (
      // make it always at body DOM level
      ReactDOM.createPortal(
        <Variation
          show={isLoaded}
          disabled={disabled}
          zIndex={maxIndex}
          onAnimationEnd={() => {
            controls.dispatch('onAnimationEnd')
            onAnimationEnd({ isLoaded, metadata: controls.metadata.current })
          }
            
          }
          {...props}
        />,
        document.body
      )
    );
  }
);
