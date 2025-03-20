import React, { useEffect, useRef, useState } from "react";
import { Box } from "@marplacode/ui-kit";

interface ResizeControlProps {
  onChange: ({
    scale,
    rotation,
    position: { x, y },
  }: {
    scale: number;
    rotation: number;
    position: { x: number; y: number };
  }) => void;
  minScale?: number;
  maxScale?: number;
  minRotation?: number;
  maxRotation?: number;
  minPositionX?: number;
  maxPositionX?: number;
  minPositionY?: number;
  maxPositionY?: number;
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const getResizeCursor = (degrees: number): string => {
  degrees = ((degrees % 360) + 360) % 360;

  if (degrees >= 337.5 || degrees < 22.5) {
    return "ew-resize"; // East (right)
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return "nwse-resize"; // Northeast
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return "ns-resize"; // North (up)
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return "nesw-resize"; // Northwest
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return "ew-resize"; // West (left)
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return "nwse-resize"; // Southwest
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return "ns-resize"; // South (down)
  } else {
    return "nesw-resize"; // Southeast
  }
};

export const ResizeControl: React.FC<ResizeControlProps> = ({
  onChange,
  minScale = 0.1,
  maxScale = 10,
  minRotation = -360,
  maxRotation = 360,
  minPositionX = -Infinity,
  maxPositionX = Infinity,
  minPositionY = -Infinity,
  maxPositionY = Infinity,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const middleIndicatorRef = useRef<HTMLDivElement>(null);
  const resizeIndicatorRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const scale = useRef(1);
  const position = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const isRotating = useRef(false);
  const isScaling = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [resizeIndicatorAngle, setResizeIndicatorAngle] = useState(0);
  // const [isNearBorder, setIsNearBorder] = useState(false);
  const minActionDistance = 60;

  const toggleIndicator = (name, value = "1") => {
    if (name == "middle-dot") {
      middleIndicatorRef.current.style.opacity = value;
    }
    if (name == "resize-indicator") {
      resizeIndicatorRef.current.style.opacity = value;
    }
  };
  const setCursor = (type = 'grabbing') => {
      circleRef.current.style.cursor = type;
  };

  // Update transform properties directly using ref
  const updateTransform = () => {
    if (circleRef.current) {
      const hoverScale = isHovered.current ? 1.02 : 1; // Apply 2% scale on hover
      circleRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current * hoverScale})`;
    }
  };

  // Handle rotation
  const handleRotateStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isRotating.current = true;
    document.addEventListener("mousemove", handleRotateMove);
    document.addEventListener("mouseup", handleRotateEnd);
  };

  const handleRotateMove = (e: MouseEvent) => {
    if (!isRotating.current || !circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    // rotation.current = clamp(angle, minRotation, maxRotation);
    updateTransform();
    onChange({
      scale: scale.current,
      rotation: rotation.current,
      position: position.current,
    });
  };

  const handleRotateEnd = () => {
    isRotating.current = false;
    document.removeEventListener("mousemove", handleRotateMove);
    document.removeEventListener("mouseup", handleRotateEnd);
  };

  // Handle scaling
  const handleScaleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const { angle, nearBorder, nearCenter, distance } = getMeasurements(e);

    if (nearBorder) {
      isScaling.current = true;
      setCursor(getResizeCursor(angle))
      document.addEventListener("mousemove", handleScaleMove);
      document.addEventListener("mouseup", handleScaleEnd);
    } else {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      setCursor('grabbing')
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
    }
  };

  const handleScaleMove = (e: MouseEvent) => {
    if (!isScaling.current || !circleRef.current) return;

      const rect = circleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2
      );
      const angle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      
    scale.current = clamp(distance / (rect.width / 2), minScale, maxScale);
    
    rotation.current = angle;

    setResizeIndicatorAngle(angle);

    updateTransform();
    onChange({
      scale: scale.current,
      rotation: rotation.current,
      position: position.current,
    });
  };

  const handleScaleEnd = () => {
    isScaling.current = false;
    isDragging.current = false;
    document.removeEventListener("mousemove", handleScaleMove);
    document.removeEventListener("mouseup", handleScaleEnd);
  };

  // Handle dragging
  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    position.current = {
      x: clamp(position.current.x + deltaX, minPositionX, maxPositionX),
      y: clamp(position.current.y + deltaY, minPositionY, maxPositionY),
    };

    dragStart.current = { x: e.clientX, y: e.clientY };
    updateTransform();



    // Call onChange with updated rotation during dragging
    onChange({
      scale: scale.current,
      rotation: rotation.current,
      position: position.current,
    });
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  const getMeasurements = (e) => {
    if (!circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2
    );

    // const nearBorder = distance > rect.width / 2 - 10;
    // const nearBorder = distance >= rect.width / 2 - min&& distance <= rect.width / 2 ;
    const scale = clamp(distance / (rect.width / 2), minScale, maxScale);
    const nearBorder =
      distance >= rect.width / 2 - minActionDistance &&
      distance <= rect.width / 2;
    const nearCenter = distance <= rect.width / 6;
    const angle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    return { scale, angle, nearBorder, nearCenter, distance, centerX, centerY, width: rect.width, height: rect.height };
  };

  // Handle mouse move for resize indicator
  const handleMouseMove = (e: React.MouseEvent) => {
    const { angle, nearBorder, nearCenter, distance,width } = getMeasurements(e);
  
    // console.log({ nearBorder, distance, scale: scale.current, width });
    // setIsNearBorder(nearBorder);
    // setResizeIndicatorAngle(angle);




    if (nearCenter) {
      toggleIndicator("middle-dot", "1");
    } else {
      toggleIndicator("middle-dot", "0");
    }

    // rotation.current = angle
    // console.log('NEEEEARr',nearBorder)
    if (nearBorder) {
      toggleIndicator("resize-indicator", "1");
      resizeIndicatorRef.current.style.transform=`rotate(${angle}deg) translate(100px, 0)`
      circleRef.current.style.cursor = getResizeCursor(angle);
    } else {
      toggleIndicator("resize-indicator", "0");
      circleRef.current.style.cursor = "grab";
    }
  };

  // Handle hover
  const handleMouseEnter = () => {
    isHovered.current = true;
    // toggleIndicator('middle-dot', '1')
    // toggleIndicator('resize-indicator', '1')
    updateTransform();
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    // toggleIndicator('middle-dot', '0')
    // toggleIndicator('resize-indicator', '0')
    updateTransform();
  };

  return (
    <Box>
      <Box
        ref={circleRef}
        position="absolute"
        top="0"
        left="0"
        w="200px"
        h="200px"
        borderRadius="1000px"
        border="2px solid"
        borderColor="white"
        boxShadow="0 0 3px rgba(0, 0, 0, 0.5), inset 0 0 3px rgba(0, 0, 0, 0.5)"
        cursor={
          isRotating.current
            ? "grabbing"
            : isScaling.current
              ? getResizeCursor(resizeIndicatorAngle)
              : isDragging.current
                ? "grabbing"
                : "grab"
        }
        onMouseDown={handleScaleStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        sx={{
          willChange: "transform",
          transform: `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current})`,
          transformOrigin: "center",
          transition: "transform 0.1s ease",
        }}
      >
        {/* Middle Dot */}
        <Box
          ref={middleIndicatorRef}
          opacity={"0"}
          position="absolute"
          top="50%"
          left="50%"
          w="10px"
          h="10px"
          borderRadius="1000px"
          bg="white"
          boxShadow="0 0 6px rgba(0, 0, 0, 0.9)"
          transform="translate(-50%, -50%)"
          transition="all 0.3s ease"
          sx={{ zIndex: 1 }}
        />

        {/* Resize Indicator */}
          <Box
            ref={resizeIndicatorRef}
            opacity="0"
            position="absolute"
            top="50%"
            left="50%"
            w="5px"
            h="10px"
            bg="white"
            borderRadius="3px"
            boxShadow="0 0 3px rgba(0, 0, 0, 0.5)"
            // transform={`rotate(${resizeIndicatorAngle}deg) translate(100px, 0)`}
            transformOrigin="0 0"
            transition="all 0.3s ease"
            // transition="transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            sx={{ zIndex: 1 }}
          />
      </Box>
    </Box>
  );
};

// import React, { useRef, useEffect } from "react";
// import { Box } from "@marplacode/ui-kit";

// interface ResizeControlProps {
//   onChange: ({ scale, rotation, position: { x, y } }: { scale: number; rotation: number; position: { x: number; y: number } }) => void;
//   minScale?: number;
//   maxScale?: number;
//   minRotation?: number;
//   maxRotation?: number;
//   minPositionX?: number;
//   maxPositionX?: number;
//   minPositionY?: number;
//   maxPositionY?: number;
// }

// const clamp = (value: number, min: number, max: number): number => {
//   return Math.min(Math.max(value, min), max);
// };

// const getResizeCursor = (degrees: number): string => {
//   degrees = ((degrees % 360) + 360) % 360;

//   if (degrees >= 337.5 || degrees < 22.5) {
//     return "ew-resize"; // East (right)
//   } else if (degrees >= 22.5 && degrees < 67.5) {
//     return "nwse-resize"; // Northeast
//   } else if (degrees >= 67.5 && degrees < 112.5) {
//     return "ns-resize"; // North (up)
//   } else if (degrees >= 112.5 && degrees < 157.5) {
//     return "nesw-resize"; // Northwest
//   } else if (degrees >= 157.5 && degrees < 202.5) {
//     return "ew-resize"; // West (left)
//   } else if (degrees >= 202.5 && degrees < 247.5) {
//     return "nwse-resize"; // Southwest
//   } else if (degrees >= 247.5 && degrees < 292.5) {
//     return "ns-resize"; // South (down)
//   } else {
//     return "nesw-resize"; // Southeast
//   }
// };

// export const ResizeControl: React.FC<ResizeControlProps> = ({
//   onChange,
//   minScale = 0.1,
//   maxScale = 10,
//   minRotation = -360,
//   maxRotation = 360,
//   minPositionX = -Infinity,
//   maxPositionX = Infinity,
//   minPositionY = -Infinity,
//   maxPositionY = Infinity,
// }) => {
//   const circleRef = useRef<HTMLDivElement>(null);
//   const middleIndicatorRef = useRef<HTMLDivElement>(null);
//   const resizeIndicatorRef = useRef<HTMLDivElement>(null);
//   const rotation = useRef(0);
//   const scale = useRef(1);
//   const position = useRef({ x: 0, y: 0 });
//   const isHovered = useRef(false);
//   const isRotating = useRef(false);
//   const isScaling = useRef(false);
//   const isDragging = useRef(false);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const resizeIndicatorAngle = useRef(0);
//   const minActionDistance = 40;

//   // Update transform properties directly using ref
//   const updateTransform = () => {
//     if (circleRef.current) {
//       const hoverScale = isHovered.current ? 1.02 : 1; // Apply 2% scale on hover
//       circleRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current * hoverScale})`;
//     }
//   };

//   // Update resize indicator position based on mouse angle and scaled radius
//   const updateResizeIndicator = (e: React.MouseEvent | MouseEvent) => {
//     if (!circleRef.current || !resizeIndicatorRef.current) return;

//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;

//     // Calculate mouse angle relative to circle center
//     const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
//     resizeIndicatorAngle.current = angle * (180 / Math.PI);

//     // Calculate scaled radius
//     const baseRadius = rect.width / 2; // Base radius (unscaled)
//     const scaledRadius = baseRadius// * scale.current; // Adjust radius based on scale

//     // Calculate position on circumference
//     const x = Math.cos(angle) * scaledRadius;
//     const y = Math.sin(angle) * scaledRadius;

//     // Position the resize indicator
//     resizeIndicatorRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${resizeIndicatorAngle.current}deg)`;
//   };

//   // Handle rotation
//   const handleRotateStart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     isRotating.current = true;
//     document.addEventListener("mousemove", handleRotateMove);
//     document.addEventListener("mouseup", handleRotateEnd);
//   };

//   const handleRotateMove = (e: MouseEvent) => {
//     if (!isRotating.current || !circleRef.current) return;

//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

//     rotation.current = clamp(angle, minRotation, maxRotation);
//     updateTransform();
//     updateResizeIndicator(e);
//     onChange({ scale: scale.current, rotation: rotation.current, position: position.current });
//   };

//   const handleRotateEnd = () => {
//     isRotating.current = false;
//     document.removeEventListener("mousemove", handleRotateMove);
//     document.removeEventListener("mouseup", handleRotateEnd);
//   };

//   // Handle scaling
//   const handleScaleStart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const rect = circleRef.current?.getBoundingClientRect();
//     if (!rect) return;

//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

//     if (distance > rect.width / 2 - minActionDistance) {
//       isScaling.current = true;
//       document.addEventListener("mousemove", handleScaleMove);
//       document.addEventListener("mouseup", handleScaleEnd);
//     } else {
//       isDragging.current = true;
//       middleIndicatorRef.current.style.opacity = "1";
//       dragStart.current = { x: e.clientX, y: e.clientY };
//       document.addEventListener("mousemove", handleDragMove);
//       document.addEventListener("mouseup", handleDragEnd);
//     }
//   };

//   const handleScaleMove = (e: MouseEvent) => {
//     if (!isScaling.current || !circleRef.current) return;

//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

//     scale.current = clamp(distance / (rect.width / 2), minScale, maxScale);
//     updateTransform();
//     updateResizeIndicator(e);
//     onChange({ scale: scale.current, rotation: rotation.current, position: position.current });
//   };

//   const handleScaleEnd = () => {
//     isScaling.current = false;
//     document.removeEventListener("mousemove", handleScaleMove);
//     document.removeEventListener("mouseup", handleScaleEnd);
//   };

//   // Handle dragging
//   const handleDragMove = (e: MouseEvent) => {
//     if (!isDragging.current) return;

//     const deltaX = e.clientX - dragStart.current.x;
//     const deltaY = e.clientY - dragStart.current.y;

//     position.current = {
//       x: clamp(position.current.x + deltaX, minPositionX, maxPositionX),
//       y: clamp(position.current.y + deltaY, minPositionY, maxPositionY),
//     };

//     dragStart.current = { x: e.clientX, y: e.clientY };
//     updateTransform();
//     updateResizeIndicator(e);
//     onChange({ scale: scale.current, rotation: rotation.current, position: position.current });
//   };

//   const handleDragEnd = () => {
//     isDragging.current = false;
//     middleIndicatorRef.current.style.opacity = "0";
//     document.removeEventListener("mousemove", handleDragMove);
//     document.removeEventListener("mouseup", handleDragEnd);
//   };

//   // Handle mouse move for resize indicator
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!circleRef.current) return;

