import { getMotionProps } from "@utils/getMotionProps";
import { MOTION_TEXT_TIMING_GAP, Text } from "@components/typography";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { HLine } from "@components";
import { useHover } from "@hooks/useHover";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";

export const Link = ({
  children = "",
  href = "",
  onClick = () => {},
  color = "rgb(26, 32, 44)",
  ...props
}: any) => {
  const { motionProps, rest } = getMotionProps(props);
  const { ref, isHovered } = useHover();
  const { size } = useCalculateNodeSize({ initialRef: ref });
  const show = isHovered
    ? false
    : motionProps?.show
      ? motionProps?.show
      : false;

  const onClickHandler = () => {
    onClick(href);
  };

  return (
    <VStack ref={ref} cursor="pointer" onClick={onClickHandler}>
      <Text
        timingGap={2}
        direction="bottom"
        {...rest}
        {...(isHovered ? {
          show,
        } : {
          showInView: motionProps?.showInView
        })}
        delay={show ? 0 : 1.2}
        color={color}
      >
        {children}
      </Text>
      <HStack justifyContent={"center"} width={size.width}>
        <HLine
          thickness={1}
          {...(isHovered ? {
            show,
          } : {
            showInView: motionProps?.showInView
          })}
          delay={show ? 1 : 0.5}
          bg={color}
        />
        <Box h="3">
          <Box w="3" transform={"rotate(45deg)"}>
            <HLine
              thickness={0.5}
              delay={show || motionProps?.showInView ? 1.5 : 0}
              {...(isHovered ? {
                show,
              } : {
                showInView: motionProps?.showInView
              })} 
              bg={color}
            />
          </Box>
          <Box transform={"translateY(6.8px) rotate(-45deg)"}>
            <HLine
              w="3"
              thickness={0.5}
              delay={show || motionProps?.showInView  ? 1.5 : 0}
              {...(isHovered ? {
                show,
              } : {
                showInView: motionProps?.showInView
              })}
              bg={color}
            />
          </Box>
        </Box>
      </HStack>
    </VStack>
  );
};
