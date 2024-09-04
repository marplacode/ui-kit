import { HStack as CHStack } from "@chakra-ui/react";
import { forwardRef } from "react";

export const HStack:any = forwardRef<any>(
  ({ detectMobile = true, children, ...props }:any, ref) => {
    return (
      <CHStack
        flexDirection={{ base: detectMobile ? "column" : "row", lg: "row" }}
        {...props}
        ref={ref}
      >
        {children}
      </CHStack>
    );
  }
);
