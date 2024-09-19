import { Filter, MotionBox, StaggerBox } from "@components/foundations";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { getMotionProps } from "@utils/getMotionProps";
import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useHover } from "@hooks/useHover";
import {
  CUBIC_MOTION_FUNCTION_1,
  CUBIC_MOTION_FUNCTION_2,
  EASING_VALUES_1,
} from "@config/definitions";
import { motion } from "framer-motion";
import { useDebounce } from "@hooks/useDebounce";
import { MarplaCommonComponent } from "@commonTypes/MarplaCommonComponent";

interface IconProps extends MarplaCommonComponent {
  Icon: FC;
  href?: string;
  color?: string;
  endColor?: string;
  size?: string | number;
  colorDelay?: number;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const AnimatedLink: any = motion.a;
// Regular expression to validate hex colors (supports both shorthand and full format)
const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

// Validation function to ensure the color is in hex format
const isValidHexColor = (color: string) => hexColorRegex.test(color);

export const Icon: FC<IconProps> = ({
  Icon,
  color,
  endColor: initialEndColor,
  colorDelay = 0,
  target = "_blank",
  href = "",
  ...props
}) => {

  // Validate the colors before rendering
  if (initialEndColor !== undefined) {
    if (!isValidHexColor(color) || !isValidHexColor(initialEndColor)) {
      console.error(
        "Invalid hex color format. Please use valid hex codes like #FFF or #FFFFFF."
      );
      return null; // Do not render if the color format is invalid
    }
  }

  const { motionProps, rest } = getMotionProps(props);
  const { ref, isHovered } = useHover();
  const [reset, setReset] = useState(false);
  const { ref: sizeRef, size } = useCalculateNodeSize({
    formatToPixels: true,
  });
  const endColor = initialEndColor ?? color;
  const show = reset ? reset : isHovered || motionProps?.show;


  return (
    <Box cursor="pointer" ref={ref} w={size.width} h={size.height}>
      <StaggerBox stackDirection="stack" show={show}>
        <MotionBox
          {...motionProps}
          easingValues={CUBIC_MOTION_FUNCTION_2}
          duration={0.3}
          direction={isHovered ? "right" : "right"}
          show={show}
        >
          <AnimatedLink
            width={"100%"}
            cursor="pointer"
            initial={{ color }}
            animate={{ color: isHovered ? color : endColor }}
            transition={{
              duration: 0.5,
              ease: EASING_VALUES_1,
              delay: colorDelay,
            }}
            href={href}
            target={target}
          >
            <Box ref={sizeRef}>{<Icon {...rest} />}</Box>
          </AnimatedLink>
        </MotionBox>

        <MotionBox
          {...motionProps}
          easingValues={CUBIC_MOTION_FUNCTION_2}
          duration={0.3}
          direction={isHovered ? "left" : "right"}
          show={isHovered}
        >
          <AnimatedLink
            width={"100%"}
            cursor="pointer"
            initial={{ color: "white" }}
            transition={{
              duration: 0.5,
              ease: EASING_VALUES_1,
              delay: colorDelay,
            }}
            href={href}
            target={target}
          >
            {<Icon {...rest} />}
          </AnimatedLink>
        </MotionBox>
      </StaggerBox>
    </Box>
  );
};
