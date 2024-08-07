import { Box, Image as CImage, Text as CText } from "@chakra-ui/react";
import {
  Filter,
  LoaderBox,
  MotionBox,
  StaggerBox,
} from "@components/foundations";
import { HStack, VStack } from "@components/layout";
import { HLine, VLine } from "@components/foundations/Line/Line";
import { Image, Video } from "@components/media";
import { MOTION_TEXT_TIMING_GAP, Text } from "@components/typography";
import { FC } from "react";
import ExampleImage from "../../../stories/assets/example.png";
import ExampleVideo from "../../../stories/assets/liquidd.mp4";

export const WorkCaseTemplateDefault: FC<any> = ({ ...rest }) => {
  const show = rest.show ? true : false;
  return (
    <VStack>
      <HStack>
        <VStack bg="black" h="100%">
          <HLine show={show} width={"100vw"} />

          <HStack>
            <Filter effect="border" show={show} thickness={1} delay={0.4}>
              <Box p="6">
                <Text
                  fontSize={{ base: "4rem", lg: "1rem" }}
                  fontWeight="300"
                  color="#FFF"
                  lineHeight={0.8}
                  delay={0.6}
                  timingGap={2}
                  duration={2}
                  show={show}
                >
                  CLIENT
                </Text>
              </Box>
            </Filter>
            
          </HStack>
        </VStack>

        <Text
          fontSize={{ base: "4rem", lg: "4rem" }}
          fontWeight="600"
          color="#FFF"
          // lineHeight={0.8}
          timingGap={MOTION_TEXT_TIMING_GAP.fast}
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
        color="#fff"
        endColor="#000"
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

      {/* <MotionBox direction="left" show={show} delay={1} width="100%">
        <Box h="2px" bg="white" minW="200" />
      </MotionBox> */}

      {/* <Filter effect={"border"} show={show}>
        <Box bg="red" h="20" w="20" />
      </Filter> */}

      <Filter effect={"border"} show={show}>
        <Text
          fontSize={{ base: "4rem", lg: "6rem" }}
          fontWeight="600"
          lineHeight={0.9}
          timingGap={MOTION_TEXT_TIMING_GAP.fast}
          duration={2}
          show={show}
        >
          M
        </Text>
      </Filter>
      <LoaderBox show={show}>
        <Image
          src={ExampleImage}
          direction="right"
          width={"300px"}
          height={"300px"}
          // effect="breathing"
          show={show}
          delay={0.5}
        />
      </LoaderBox>

      {/* <StaggerBox stackDirection="stack">
        <MotionBox show={show} direction="right" delay={0.39}>
          <Box
            bg="#FFF"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        <MotionBox show={show} direction="right" delay={0.6}>
          <Box
            bg="#c2c2c2"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        <MotionBox show={show} direction="right" delay={0.9}>
          <Box
            bg="#6e6e6e"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        
        <Filter effect={"border"} show={show}>
          <Video
            src={ExampleVideo}
            direction="right"
            width={"300px"}
            height={"300px"}
            // effect="breathing"
            show={show}
            delay={0.5}
          />
        </Filter>
      </StaggerBox>
       */}
    </VStack>
  );
};

export const WorkCaseTemplate: FC<any> = ({ ...rest }) => {
  const show = rest.show ? true : false;
  return (
    <VStack>
      <HStack>
        <Text
          fontSize={{ base: "4rem", lg: "4rem" }}
          fontWeight="600"
          timingGap={MOTION_TEXT_TIMING_GAP.fast}
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
        color="#fff"
        endColor="#000"
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

      {/* <MotionBox direction="left" show={show} delay={1} width="100%">
        <Box h="2px" bg="white" minW="200" />
      </MotionBox> */}

      {/* <Filter effect={"border"} show={show}>
        <Box bg="red" h="20" w="20" />
      </Filter> */}

      <Filter effect={"border"} show={show}>
        <Text
          fontSize={{ base: "4rem", lg: "6rem" }}
          fontWeight="600"
          lineHeight={0.9}
          timingGap={MOTION_TEXT_TIMING_GAP.fast}
          duration={2}
          show={show}
        >
          M
        </Text>
      </Filter>
      <LoaderBox show={show}>
        <Image
          src={ExampleImage}
          direction="right"
          width={"300px"}
          height={"300px"}
          // effect="breathing"
          show={show}
          delay={0.5}
        />
      </LoaderBox>

      {/* <StaggerBox stackDirection="stack">
        <MotionBox show={show} direction="right" delay={0.39}>
          <Box
            bg="#FFF"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        <MotionBox show={show} direction="right" delay={0.6}>
          <Box
            bg="#c2c2c2"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        <MotionBox show={show} direction="right" delay={0.9}>
          <Box
            bg="#6e6e6e"
            width={"300px"}
            height={"300px"}
            blendMode="difference"
          />
        </MotionBox>
        
        <Filter effect={"border"} show={show}>
          <Video
            src={ExampleVideo}
            direction="right"
            width={"300px"}
            height={"300px"}
            // effect="breathing"
            show={show}
            delay={0.5}
          />
        </Filter>
      </StaggerBox>
       */}
    </VStack>
  );
};
