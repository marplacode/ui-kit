
import React, { useState } from "react";
import { HDStack } from "../../layout/HDStack";
import { Box, VStack } from "@chakra-ui/react";
import { Gallery } from "./Gallery";
// import BoardShapeSvg from "../../../../stories/assets/board_shape_filled.svg";
// // @ts-ignore
import BoardShapeSvg from "@stories/assets/board_shape_filled.svg";
import DeckImage from "@stories/assets/deck2.png";

console.log('AAAA',BoardShapeSvg)
const Scene = (props: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setSelectedIndex(index);
  };

  const clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)"; // Example clip path

  return (
    <VStack w="100%">
      <Gallery 
      // images={props.images} {...props} 
      imageWidth={200}
      images={props.images}
      selectedIndex={selectedIndex}
      onChange={handleImageChange}
      svgClipPath={clipPath}
      />

    </VStack>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: any = {
  title: "Display/Gallery",
  component: Scene,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    // variation: { options: ['sliding','colorchange'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: (a: any) => console.log(a) },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: any = {
  args: {
    images: [
      {
        height: "213px",
        src: DeckImage,
        shape: BoardShapeSvg,
      },
      {
        height: "213px",
        src: DeckImage,
      },
      {
        height: "213px",
        src: "https://december.ar/cdn/shop/files/IMG_0720.jpg?v=1726678362",
      },
      {
        height: "213px",
        src: "https://december.ar/cdn/shop/files/IMG_0702.jpg?v=1726678362",
      },
      {
        height: "213px",
        src: "https://december.ar/cdn/shop/files/packaging2_2ce93127-deef-4fb0-9b36-02f781365ead.jpg?v=1720726232&width=2200",
      },
      {
        height: "213px",
        src: "https://december.ar/cdn/shop/files/IMG_0720.jpg?v=1726678362",
      },
    ],
    imageWidth:100,
    imageHeight:220,
    show:true,
    direction: 'column',
    imageShape: 'circle'
  },
};
