import { useRef } from 'react';

// TODO Connect to store to have global refff


// Hook to calculate the next zIndex value
export const useZIndex = (position: 'top' | 'bottom'): number => {
  // Store the last zIndex in a ref to persist its value between renders
  const lastZIndexRef = useRef(0);

  // Logic to increment or decrement the zIndex based on the position
  if (position === 'top') {
    lastZIndexRef.current += 1;  // Increment for top
  } else if (position === 'bottom') {
    lastZIndexRef.current -= 1;  // Decrement for bottom
  }

  // Return the new zIndex value
  return lastZIndexRef.current;
};