//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
//     const nearBorder = distance >= rect.width / 2 - minActionDistance && distance <= rect.width / 2;
//     const nearCenter = distance <= rect.width / 6;

//     if (nearCenter) {
//       middleIndicatorRef.current.style.opacity = "1";
//     } else {
//       middleIndicatorRef.current.style.opacity = "0";
//     }

//     if (nearBorder) {
//       resizeIndicatorRef.current.style.opacity = "1";
//       circleRef.current.style.cursor = getResizeCursor(resizeIndicatorAngle.current);
//     } else {
//       resizeIndicatorRef.current.style.opacity = "0";
//       circleRef.current.style.cursor = "grab";
//     }

//     updateResizeIndicator(e);
//   };

//   // Handle hover
//   const handleMouseEnter = () => {
//     isHovered.current = true;
//     updateTransform();
//   };

//   const handleMouseLeave = () => {
//     isHovered.current = false;
//     updateTransform();
//   };

//   // Cleanup event listeners
//   useEffect(() => {
//     return () => {
//       document.removeEventListener("mousemove", handleRotateMove);
//       document.removeEventListener("mouseup", handleRotateEnd);
//       document.removeEventListener("mousemove", handleScaleMove);
//       document.removeEventListener("mouseup", handleScaleEnd);
//       document.removeEventListener("mousemove", handleDragMove);
//       document.removeEventListener("mouseup", handleDragEnd);
//     };
//   }, []);

