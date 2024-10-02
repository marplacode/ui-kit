import { useState, useCallback } from "react";

/**
 * Custom hook to handle simple boolean state changes.
 * @param {boolean} initialState - The initial state of the boolean. Defaults to false.
 * @returns {Array} An array containing the current state and a toggle function.
 */
export const useToggle = (initialState = false) => {
    const [isToggled, setState] = useState(initialState);
  
    const toggle = useCallback(() => {
      setState(!isToggled);
    }, [isToggled]);
  
    return { isToggled, toggle };
  };