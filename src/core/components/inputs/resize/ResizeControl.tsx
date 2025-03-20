import React, { useEffect, useRef, useState } from "react";
import { Box } from "@components";

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

// const normalizePosition = (x: number, y: number) => {
//   return {
//     x: (x / window.innerWidth) * 2 - 1, // Normalize X to WebGL coordinates
//     y: 1 - (y / window.innerHeight) * 2, // Normalize Y and flip axis
//   };
// };
const normalizePosition = (x: number, y: number) => {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  return {
    x: (x / width) * 2, // Normalize X to [-1,1]
    y: (y / height) * 2, // Normalize Y to [-1,1] and flip axis
  };
};

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
    console.log('ROO')
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

    const normalizedPos = normalizePosition(
      position.current.x,
      position.current.y
    );
    
    const angleRad = () => Math.atan2(centerY - e.clientY, e.clientX - centerX); // In radians

    setResizeIndicatorAngle(angle);

    updateTransform();
    onChange({
      scale: scale.current,
      // rotation: rotation.current,
      rotation: angleRad(),
      position: normalizedPos,
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
    const rect = circleRef.current.parentElement?.getBoundingClientRect();
    
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    position.current = {
      x: clamp(position.current.x + deltaX, minPositionX, maxPositionX),
      y: clamp(position.current.y + deltaY, minPositionY, maxPositionY),
    };

    const normalizedPos = normalizePosition(
      position.current.x,
      position.current.y
    );
    
    dragStart.current = { x: e.clientX, y: e.clientY };
    updateTransform();



    // Call onChange with updated rotation during dragging
    onChange({
      scale: scale.current,
      rotation: rotation.current,
      // position: position.current,
      position: normalizedPos
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
