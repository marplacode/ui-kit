import { Box, Stack, VStack } from "@chakra-ui/react";
import { Filter } from "@components/foundations";
import { Text } from "@components/typography";
import { MOTION_TEXT_TIMING_GAP } from "@components/typography";

export const ClientOverviewSection = ({ headers = [], show, ...props }) => {
  return (
    <Stack direction="row" justifyContent={"space-between"} w="100%" {...props}>

      {headers.map(({ title, description, ...props }, index) => (
        <VStack spacing={1}>
          {/* <Filter effect="border" height="20" width="20"> 
          <Box bg="red" w="20" h="20"/>
          </Filter> */}
          <Text
            fontSize={{ base: "1rem", lg: "2rem" }}
            fontWeight="300"
            color="#747474"
            // textAlign="start"
            // lineHeight={0.8}
            delay={1.5 + (index / 4)}
            timingGap={2}
            // duration={2}
            show={show}
          >
            {title}
          </Text>
          <Filter
            effect="border"
            show={show}
            thickness={1}
            // sides={{
            //   bottom: { show: false },
            //   left: { show: false },
            //   right: { show: false },
            // }}
            // delay={1.3 + (index / 4)}
            delay={1 + (index / 4)}
            lineColor="#747474"
            p="2"
          >
            <Text
              fontSize={{ base: "1rem", lg: "2rem" }}
              fontWeight="300"
              color="#FFF"
              lineHeight={0.8}
              // delay={0.9 + (index / 4)}
              delay={2.2 + (index / 4)}
              timingGap={MOTION_TEXT_TIMING_GAP.fast}
              duration={2}
              show={show}
            >
              {description}
            </Text>
          </Filter>
        </VStack>
      ))}
    </Stack>
  );
};
