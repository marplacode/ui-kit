import {
  Box,
  Slider as S,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useSpring, config as springConfig } from "react-spring";
import { useState } from "react";
import { HDStack } from "@components/layout";

export const Checkbox = ({
  value,
  defaultValue = 0,
  delay = 0,
  onChange,
  ...rest
}) => {
  // // auto animate slider
  // const [isAutoMove, setIsAutoMove] = useState(false)
  // const { value: springValue } = useSpring({
  //   value: autoMove ? moveTo : defaultValue,
  //   config: springConfig.slow,
  //   delay: delay * 1000,
  //   onChange: ({ value }) => {
  //     rest.onChange(value.value)
  //   },
  //   onStart: () => {
  //     setIsAutoMove(true)
  //   },
  //   onRest: () => {
  //     setIsAutoMove(false)
  //   },
  // })

  return (
    <HDStack
      borderRadius="30px"
      w="200px"
      justifyContent="start"
      alignItems="center"
    >
      <Box w="50px" h="50px" bg="black" borderRadius={"50px"} />
    </HDStack>
  );
};
