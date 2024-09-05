import { breakpoints } from "@config/breakpoints";

export function getBreakpointValue<T>(props: Record<string, T>): T {
  const screenWidth = window.innerWidth;

  const sortedBreakpoints = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[a] - breakpoints[b]
  );

  for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
    const key = sortedBreakpoints[i];
    if (screenWidth >= breakpoints[key] && props[key] !== undefined) {
      return props[key];
    }
  }

  return props.base;
}

export function computeResponsiveProps<T>(props: T): T {
  const result: any = {};

  for (const key in props) {
    const value = props[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = getBreakpointValue(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
