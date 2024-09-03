import { useState, useRef, useEffect } from 'react';

export const useHover = ({ initialRef = null } = {}) => {
  const [isHovered, setIsHovered] = useState(false);
  const internalRef = useRef(null);
  const ref = initialRef || internalRef

  useEffect(() => {
    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      // Cleanup event listeners on unmount
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]); // Re-run effect if ref changes

  return {ref, isHovered };
}

