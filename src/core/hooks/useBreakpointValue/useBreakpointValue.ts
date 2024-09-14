import { useState, useEffect } from "react";
import { getBreakpointValue } from "./getBreakpointValue";


export function useBreakpointValue<T>(props: Record<string, T>): T {
    const [value, setValue] = useState(() => getBreakpointValue(props));
  
    useEffect(() => {
      const updateValue = () => {
        setValue(getBreakpointValue(props));
      };
  
      window.addEventListener('resize', updateValue);
      return () => window.removeEventListener('resize', updateValue);
    }, [props]);
  
    return value;
  }