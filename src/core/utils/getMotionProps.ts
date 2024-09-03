export const ALLOWED_MOTION_PROPS = ['direction', 'delay', 'show', 'showInView', 'width', 'height', 'isInViewConfig']

export const getMotionProps = (props = {}, allowedProps = ALLOWED_MOTION_PROPS)  => {
    const motionPropsList = allowedProps; // Add more motion-related props here
    const motionProps:any = {};
    const rest:any = {};
  
    Object.keys(props).forEach((key) => {
      if (motionPropsList.includes(key)) {
        motionProps[key] = props[key];
      } else {
        rest[key] = props[key];
      }
    });
  
    return { motionProps, rest };
  }