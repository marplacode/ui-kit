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
// @ts-ignore
import ExampleImage from "@stories/assets/example.png";
// import ExampleVideo from "@stories/assets/liquidd.mp4";
// @ts-ignore
import ExampleVideo from "@stories/assets/liquidd.mp4";
import { ClientOverviewSection } from "./ClientOverview";

export const WorkCaseTemplateDefault: FC<any> = ({ ...rest }) => {
  const show = rest.show ? true : false;
  return (
    <VStack>
      <HStack>
        <VStack bg="black" h="100%" spacing={0} pb="60" pt="20">
          <HStack justifyContent="start" w="100%" p="8">
            <Text
              fontSize={{ base: "6rem", lg: "6rem" }}
              fontWeight="600"
              color="#747474"
              endColor="#FFF"
              colorDelay={2.5}
              textAlign="start"
              lineHeight={0.8}
              delay={1}
              timingGap={MOTION_TEXT_TIMING_GAP.medium}
              duration={2}
              show={show}
            >
              GLO
            </Text>
          </HStack>
          <HLine show={show} width={"100vw"} />

          <ClientOverviewSection
            headers={[
              { title: "CLIENT", description: "GLO" },
              { title: "DATE", description: "2024" },
              { title: "TYPE", description: "WEB EXPERIENCE" },
            ]}
            show={show}
            spacing={0}
            delay={8}
          />

          <VStack spacing="8">
            <HStack alignItems="start" w="100%">
              <Text
                fontSize={{ base: "3rem", lg: "4rem" }}
                fontWeight="100"
                color="#747474"
                endColor="#FFF"
                colorDelay={2}
                textAlign="start"
                delay={3}
                timingGap={MOTION_TEXT_TIMING_GAP.fast}
                duration={2}
                show={show}
              >
                The challenge
              </Text>
            </HStack>

            <HStack spacing="20">
              <Text
                fontSize={{ base: "1rem", lg: "2rem" }}
                fontWeight="200"
                color="#FFF"
                show={show}
                textAlign="left"
                width="400px"
                wordsPerParagraph={10}
                timingGap={2}
                delay={3.3}
              >
                In the realm of luxury watches, every detail matters. Our latest
                project focused on creating a digital experience that mirrors
                the sophistication and precision of a high-end timepiece. By
                leveraging advanced web technologies, we crafted an immersive
                online showcase that brings the exquisite craftsmanship of
                luxury watches to life, offering a captivating and seamless user
                experience.
              </Text>

              <LoaderBox
                show={show}
                showInView
                // width={300}
                // height={300}
                delay={2.5}
              >
                <Image
                  src={ExampleImage}
                  direction="right"
                  width={300}
                  height={300}
                  // width={"300px"}
                  // height={"300px"}
                  // effect="breathing"
                  show={show}
                  delay={3}
                />
              </LoaderBox>
            </HStack>

            <VStack>
              <Box h="20" />
            </VStack>

            <Text
              fontSize={{ base: "3rem", lg: "4rem" }}
              fontWeight="100"
              color="#747474"
              endColor="#FFF"
              colorDelay={1.5}
              timingGap={MOTION_TEXT_TIMING_GAP.fast}
              duration={2}
              showInView
              showOnce
            >
              Only once
            </Text>
            <HLine showInView />
            <Text
              fontSize={{ base: "1rem", lg: "2rem" }}
              fontWeight="200"
              color="#FFF"
              show={show}
              textAlign="left"
              width="400px"
              wordsPerParagraph={10}
              timingGap={2}
              delay={2}
            >
              In the realm of luxury watches, every detail matters. Our latest
              project focused on creating a digital experience that mirrors the
              sophistication and precision of a high-end timepiece. By
              leveraging advanced web technologies, we crafted an immersive
              online showcase that brings the exquisite craftsmanship of luxury
              watches to life, offering a captivating and seamless user
              experience.
            </Text>
          </VStack>
        </VStack>
      </HStack>
      {/* <Text
              fontSize={{ base: "6rem", lg: "6rem" }}
              fontWeight="600"
              color="#747474"
              endColor="#FFF"
              colorDelay={1.5}
              textAlign="start"
              lineHeight={0.8}
              delay={10}
              timingGap={MOTION_TEXT_TIMING_GAP.medium}
              duration={2}
              show={show}
            >
              GLO
            </Text> */}
    </VStack>
  );
};
