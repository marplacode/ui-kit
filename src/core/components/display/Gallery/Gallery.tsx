import { VStack } from "@chakra-ui/react";
import { MotionBoxProps } from "@commonTypes/HiddenBox";
import { ArrowButton, HLine, HStack } from "@components";
import { StaggerBox, MotionBox, Box, Image, Text } from "@components";
import { useCalculateNodeSize } from "@hooks/useCalculateNodeSize";
import { useToggle } from "@hooks/useToggle";
import { PropsWithChildren, FC, useId, useRef } from "react";
import { HDStack } from "../../layout/HDStack";

export interface GaleryProps
  extends PropsWithChildren,
    Omit<MotionBoxProps, "direction"> {
  images: { src: string; width?: string; height?: string }[];
  direction?: string;
  itemWidth?: string;
  imageProps?: any;
  index?: number;
  onClick?: (index: number) => void;
}

const svgMask = (
  <rect
    // x="0.0488281"
    // y="0.87207"
    // width="69"
    // height="215"
    width="69"
    height="215"
    rx="34.5"

    // fill="none" // If you only want the border and not fill
  />
);

export const Gallery: FC<any> = ({
  index: initialIndex = 0,
  images = [],
  direction = "row",
  imageWidth = "200px",
  imageHeight = "300px",
  width = "300px",
  show,
  spacing = "2",
  imageShape = "",
  imageProps = {},
  selectedComponent = null,
  onClick,
}) => {
  const clipPathBorderId = useId()
  return (
    <HDStack
      overflowX={"scroll"}
      style={{ scrollbarWidth: "none" }}
      spacing={spacing}
      width={width}
      px="2"
    >
          {/* <svg width="100px" height="300px" style={{ position: "absolute" }}>
          <defs>
            <clipPath id={clipPathBorderId}>
              {svgMask}
            </clipPath>
          </defs>
        </svg> */}
      {images.map((image, index) => (
        <Box onClick={() => onClick(index)} position="relative">
          {/* <Box  w="100%" h="100%" bg="red" p="4"        
          borderRadius={"30px"}
> */}
   <MaskedBox svgMask={svgMask}    
              > 
             <Image
              direction="left"
              show={show}
              showInView
              showOnce
              src={image.src}
              width={imageWidth ? imageWidth : (image.width ?? "100%")}
              height={imageHeight ? imageHeight : (image.height ?? "100%")}
              fit="cover"
              {...imageProps}
            /> 
           </MaskedBox>
          {/* <Image
              direction="left"
              show={show}
              showInView
              showOnce
              src={image.src}
              width={imageWidth ? imageWidth : (image.width ?? "100%")}
              height={imageHeight ? imageHeight : (image.height ?? "100%")}
              fit="cover"
              {...imageProps}
            /> */}
          {/* </Box> */}
         
        </Box>
      ))}
    </HDStack>
  );
};

interface MaskedBoxProps extends PropsWithChildren {
  svgMask: React.ReactNode; // Accepts a JSX or ReactNode for the SVG
}

// examples of svgs
// const polygonClipPath = (
//   <polygon points="10,10 50,0 90,10 70,40 90,80 50,60 10,80 30,40" />
// );
const MaskedBox: FC<MaskedBoxProps> = ({
  svgMask,
  // selected,
  children,
  ...boxProps
}) => {
  // Generate a unique id for the clipPath
  const clipPathId = useId();
  const clipPathBorderId = useId();
  // const { ref, size } = useCalculateNodeSize();
  const { ref: svgRef, size } = useCalculateNodeSize();

  console.log("REFF", size);
  return (
    <Box>
     
      <Box
        {...boxProps}
        position="relative"
        sx={{
          clipPath: `url(#${clipPathId})`,
        }}
      >
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath ref={svgRef} id={clipPathId}>
              {svgMask}
            </clipPath>
          </defs>
        </svg>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
