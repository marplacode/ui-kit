import React, { useRef, useState } from "react";
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
  position?: { x: number; y: number };
  minScale?: number;
  maxScale?: number;
  minRotation?: number;
  maxRotation?: number;
  minPositionX?: number;
  maxPositionX?: number;
  minPositionY?: number;
  maxPositionY?: number;
}

const normalizePosition = (x: number, y: number) => {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  return {
    x: (x / width) * 2,
    y: (y / height) * 2,
  };
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const getResizeCursor = (degrees: number): string => {
  degrees = ((degrees % 360) + 360) % 360;

  if (degrees >= 337.5 || degrees < 22.5) {
    return "ew-resize";
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return "nwse-resize";
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return "ns-resize";
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return "nesw-resize";
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return "ew-resize";
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return "nwse-resize";
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return "ns-resize";
  } else {
    return "nesw-resize";
  }
};


// Update getAngle helper (used in touch handling)
const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
  // Flip Y-axis for clockwise rotation
  return Math.atan2(y1 - y2, x2 - x1) * 180 / Math.PI;
};


const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

  // Add this helper function at the top of your component
  const getClockwiseAngle = (centerX: number, centerY: number, pointX: number, pointY: number) => {
    // Flip the Y-axis (subtract from centerY) to make rotation clockwise
    const deltaX = pointX - centerX;
    const deltaY = centerY - pointY; // Note: This is inverted from standard atan2
    
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
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
  position: initialPosition = {x:0,y: 0}
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
  const minActionDistance = 60;

  // Touch gesture state
  const initialTouchDistance = useRef(0);
  const initialTouchAngle = useRef(0);
  const initialTouchScale = useRef(1);
  const initialTouchRotation = useRef(0);
  const initialTouchPosition = useRef({ x: 0, y: 0 });
  const touchCenter = useRef({ x: 0, y: 0 });
  const isTouchDragging = useRef(false);

  const toggleIndicator = (name, value = "1") => {
    if (name == "middle-dot" && middleIndicatorRef.current) {
      middleIndicatorRef.current.style.opacity = value;
    }
    if (name == "resize-indicator" && resizeIndicatorRef.current) {
      resizeIndicatorRef.current.style.opacity = value;
    }
  };
  
  const setCursor = (type = 'grabbing') => {
    if (circleRef.current) {
      circleRef.current.style.cursor = type;
    }
  };

  const updateTransform = () => {
    if (circleRef.current) {
      const hoverScale = isHovered.current ? 1.02 : 1;
      circleRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current * hoverScale})`;
    }
  };

  const updateResizeIndicator = (angle: number) => {
    setResizeIndicatorAngle(angle);
    if (resizeIndicatorRef.current) {
      // Apply the rotation relative to the current element rotation
      resizeIndicatorRef.current.style.transform = `rotate(${angle}deg) translate(100px, 0)`;
    }
  };

  const handleRotateEnd = () => {
    isRotating.current = false;
    document.removeEventListener("mousemove", handleRotateMove);
    document.removeEventListener("mouseup", handleRotateEnd);
  };

  const handleScaleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const { angle, nearBorder, nearCenter } = getMeasurements(e);

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

  const handleScaleEnd = () => {
    isScaling.current = false;
    isDragging.current = false;
    document.removeEventListener("mousemove", handleScaleMove);
    document.removeEventListener("mouseup", handleScaleEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const { angleRad } = getMeasurements(e)
    
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    position.current = {
      x: clamp(position.current.x + deltaX, minPositionX, maxPositionX),
      y: clamp(position.current.y + deltaY, minPositionY, maxPositionY),
    };

    const normalizedPos = normalizePosition(position.current.x, position.current.y);
    dragStart.current = { x: e.clientX, y: e.clientY };

    updateTransform();

    onChange({
      scale: scale.current,
      // rotation: angleRad,
      rotation: rotation.current * (Math.PI / 180), // Convert to radians
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
    const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

    const nearBorder = distance >= rect.width / 2 - minActionDistance && distance <= rect.width / 2;
    const nearCenter = distance <= rect.width / 6;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    const angleRad = Math.atan2(centerY - e.clientY, e.clientX - centerX);

    return { angle, angleRad, nearBorder, nearCenter, distance, centerX, centerY, width: rect.width };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { angle, nearBorder, nearCenter } = getMeasurements(e);
  
    if (nearCenter) {
      toggleIndicator("middle-dot", "1");
    } else {
      toggleIndicator("middle-dot", "0");
    }

    if (nearBorder) {
      toggleIndicator("resize-indicator", "1");
      updateResizeIndicator(angle);
      setCursor(getResizeCursor(angle));
    } else {
      toggleIndicator("resize-indicator", "0");
      setCursor("grab");
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    updateTransform();
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    updateTransform();
  };


// Update handleRotateMove
const handleRotateMove = (e: MouseEvent) => {
  if (!isRotating.current || !circleRef.current) return;

  const rect = circleRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Use clockwise angle calculation
  const angle = getClockwiseAngle(centerX, centerY, e.clientX, e.clientY);
  
  rotation.current = angle;
  updateResizeIndicator(angle);
  updateTransform();
  
  onChange({
    scale: scale.current,
    rotation: angle * (Math.PI / 180),
    position: position.current,
  });
};

// Update handleScaleMove
const handleScaleMove = (e: MouseEvent) => {
  if (!isScaling.current || !circleRef.current) return;
  
  const rect = circleRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Use clockwise angle calculation
  const angle = getClockwiseAngle(centerX, centerY, e.clientX, e.clientY);
  const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
  
  scale.current = clamp(distance / (rect.width / 2), minScale, maxScale);
  rotation.current = angle;

  updateResizeIndicator(angle);
  updateTransform();
  
  onChange({
    scale: scale.current,
    rotation: angle * (Math.PI / 180),
    position: normalizePosition(position.current.x, position.current.y),
  });
};

  // // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!circleRef.current) return;
    
    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    if (e.touches.length === 1) {
      // Single touch - check if it's near center for dragging
      const touch = e.touches[0];
      const distance = Math.sqrt((touch.clientX - centerX) ** 2 + (touch.clientY - centerY) ** 2);
      
      if (distance <= rect.width / 6) { // Near center
        isTouchDragging.current = true;
        initialTouchPosition.current = { x: touch.clientX, y: touch.clientY };
        touchCenter.current = { x: centerX, y: centerY };
      }
    } 
    else if (e.touches.length === 2) {
      // Two touches - setup for rotate/scale
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      initialTouchDistance.current = getDistance(
        touch1.clientX, touch1.clientY,
        touch2.clientX, touch2.clientY
      );
      
      initialTouchAngle.current = getAngle(
        touch1.clientX, touch1.clientY,
        touch2.clientX, touch2.clientY
      );
      
      initialTouchScale.current = scale.current;
      initialTouchRotation.current = rotation.current;
    }
    
    e.preventDefault();
  };



// Update touch handling
const handleTouchMove = (e: React.TouchEvent) => {
  if (!circleRef.current) return;
  
  if (isTouchDragging.current && e.touches.length === 1) {
   // Handle single touch drag
   const touch = e.touches[0];
   const deltaX = touch.clientX - initialTouchPosition.current.x;
   const deltaY = touch.clientY - initialTouchPosition.current.y;
   
   position.current = {
     x: clamp(position.current.x + deltaX, minPositionX, maxPositionX),
     y: clamp(position.current.y + deltaY, minPositionY, maxPositionY),
   };
   
   initialTouchPosition.current = { x: touch.clientX, y: touch.clientY };
   updateTransform();
   
   const normalizedPos = normalizePosition(position.current.x, position.current.y);
   onChange({
     scale: scale.current,
     rotation: rotation.current * (Math.PI / 180), // Convert to radians
     position: normalizedPos,
   });
  } 
  else if (e.touches.length === 2) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    
    const currentDistance = getDistance(
      touch1.clientX, touch1.clientY,
      touch2.clientX, touch2.clientY
    );
    
    // Use clockwise angle calculation for touch rotation
    const centerX = (touch1.clientX + touch2.clientX) / 2;
    const centerY = (touch1.clientY + touch2.clientY) / 2;
    const currentAngle = getClockwiseAngle(
      centerX, 
      centerY, 
      touch2.clientX, 
      touch2.clientY
    );
    
    scale.current = clamp(
      initialTouchScale.current * (currentDistance / initialTouchDistance.current),
      minScale,
      maxScale
    );
    
    rotation.current = clamp(
      initialTouchRotation.current + (currentAngle - initialTouchAngle.current),
      minRotation,
      maxRotation
    );
    
    updateResizeIndicator(rotation.current);
    updateTransform();
    
    onChange({
      scale: scale.current,
      rotation: rotation.current * (Math.PI / 180),
      position: normalizePosition(position.current.x, position.current.y),
    });
  }
  
  e.preventDefault();
};

// const handleTouchStart = (e: React.TouchEvent) => {
//   if (!circleRef.current) return;
  
//   const rect = circleRef.current.getBoundingClientRect();
//   const centerX = rect.left + rect.width / 2;
//   const centerY = rect.top + rect.height / 2;
  
//   if (e.touches.length === 1) {
//     const touch = e.touches[0];
//     const touchX = touch.clientX;
//     const touchY = touch.clientY;
    
//     // Check if touch is within draggable area (entire circle)
//     const distance = Math.sqrt((touchX - centerX) ** 2 + (touchY - centerY) ** 2);
    
//     if (distance <= rect.width / 2) { // Anywhere inside circle
//       isTouchDragging.current = true;
//       // Store both screen and element positions
//       initialTouchPosition.current = {
//         screenX: touchX,
//         screenY: touchY,
//         elementX: position.current.x,
//         elementY: position.current.y
//       };
//     }
//   } 
//   // ... keep existing two-finger code
// };

// const handleTouchMove = (e: React.TouchEvent) => {
//   if (!isTouchDragging.current || !circleRef.current) return;
  
//   if (e.touches.length === 1) {
//     const touch = e.touches[0];
//     const deltaX = touch.clientX - initialTouchPosition.current.screenX;
//     const deltaY = touch.clientY - initialTouchPosition.current.screenY;
    
//     position.current = {
//       x: clamp(
//         initialTouchPosition.current.elementX + deltaX, 
//         minPositionX, 
//         maxPositionX
//       ),
//       y: clamp(
//         initialTouchPosition.current.elementY + deltaY,
//         minPositionY,
//         maxPositionY
//       ),
//     };
    
//     updateTransform();
    
//     onChange({
//       scale: scale.current,
//       rotation: rotation.current * (Math.PI / 180),
//       position: normalizePosition(position.current.x, position.current.y),
//     });
//   }
//   // ... keep existing two-finger code
  
//   e.preventDefault();
// };




  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      // All touches ended
      isTouchDragging.current = false;
      initialTouchDistance.current = 0;
      initialTouchAngle.current = 0;
    } else if (e.touches.length === 1) {
      // One touch remains - check if we should continue dragging
      const touch = e.touches[0];
      const rect = circleRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt((touch.clientX - centerX) ** 2 + (touch.clientY - centerY) ** 2);
        
        if (distance > rect.width / 6) {
          isTouchDragging.current = false;
        } else {
          initialTouchPosition.current = { x: touch.clientX, y: touch.clientY };
        }
      }
    }
  };


  // const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
  //   return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  // };

  const initialPosX = initialPosition.x !== 0 ? `calc(${initialPosition.x}px - 100px)` : `calc(50% - 100px)`;
  const initialPosY = initialPosition.y !== 0 ? `calc(${initialPosition.y}px - 100px)` : `calc(50% - 100px)`;

  return (
      <Box
        ref={circleRef}
        position="absolute"
        top={initialPosY}
        left={initialPosX}
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        sx={{
          willChange: "transform",
          transform: `translate(${position.current.x}px, ${position.current.y}px) rotate(${rotation.current}deg) scale(${scale.current})`,
          transformOrigin: "center",
          transition: "transform 0.1s ease",
          touchAction: "none",
        }}
      >
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
          transformOrigin="0 0"
          transition="all 0.3s ease"
          sx={{ zIndex: 1 }}
        />
      </Box>
  );
};




