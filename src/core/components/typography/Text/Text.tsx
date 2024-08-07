import { Text as CText } from "@chakra-ui/react";
import { CUBIC_MOTION_FUNCTION_1 } from "@components/foundations";
import { StaggerBox } from "@components/foundations/StaggerBox";
import { motion } from "framer-motion";
import { useCallback } from "react";


const MotionText = motion(CText)

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
  animationDisabled = false,
  easingValues = CUBIC_MOTION_FUNCTION_1,
  letterSpacing = "0rem",
  onRenderLetter = undefined,
  wordsPerParagraph = undefined,
  color,
  endColor,
  // wordsTimingGap = 0,
  ...props
}) => {
  // const newChildren = children;
  // typeof children == "string"
  //   ? children.split("")
  //   : Array.isArray(children)
  //     ? children
  //     : null;

  // console.log("CHILDRENN", children);
  const renderText = useCallback(
    (incomingChildren = [], timingGap) => {
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
        >
          {onRenderLetter
            ? incomingChildren.map((letter, index) =>
                onRenderLetter(
                  <CText padding={0} margin={0} {...props}>
                    {letter}
                  </CText>,
                  { letter, index }
                )
              )
            : incomingChildren.map((letter) => (
                <MotionText padding={0} margin={0} initial={{color}} animate={{ color: show ? endColor : color }} transition={{ delay: 0.3, duration: 0.7, ease: CUBIC_MOTION_FUNCTION_1 }} {...props}>
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

    return splitText(children, wordsPerParagraph).map( (paragraph, index) => renderText([paragraph.split("")], 0.05 + index * timingGap))
  }

  return renderText(children.split(""), timingGap);
};