//   return (
//     <Box>
//       <Box
//         ref={circleRef}
//         position="absolute"
//         top="0"
//         left="0"
//         w="200px"
//         h="200px"
//         borderRadius="1000px"
//         border="2px solid"
//         borderColor="white"
//         boxShadow="0 0 3px rgba(0, 0, 0, 0.5), inset 0 0 3px rgba(0, 0, 0, 0.5)"
//         cursor={isRotating.current ? "grabbing" : isScaling.current ? getResizeCursor(resizeIndicatorAngle.current) : isDragging.current ? "grabbing" : "grab"}
//         onMouseDown={handleScaleStart}
//         onMouseMove={handleMouseMove}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         sx={{
//           willChange: "transform",
//           transform: `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current})`,
//           transformOrigin: "center",
//           transition: "transform 0.1s ease",
//         }}
//       >
//         {/* Middle Dot */}
//         <Box
//           ref={middleIndicatorRef}
//           position="absolute"
//           top="50%"
//           left="50%"
//           w="10px"
//           h="10px"
//           borderRadius="1000px"
//           bg="white"
//           boxShadow="0 0 6px rgba(0, 0, 0, 0.9)"
//           transform="translate(-50%, -50%)"
//           transition="all 0.3s ease"
//           sx={{ zIndex: 1 }}
//         />

