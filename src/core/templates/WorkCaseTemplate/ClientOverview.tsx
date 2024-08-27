import { Box, Stack, VStack } from "@chakra-ui/react";
import { Filter } from "@components/foundations";
import { Text } from "@components/typography";
import { MOTION_TEXT_TIMING_GAP } from "@components/typography";
import { useDebounce } from "@hooks/useDebounce";
import { useState } from "react";

export const ClientOverviewSection = ({ headers = [], show, delay= 1.5, filter = {}, fontSize = { base: "1rem", lg: "1.2rem" }, ...props }) => {
  const hasProps = (item) => (typeof item === "object" ? true : false);
  // const [show, setShow] = useState(!initialShow)

  // useDebounce(() => {
  //   // console.log('debounce ',initalShow)
  //   setShow(initialShow);
  // }, delay * 1000, [initialShow]);

  return (
    <Stack direction="row" justifyContent={"space-between"} w="100%" {...props}>
      {headers.map(({ title, description, ...props }, index) => (
        <VStack spacing={1}>
          {/* <Filter effect="border" height="20" width="20"> 
          <Box bg="red" w="20" h="20"/>
          </Filter> */}
          <Text
            fontSize={fontSize}
            fontWeight="300"
            color="#747474"
            // textAlign="start"
            // lineHeight={0.8}
            delay={delay + index / 4}
            timingGap={2}
            // duration={2}
            show={show}
            // {...(hasProps(title) ? title : {})}
          >
            {hasProps(title) ? title.text : title}
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
            delay={(delay / 2) + index / 2}
            lineColor="#747474"
            p="2"
            // {...filter}
          >
            <Text
              fontSize={fontSize}
              fontWeight="300"
              color="#FFF"
              lineHeight={0.8}
              // delay={0.9 + (index / 4)}
              delay={delay / 2.5 + index / 4}
              timingGap={MOTION_TEXT_TIMING_GAP.fast}
              duration={2}
              show={show}
              // {...(hasProps(description) ? description : {})}
            >
              {hasProps(description) ? description.text : description}
            </Text>
          </Filter>
        </VStack>
      ))}
    </Stack>
  );
};
