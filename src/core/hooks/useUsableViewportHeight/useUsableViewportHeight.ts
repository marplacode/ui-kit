import { useState, useEffect } from "react";

// This hooks replicates SVH (small viewport height) unit measure for older devices
export const useUsableViewportHeight = () => {
  const [usableHeight, setUsableHeight] = useState(0);

  useEffect(() => {
    const updateUsableHeight = () => {
      const newHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      setUsableHeight(newHeight);
    };

    // Initial update
    updateUsableHeight();

    // Update when the window is resized or orientation changes
    window.addEventListener("resize", updateUsableHeight);
    window.addEventListener("orientationchange", updateUsableHeight);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("resize", updateUsableHeight);
      window.removeEventListener("orientationchange", updateUsableHeight);
    };
  }, []);

  return usableHeight;
};