//         {/* Resize Indicator */}
//         <Box
//           ref={resizeIndicatorRef}
//           className="resize-indicator"
//           position="absolute"
//           top="50%"
//           left="50%"
//           w="5px"
//           h="20px"
//           bg="white"
//           borderRadius="3px"
//           boxShadow="0 0 3px rgba(0, 0, 0, 0.5)"
//           transform={`rotate(${resizeIndicatorAngle.current}deg)`}
//           transformOrigin="0 0"
//           transition="transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
//           sx={{ zIndex: 1 }}
//         />
//       </Box>
//     </Box>
//   );
// };

// import React, { useRef, useEffect, useMemo } from "react";
// import { Box } from "@marplacode/ui-kit";
// import { useClickOutside } from "@hooks/useClickOutside";

// interface ResizeControlProps {
//   onChange: ({ scale, rotation, position: { x, y } }: { scale: number; rotation: number; position: { x: number; y: number } }) => void;
//   minScale?: number;
//   maxScale?: number;
//   minRotation?: number;
//   maxRotation?: number;
//   minPositionX?: number;
//   maxPositionX?: number;
//   minPositionY?: number;
//   maxPositionY?: number;
// }

// const clamp = (value: number, min: number, max: number): number => {
//   return Math.min(Math.max(value, min), max);
// };

