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
        <VStack bg="black" h="100%" spacing={0}>
          <HStack justifyContent="start" w="100%" p="6">
            <Text
              fontSize={{ base: "4rem", lg: "6rem" }}
              fontWeight="600"
              color="#747474"
              endColor="#FFF"
              colorDelay={1.5}
              textAlign="start"
              lineHeight={0.8}
              delay={0.6}
              timingGap={MOTION_TEXT_TIMING_GAP.medium}
              duration={2}
              show={show}
            >
              GLO
            </Text>
          </HStack>
          <HLine show={show} width={"100vw"} />

          <HStack spacing={0} p="4">
            <VStack spacing={1}>
              <Text
                fontSize={{ base: "4rem", lg: "1rem" }}
                fontWeight="300"
                color="#747474"
                textAlign="start"
                lineHeight={0.8}
                delay={0.6}
                timingGap={2}
                duration={2}
                show={show}
              >
                CLIENT
              </Text>
              <Filter
                effect="border"
                show={show}
                thickness={1}
                sides={{
                  bottom: { show: false },
                  left: { show: false },
                  right: { show: false },
                }}
                delay={1.3}
                lineColor="#747474"
                p="2"
              >
                <Text
                  fontSize={{ base: "4rem", lg: "1rem" }}
                  fontWeight="300"
                  color="#FFF"
                  lineHeight={0.8}
                  delay={0.9}
                  timingGap={MOTION_TEXT_TIMING_GAP.fast}
                  duration={2}
                  show={show}
                >
                  GLO
                </Text>
              </Filter>
            </VStack>
            <VStack spacing={1}>
              <Text
                fontSize={{ base: "4rem", lg: "1rem" }}
                fontWeight="300"
                color="#747474"
                textAlign="start"
                lineHeight={0.8}
                delay={0.6}
                timingGap={2}
                duration={2}
                show={show}
              >
                TYPE
              </Text>
              <Filter
                effect="border"
                show={show}
                thickness={1}
                sides={{
                  bottom: { show: false },
                  left: { show: false },
                  right: { show: false },
                }}
                delay={1.3}
                lineColor="#747474"
                p="2"
              >
                <Text
                  fontSize={{ base: "4rem", lg: "1rem" }}
                  fontWeight="300"
                  color="#FFF"
                  lineHeight={0.8}
                  delay={0.9}
                  timingGap={MOTION_TEXT_TIMING_GAP.fast}
                  duration={2}
                  show={show}
                >
                  WEB EXPERIENCE
                </Text>
              </Filter>
            </VStack>

            <VStack spacing={1}>
              <Text
                fontSize={{ base: "4rem", lg: "1rem" }}
                fontWeight="300"
                color="#747474"
                textAlign="start"
                lineHeight={0.8}
                delay={0.6}
                timingGap={2}
                duration={2}
                show={show}
              >
                DATE
              </Text>
              <Filter
                effect="border"
                show={show}
                thickness={1}
                sides={{
                  bottom: { show: false },
                  left: { show: false },
                  right: { show: false },
                }}
                delay={1.3}
                lineColor="#747474"
                p="2"
              >
                <Text
                  fontSize={{ base: "4rem", lg: "1rem" }}
                  fontWeight="300"
                  color="#FFF"
                  lineHeight={0.8}
                  delay={0.9}
                  timingGap={MOTION_TEXT_TIMING_GAP.fast}
                  duration={2}
                  show={show}
                >
                  2024
                </Text>
              </Filter>
            </VStack>

            <VStack spacing={1}>
              <Text
                fontSize={{ base: "4rem", lg: "1rem" }}
                fontWeight="300"
                color="#747474"
                textAlign="start"
                lineHeight={0.8}
                delay={0.6}
                timingGap={2}
                duration={2}
                show={show}
              >
                TAGS
              </Text>
              <Filter
                effect="border"
                show={show}
                thickness={1}
                sides={{
                  bottom: { show: false },
                  left: { show: false },
                  right: { show: false },
                }}
                delay={1.3}
                lineColor="#747474"
                p="2"
              >
                <Text
                  fontSize={{ base: "4rem", lg: "1rem" }}
                  fontWeight="300"
                  color="#FFF"
                  lineHeight={0.8}
                  delay={0.9}
                  timingGap={MOTION_TEXT_TIMING_GAP.fast}
                  duration={2}
                  show={show}
                >
                  PRODUCT, EXPERIENCE
                </Text>
              </Filter>
            </VStack>
          </HStack>

          <HStack>
       

            <Text
              fontSize={{ base: "4rem", lg: "1rem" }}
              fontWeight="200"
              // timingGap={MOTION_TEXT_TIMING_GAP.slow}
              // duration={2}
              color="#FFF"
              show={show}
              // endColor="red"
              // lineHeight={0.9}
              textAlign="left"
              width="400px"
              wordsPerParagraph={10}
              timingGap={2}
              delay={2}
              // onRenderLetter={(letter, { index }) => (
              //   <Filter show={show} blur={100} startColor="white" endColor="red" effect={index ==2 ?"color" : "none"}>{letter}</Filter>
              // )}
            >
              In the realm of luxury watches, every detail matters. Our latest
              project focused on creating a digital experience that mirrors the
              sophistication and precision of a high-end timepiece. By
              leveraging advanced web technologies, we crafted an immersive
              online showcase that brings the exquisite craftsmanship of luxury
              watches to life, offering a captivating and seamless user
              experience.
            </Text>


            <LoaderBox show={show} width={"300px"} height={"300px"} delay={3} >
              <Image
                src={ExampleImage}
                direction="right"
                width={"300px"}
                height={"300px"}
                // effect="breathing"
                show={show}
                delay={4}
              />
            </LoaderBox>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};
