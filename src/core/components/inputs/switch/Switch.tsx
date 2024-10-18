import { HDStack } from "@components/layout";
import { CUBIC_MOTION_FUNCTION_1 } from "@config/definitions";
import { motion } from "framer-motion";

const AnimatedHStack:any = motion(HDStack);

export const Switch = ({
  value,
  size = 50,
  defaultValue = 0,
  delay = 0,
  endColor ='#1D1A1A',
  initialColor =  "#A3A3A3",
  onChange,
  ...rest
}) => {

  return (
    <AnimatedHStack
      cursor='pointer'
      borderRadius="100px"
      w={`calc(${size * 2}px)`}
      justifyContent="start"
      alignItems="center"
      borderWidth="0.5px"
      borderColor={initialColor}
      animate={{backgroundColor: value ? initialColor : endColor}}
      p="2px"
      onClick={onChange}
      {...rest}
    >
      <AnimatedHStack
        w={`${size}px`}
        h={`${size}px`}
        bg={'white'}
        borderRadius={"100px"}
        initial={{ x: 0 }}
        animate={{ x: value ? "90%" : 0 }}
        transition={{transition:CUBIC_MOTION_FUNCTION_1  }}

      />
    </AnimatedHStack>
  );
};
