import { computeResponsiveProps } from "@hooks/useBreakpointValue";

export const ALLOWED_MOTION_PROPS = ['direction', 'delay', 'show', 'showInView', 'showOnce', 'width', 'height', 'isInViewConfig', 'effect', 'config']

export const getMotionProps = (props = {}, allowedProps = ALLOWED_MOTION_PROPS)  => {
    const motionPropsList = allowedProps; // Add more motion-related props here
    let motionProps:any = {};
    const rest:any = {};
  
    Object.keys(props).forEach((key) => {
      if (motionPropsList.includes(key)) {
        motionProps[key] = props[key];
      } else {
        rest[key] = props[key];
      }
    });

    motionProps = computeResponsiveProps(motionProps)
  
    return { motionProps, rest };
  }