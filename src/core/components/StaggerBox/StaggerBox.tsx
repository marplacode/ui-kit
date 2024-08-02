import { Stack } from "@chakra-ui/react";
import { HiddenBox } from "../HiddenBox";

export const StaggerBox = ({
  children,
  timingGap = 4,
  stackDirection = 'row',
  letterSpacing,
  ...rest
}) => {

  return (
    <Stack direction={stackDirection as any} letterSpacing={letterSpacing} >
    { children.map( (child,index) => <HiddenBox delay={0.05 + (index * (timingGap/100) )} {...rest}>{child}</HiddenBox>) }
    </Stack>
  );
};
