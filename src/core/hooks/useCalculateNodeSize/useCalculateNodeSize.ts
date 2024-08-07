import { useState, useRef, useLayoutEffect, useEffect } from "react";

// export const useCalculateNodeSize = ({ formatToPixels = false } = {}) => {
//   const ref = useRef(null);
//   const [size, setDimensions] = useState({ width: 0, height: 0 });

//   useLayoutEffect(() => {
//     if (ref.current) {
//       setDimensions({
//         width: formatToPixels ? `${ref.current.clientWidth}px` : ref.current.clientWidth,
//         height: formatToPixels ? `${ref.current.clientHeight}px` : ref.current.clientHeight,
//       });
//     }
//   }, [ref, formatToPixels]);

//   return { ref, size };
// };

export const useCalculateNodeSize = ({ formatToPixels = false } = {}) => {
  const ref = useRef(null);
  const [size, setDimensions] = useState({ width: 0, height: 0 });

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
  }, [formatToPixels]);

  return { ref, size };
};