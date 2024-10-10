import { HStack } from "@components/layout";
import { forwardRef } from "react";

export const HDStack: any = forwardRef<any>(
  ({ detectMobile = true, children, ...props }: any, ref) => {
    return (
      <HStack detectMobile={false} {...props} ref={ref}>
        {children}
      </HStack>
    );
  }
);
