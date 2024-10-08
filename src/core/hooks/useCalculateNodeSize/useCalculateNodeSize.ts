import { useState, useRef, useLayoutEffect } from "react";


export const useCalculateNodeSize = ({ initialRef = null, formatToPixels = false } = {}) => {
  const internalRef = useRef(null);
  const ref = initialRef || internalRef
  const [size, setDimensions] = useState<{ width: number | string, height: number | string }>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const node = ref.current;

    if (node) {
      const updateSize = (entries) => {
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