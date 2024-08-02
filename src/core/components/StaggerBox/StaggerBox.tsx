import { Box, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { HiddenBox } from "../HiddenBox";

export const StaggerBox = ({
  children,
  timingGap = 4,
  stackDirection = 'row',
  ...props
}) => {


  return (
    <Stack direction={stackDirection as any} >
    { children.map( (child,index) => <HiddenBox delay={0.05 + (index * (timingGap/100) )} {...props}>{child}</HiddenBox>) }
    </Stack>
  );
};