// const getResizeCursor = (degrees: number): string => {
//   degrees = ((degrees % 360) + 360) % 360;

//   if (degrees >= 337.5 || degrees < 22.5) {
//     return "ew-resize"; // East (right)
//   } else if (degrees >= 22.5 && degrees < 67.5) {
//     return "nwse-resize"; // Northeast
//   } else if (degrees >= 67.5 && degrees < 112.5) {
//     return "ns-resize"; // North (up)
//   } else if (degrees >= 112.5 && degrees < 157.5) {
//     return "nesw-resize"; // Northwest
//   } else if (degrees >= 157.5 && degrees < 202.5) {
//     return "ew-resize"; // West (left)
//   } else if (degrees >= 202.5 && degrees < 247.5) {
//     return "nwse-resize"; // Southwest
//   } else if (degrees >= 247.5 && degrees < 292.5) {
//     return "ns-resize"; // South (down)
//   } else {
//     return "nesw-resize"; // Southeast
//   }
// };

// export const ResizeControl: React.FC<ResizeControlProps> = ({
//   onChange,
//   minScale = 0.1,
//   maxScale = 10,
//   minRotation = -360,
//   maxRotation = 360,
//   minPositionX = -Infinity,
//   maxPositionX = Infinity,
//   minPositionY = -Infinity,
//   maxPositionY = Infinity,
// }) => {
//   const circleRef = useRef<HTMLDivElement>(null);
//   const middleIndicatorRef = useRef<HTMLDivElement>(null);
//   const resizeIndicatorRef = useRef<HTMLDivElement>(null);
//   const rotation = useRef(0);
//   const scale = useRef(1);
//   const position = useRef({ x: 0, y: 0 });
//   const isHovered = useRef(false);
//   const isRotating = useRef(false);
//   const isScaling = useRef(false);
//   const isDragging = useRef(false);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const resizeIndicatorAngle = useRef(0);
//   const minActionDistance = 40;
//   // const minActionDistance = 60;
//   // useClickOutside({ refs: [circleRef] }, () => {

