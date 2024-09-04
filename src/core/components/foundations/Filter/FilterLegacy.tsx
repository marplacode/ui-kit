import { Box, LinkBox, position, styled, VStack } from "@chakra-ui/react";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { FilterComponentProps } from "@commonTypes/FilterComponent";
import { motion } from "framer-motion";
import { FC, useEffect, useMemo, useState } from "react";
import { BorderMarkFilter } from "./BorderMarkFilter";
import {
  CUBIC_MOTION_FUNCTION_1,
  CUBIC_MOTION_FUNCTION_3,
} from "@config/definitions";
import { config } from "@react-spring/web";

const AnimatedBox = motion(Box);

const DEFAULT_GRADIENT_CONFIG = {
  type: "linear",
  direction: "to bottom",
  color1: "rgba(1,1,1, 0)",
  color2: "rgba(0,0,0, 0.9)",
};

const getGradientType = (type, config = DEFAULT_GRADIENT_CONFIG) => {
  const gradients = {
    linear: `linear-gradient(${config.direction}, ${config.color1}, ${config.color2})`,
    radial: `radial-gradient(${config.color1}, ${config.color2})`,
  };
  return gradients[type ?? "radial"];
};

const shapes = {
  circle: "circle(50% at 50% 50%)",
  ellipse: "ellipse(50% 50% at 50% 50%)",
  polygon: "polygon(50% 0%, 0% 100%, 100% 100%)",
  inset: "inset(10% 20% 30% 40%)",
  // Add more shapes as needed
};

const effects = {
  breathing: {
    y: [0, -10, 0], // Adjust the y values for the up and down effect
    x: [0, 5, -5, 0], // Add slight horizontal movement
    // rotate: [0, 0.5, -0.5, 0],  // Add slight rotation
    // scale: [1, 1.05, 1],  // Add slight scaling
  },
};

const effectLayers: any = {
  'blur': () => (
    <Box
      position="absolute"
      w="100%"
      h="100%"
      backdropFilter="blur(6px)"
      // bg={getGradientType(config.gradient.type, config.gradient ?? DEFAULT_GRADIENT_CONFIG)}
    />
  ),
  "linear-gradient": ({config}) => (
    <Box
      position="absolute"
      w="100%"
      h="100%"
      bg={getGradientType(config.type, config ?? DEFAULT_GRADIENT_CONFIG)}
    />
  ),
};

/**
 * @description This component handles all kind of filters to apply on top of MotionBox
 * its useful when you want to overflow with a shape or color gradient
 * @param param0
 * @returns
 */
export const FilterLegacy: FC<FilterComponentProps & any> = ({
  shape = "none",
  effect = "none", // or ['linear-gradient', 'blur', '']
  disabled = false,
  CustomFilter = undefined,
  children,
  config = { gradient: DEFAULT_GRADIENT_CONFIG },
  ...props
}) => {
  const {
    ref,
    size: { width, height },
  } = useCalculateNodeSize();
  const enabledEffects = useMemo(() => {
    const effects = Array.isArray(effect) ? effect : [effect];

    const newEffects = Object.keys(effectLayers).reduce(
      (prev, current) =>
        effects.includes(current) ? [...prev, current] : [...prev],
      []
    );
    return newEffects
  }, [effect]);
  // const [enabledEffects, setEnabledEffects] = useState(Array.isArray(effect) ? effect : [effect])

  if (disabled) {
    return <>{children}</>;
  }

  if (CustomFilter) {
    return (
      <VStack ref={ref}>
        <Box position={"absolute"}>
          <CustomFilter {...props} {...{ width, height, ref }} />
        </Box>
        {children}
      </VStack>
    );
  }

  if (effect == "color") {
    return (
      <VStack ref={ref}>
        <ColorTransitionFilter {...props}>{children}</ColorTransitionFilter>
      </VStack>
    );
  }

  if (effect == "breathing") {
    return (
      <VStack ref={ref}>
        <BreathingEffect {...props}>{children}</BreathingEffect>
      </VStack>
    );
  }

  if (effect == "border") {
    return (
      <BorderMarkFilter
        width={width}
        height={height}
        childrenRef={ref}
        {...props}
      >
        {children}
      </BorderMarkFilter>
    );
  }

  if (effect == "linear-gradient") {
    // setEnabledEffects
    return (
      <Box position="relative" height="100%" width="100%">
        <Box
          position="absolute"
          w="100%"
          h="100%"
          bg={getGradientType(
            config.gradient.type,
            config.gradient ?? DEFAULT_GRADIENT_CONFIG
          )}
        />
        {children}
      </Box>
    );
  }

  if (effect == "radial-gradient") {
    return (
      <BorderMarkFilter
        width={width}
        height={height}
        childrenRef={ref}
        {...props}
      >
        {children}
      </BorderMarkFilter>
    );
  }

  const finalShape: any = shapes[shape] || "none";

  const [fake, setFake] = useState(false);
  useEffect(() => {
    setFake(fake!);
  }, [props.show]);

  return (
    <Box ref={ref} clipPath={finalShape} transition="ease-in" position="relative" height="100%" width="100%" {...props}>
      {enabledEffects.map( (name) => effectLayers[name]({ config: config.gradient }))}
      {children}
    </Box>
  );
};

const BreathingEffect = ({ children, ...props }) => {
  return (
    <motion.div
      animate={effects.breathing}
      transition={{
        duration: 4,
        ease: CUBIC_MOTION_FUNCTION_1,
        repeat: Infinity,
        repeatType: "mirror",
      }}
      style={{
        display: "inline-block",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const ColorTransitionFilter = ({
  blur,
  startColor,
  endColor,
  show,
  children,
  ...props
}) => {
  return (
    <AnimatedBox
      initial={{ filter: `blur(${blur}px)`, backgroundColor: startColor }}
      animate={{ backgroundColor: show ? endColor : startColor }}
      transition={{ duration: 1, ease: CUBIC_MOTION_FUNCTION_3 }}
      style={{ filter: `blur(${blur}px)` }}
      {...props}
    >
      {children}
    </AnimatedBox>
  );
};
