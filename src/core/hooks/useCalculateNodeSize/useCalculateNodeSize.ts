import { useState, useRef, useLayoutEffect, useEffect, useMemo } from "react";


export const useCalculateNodeSize = ({ initialRef = null, formatToPixels = false } = {}) => {
  const internalRef = useRef(null);
  const ref = initialRef || internalRef
  const [size, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;

    if (node) {
      const updateSize = (entries) => {
        console.log('update',entries)
        if (!entries || entries.length === 0) return;
        const { width, height } = entries[0].contentRect;
        setDimensions({
          width: formatToPixels ? `${width}px` : width,
          height: formatToPixels ? `${height}px` : height,
        });
      };

      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(node);

      return () => {
        resizeObserver.unobserve(node);
      };
    }
  }, [formatToPixels, ref.current]);

  return { ref, size }
};