//   // })

//   // Update transform properties directly using ref
//   const updateTransform = () => {
//     if (circleRef.current) {
//       circleRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current})`;
//     }
//   };

//   // Handle rotation
//   const handleRotateStart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     isRotating.current = true;
//     document.addEventListener("mousemove", handleRotateMove);
//     document.addEventListener("mouseup", handleRotateEnd);
//   };

//   const handleRotateMove = (e: MouseEvent) => {
//     if (!isRotating.current || !circleRef.current) return;

// console.log('ROOOTAAA')
//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

//     rotation.current = clamp(angle, minRotation, maxRotation);
//     updateTransform();
//     onChange({ scale: scale.current, rotation: rotation.current, position: position.current });
//   };

//   const handleRotateEnd = () => {
//     isRotating.current = false;
//     document.removeEventListener("mousemove", handleRotateMove);
//     document.removeEventListener("mouseup", handleRotateEnd);
//   };

//   // Handle scaling
//   const handleScaleStart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const rect = circleRef.current?.getBoundingClientRect();
//     if (!rect) return;

//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

//     if (distance > rect.width / 2 - minActionDistance) {
//       isScaling.current = true;
//       document.addEventListener("mousemove", handleScaleMove);
//       document.addEventListener("mouseup", handleScaleEnd);
//     } else {
//       isDragging.current = true;
//       middleIndicatorRef.current.style.opacity = '1'
//       dragStart.current = { x: e.clientX, y: e.clientY };
//       document.addEventListener("mousemove", handleDragMove);
//       document.addEventListener("mouseup", handleDragEnd);
//     }
//   };

//   const handleScaleMove = (e: MouseEvent) => {
//     if (!isScaling.current || !circleRef.current) return;

//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
//     const angle =  Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

//     scale.current = clamp(distance / (rect.width / 2), minScale, maxScale);
//     resizeIndicatorAngle.current = angle
//     resizeIndicatorRef.current.style.transform = `rotate(${resizeIndicatorAngle.current}deg) translate(100px, 0)`

//     // resizeIndicatorRef.current.style.transform
//     updateTransform();
//     onChange({ scale: scale.current, rotation: rotation.current, position: position.current });
//   };

//   const handleScaleEnd = () => {
//     isScaling.current = false;
//     document.removeEventListener("mousemove", handleScaleMove);
//     document.removeEventListener("mouseup", handleScaleEnd);
//   };

//   // Handle dragging
//   const handleDragMove = (e: MouseEvent) => {
//     if (!isDragging.current) return;

//     const deltaX = e.clientX - dragStart.current.x;
//     const deltaY = e.clientY - dragStart.current.y;

//     position.current = {
//       x: clamp(position.current.x + deltaX, minPositionX, maxPositionX),
//       y: clamp(position.current.y + deltaY, minPositionY, maxPositionY),
//     };

//     // resizeIndicatorRef.current.style.opacity = '0'

//     dragStart.current = { x: e.clientX, y: e.clientY };
//     updateTransform();
//     onChange({ scale: scale.current, rotation: rotation.current, position: position.current });
//   };

