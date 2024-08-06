import { Box, Image as CImage, Text as CText } from "@chakra-ui/react";
import { Filter, MotionBox } from "@components/foundations";
import { HStack, VStack } from "@components/layout";
import { Image } from "@components/media";
import { MOTION_TEXT_TIMING_GAP, Text } from "@components/typography";
import { FC } from "react";
import ExampleImage from "../../../stories/assets/example.png";

export const WorkCaseTemplate: FC<any> = ({ ...rest }) => {
  const show = rest.show ? true : false;
  return (
    <VStack>
      <HStack>
        <Text
          fontSize={{ base: "4rem", lg: "4rem" }}
          fontWeight="600"
          timingGap={MOTION_TEXT_TIMING_GAP.slow}
          duration={2}
          show={show}
        >
          {rest.text}
        </Text>
        <Image
          src={ExampleImage}
          direction="right"
          width={300}
          height={300}
          effect="breathing"
          show={show}
        />
      </HStack>

      <Text
        fontSize={{ base: "4rem", lg: "1rem" }}
        fontWeight="600"
        timingGap={2}
        duration={2}
        show={show}
      >
        In the realm
      </Text>

      <Text
        fontSize={{ base: "4rem", lg: "1rem" }}
        fontWeight="600"
        // timingGap={MOTION_TEXT_TIMING_GAP.slow}
        // duration={2}
        color="white"
        show={show}
        endColor="red"
        // lineHeight={0.9}
        textAlign="left"
        width="400px"
        wordsPerParagraph={10}
        timingGap={2}
        // onRenderLetter={(letter, { index }) => (
        //   <Filter show={show} blur={100} startColor="white" endColor="red" effect={index ==2 ?"color" : "none"}>{letter}</Filter>
        // )}
      >
        In the realm of luxury watches, every detail matters. Our latest project
        focused on creating a digital experience that mirrors the sophistication
        and precision of a high-end timepiece. By leveraging advanced web
        technologies, we crafted an immersive online showcase that brings the
        exquisite craftsmanship of luxury watches to life, offering a
        captivating and seamless user experience.
      </Text>

      <CText textAlign="left">
        In the realm of luxury watches, every detail matters. Our latest project
        focused on creating a digital experience that mirrors the sophistication
        and precision of a high-end timepiece. <br />
        By leveraging advanced web technologies, <br />
        we crafted an immersive online showcase that brings the exquisite
        craftsmanship of luxury watches to life, <br />
        offering a captivating and seamless user experience.
      </CText>

      <MotionBox direction="left" show={show} delay={1} width="100%">
        <Box h="2px" bg="white" minW="200" />
      </MotionBox>
    </VStack>
  );
};
