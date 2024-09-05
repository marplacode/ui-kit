import { Text as CText, Box } from "@chakra-ui/react";
import { StaggerBox } from "@components/foundations/StaggerBox";
import { CUBIC_MOTION_FUNCTION_1 } from "@config/definitions";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { motion } from "framer-motion";
import { useCallback, useRef } from "react";

const MotionText = motion(CText);

export const MOTION_TEXT_TIMING_GAP = {
  slow: 20,
  medium: 10,
  fast: 1.2,
};

export const Text = ({
  children = "",
  direction = "top",
  show = true,
  showInView = false,
  timingGap = 0,
  delay = 0,
  animationDisabled = false,
  easingValues = CUBIC_MOTION_FUNCTION_1,
  letterSpacing = "0rem",
  onRenderLetter = undefined,
  wordsPerParagraph = undefined,
  color,
  endColor,
  colorDelay,
  // wordsTimingGap = 0,
  ...props
}: any) => {
  // const newChildren = children;
  // typeof children == "string"
  //   ? children.split("")
  //   : Array.isArray(children)
  //     ? children
  //     : null;
  // const {ref, size }  = useCalculateNodeSize({ formatToPixels: true})

  // console.log("CHILDRENN", children);
  const renderText = useCallback(
    (incomingChildren = [], { timingGap, textAlign, flexWrap }) => {
      // console.log('TIMING',timingGap)
      // console.log('INCOMIING CHLDREN',incomingChildren)
      return (
        <StaggerBox
          show={show}
          showInView={showInView}
          timingGap={timingGap}
          direction={direction}
          animationDisabled={animationDisabled}
          easingValues={easingValues}
          letterSpacing={letterSpacing}
          delay={delay}
          textAlign={textAlign}
          flexWrap={flexWrap ?? 'wrap'}
>
          {onRenderLetter
            ? incomingChildren.map((letter, index) =>
                onRenderLetter(
                  <MotionText padding={0} margin={0} {...props}>
                    {letter}
                  </MotionText>,
                  { letter, index }
                )
              )
            : incomingChildren.map((letter) => (
                <MotionText
                  padding={0}
                  margin={0}
                  initial={{ color }}
                  animate={{ color: show ? endColor : color }}
                  transition={{
                    delay: colorDelay ?? 0.3,
                    duration: 0.7,
                    ease: CUBIC_MOTION_FUNCTION_1,
                  }}
                  {...props}
                >
                  {letter == " " ? <>&nbsp;</> : letter}
                </MotionText>
              ))}
        </StaggerBox>
      );
    },
    [
      show,
      showInView,
      direction,
      animationDisabled,
      easingValues,
      letterSpacing,
      delay,
      props
    ]
  );

  if (children == null) {
    throw new Error("Children needs to be either array or string");
  }

  if (wordsPerParagraph) {
    const splitText = (text, wordsPerChunk) => {
      const words = text.split(" ");
      let result = [];
      for (let i = 0; i < words.length; i += wordsPerChunk) {
        result.push(words.slice(i, i + wordsPerChunk).join(" "));
      }
      return result;
    };

    return (
      <Box 
      // ref={ref}
      >
        {splitText(children, wordsPerParagraph).map((paragraph, index) =>
          renderText([paragraph.split("")], {
            timingGap: 0.05 + index * timingGap,
            textAlign: "justify",
            flexWrap: 'wrap'
          })
        )}
      </Box>
    );
  }

  return renderText(children.split(""), timingGap);
};