//   const handleDragEnd = () => {
//     // resizeIndicatorRef.current.style.opacity = '1'
//     isDragging.current = false;
//     middleIndicatorRef.current.style.opacity = '0'
//     document.removeEventListener("mousemove", handleDragMove);
//     document.removeEventListener("mouseup", handleDragEnd);
//   };

//   // Handle mouse move for resize indicator
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!circleRef.current) return;

//     const rect = circleRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
//     const nearBorder = distance >= rect.width / 2 - minActionDistance && distance <= rect.width / 2 ;
//     const nearCenter = distance <= rect.width / 6;
//     // const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
//     const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
//     resizeIndicatorAngle.current = angle

//     rotation.current = angle
//     console.log('closeee',distance)

//     resizeIndicatorRef.current.style.transform = `rotate(${resizeIndicatorAngle.current}deg) translate(${rect.width / 2}px, 0)`
//     // circleRef.current.style.transform = 'scale(1.2)'
//     // resizeIndicatorRef.current.style.opacity = '1'

//     if(nearCenter) {
//       middleIndicatorRef.current.style.opacity = '1'
//     } else {
//       middleIndicatorRef.current.style.opacity = '0'
//     }

//     if (nearBorder) {
//       resizeIndicatorRef.current.style.opacity = '1'
//       circleRef.current.style.cursor = getResizeCursor(resizeIndicatorAngle.current);
//     } else {
//       resizeIndicatorRef.current.style.opacity = '0'
//       circleRef.current.style.cursor = "grab";
//     }
//   };

//   // Cleanup event listeners
//   useEffect(() => {
//     return () => {
//       // document.removeEventListener("mousemove", handleRotateMove);
//       // document.removeEventListener("mouseup", handleRotateEnd);
//       // document.removeEventListener("mousemove", handleScaleMove);
//       // document.removeEventListener("mouseup", handleScaleEnd);
//       // document.removeEventListener("mousemove", handleDragMove);
//       // document.removeEventListener("mouseup", handleDragEnd);
//     };
//   }, []);

//   return (
//     <Box>
//       <Box
//         ref={circleRef}
//         position="absolute"
//         top="0"
//         left="0"
//         w="200px"
//         h="200px"
//         borderRadius="1000px"
//         border="2px solid"
//         borderColor="white"
//         boxShadow="0 0 3px rgba(0, 0, 0, 0.5), inset 0 0 3px rgba(0, 0, 0, 0.5)"
//         cursor={isRotating.current ? "grabbing" : isScaling.current ? getResizeCursor(resizeIndicatorAngle.current) : isDragging.current ? "grabbing" : "grab"}
//         onMouseDown={handleScaleStart}
//         onMouseMove={handleMouseMove}
//         sx={{
//           willChange: "transform",
//           transform: `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current})`,
//           transformOrigin: "center",
//           transition: "transform 0.1s ease",
//         }}
//         // bg="red"
//       >
//         {/* Middle Dot */}
//         <Box
//           ref={middleIndicatorRef}
//           position="absolute"
//           top="50%"
//           left="50%"
//           w="10px"
//           h="10px"
//           borderRadius="1000px"
//           bg="white"
//           boxShadow="0 0 6px rgba(0, 0, 0, 0.9)"
//           transform="translate(-50%, -50%)"
//           transition="all 0.3s ease"
//           sx={{ zIndex: 1 }}
//         />

//         {/* Resize Indicator */}
//         <Box
//           // opacity={isNearBorder ? 1 : 0}
//           ref={resizeIndicatorRef}
//           className="resize-indicator"
//           position="absolute"
//           top="50%"
//           left="50%"
//           w="8px"
//           h="30px"
//           bg="white"
//           // opacity={0}
//           borderRadius="3px"
//           boxShadow="0 0 3px rgba(0, 0, 0, 0.5)"
//           transform={`rotate(${resizeIndicatorAngle.current}deg) translate(100px, px)`}
//           transformOrigin="0 0"
//           transition="transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
//           sx={{ zIndex: 1 }}
//         />
//       </Box>
//     </Box>
//   );
// };
