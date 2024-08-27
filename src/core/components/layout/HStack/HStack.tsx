import { HStack as CHStack } from "@chakra-ui/react";

export const HStack = ({ detectMobile = true, children, ...props }) => {
  return (
    <CHStack flexDirection={{ base: detectMobile ? "column" : "row", lg: "row" }} {...props}>
      {children}
    </CHStack>
  );
};
