import { Box } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { FC, useLayoutEffect, useMemo, useRef, useState } from "react";

export const Filter: FC<any> = ({
  children,
}) => {
 

  return (
    <div style={{"filter": "hue-rotate(90deg)"}}>
      {children}
    </div>
  );
};
