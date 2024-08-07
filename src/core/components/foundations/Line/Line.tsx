import { MotionBox, Box } from "@components";
import { FC, useState } from "react";
import { MotionBoxProps } from "@types/HiddenBox";
import { useDebounce } from "@hooks/useDebounce";
import { useToggle } from "@hooks/useToggle";
import { formatUnit } from "@utils/formatUnit";

export const Line: FC<MotionBoxProps> = ({
  show,
  direction = "left",
  delay,
  thickness = 1,
  initialValues,
  ...props
}) => {
  // const { isToggled: hide, toggle } = useToggle(show)
  // const [W, setW] = useState(100)

  // useDebounce( ()=> {
  //   if(!show) {
  //     console.log('SHOWW',show)
  //     setW(0)
  //   }
  // }, 500, [show])

  return (
    <MotionBox direction={direction} show={show} delay={delay} initialValues={initialValues}>
      <Box
        h={direction == "left" || direction == "right" ? formatUnit(thickness) : "100%"}
        w={direction == "bottom" || direction == "top" ? formatUnit(thickness) : "100%"}
        bg="white"
        {...props}
      />
    </MotionBox>
  );
};

export const VLine = ({ ...props }) => {
  return <Line direction="bottom" {...props} />;
};
export const HLine = ({ ...props }) => {
  return <Line direction="left" {...props} />;
};
