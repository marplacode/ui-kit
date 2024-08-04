import { Box } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { FC, useLayoutEffect, useMemo, useRef, useState } from "react";
import { HiddenBoxProps } from "../../types/HiddenBox";

const MotionBox = motion(Box);

export const CUBIC_MOTION_FUNCTION_1 = [0.37, 0.23, 0, 1.01];
export const CUBIC_MOTION_FUNCTION_2 = [0.72, 0.08, 0, 1.05];
export const CUBIC_MOTION_FUNCTION_3 = [0.61, -0.01, 0, 0.99];
export const EASING_VALUES_1 = [0.38, -0.01, 0.58, 1];

const showPosition = { x: 0, y: 0 };

export const Filter: FC<any> = ({
  children,
}) => {
 

  return (
    <div style={{"filter": "hue-rotate(90deg)"}}>
      {children}
    </div>
  );
};
