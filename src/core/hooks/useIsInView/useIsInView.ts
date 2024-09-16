import { useState, useEffect, useRef } from "react";

export function useIsInView(ref: React.RefObject<HTMLElement>, { enabled = true, executeOnce = false } = {}): boolean {
  const [isInView, setIsInView] = useState(false);
  const hasExecuted = useRef(false); // Track if the observer has already executed

  useEffect(() => {
    if (!enabled || !ref.current || (executeOnce && hasExecuted.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (executeOnce) {
            hasExecuted.current = true;
            observer.disconnect(); // Stop observing after the first intersection if `executeOnce` is true
          }
        } else if (!executeOnce) {
          setIsInView(false); // Allow toggling if `executeOnce` is false
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, enabled, executeOnce]);

  return isInView;
}
