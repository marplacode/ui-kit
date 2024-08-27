import { useEffect, useRef } from "react";

/**
 * Custom hook to debounce a callback function.
 * @param {Function} callback - The callback function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @param {Array} dependencies - The dependencies array to control when the effect should run.
 */
export const useDebounce = (callback, delay, dependencies = []) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args) => {
      callbackRef.current(...args);
    };

    const timeoutId = setTimeout(handler, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [...dependencies, delay]);
};
