import { HStack as CHStack } from "@chakra-ui/react";

export const HStack = ({ children, ...props }) => {
  return (
    <CHStack flexDirection={{ base: "column", lg: "row" }} {...props}>
      {children}
    </CHStack>
  );
};
