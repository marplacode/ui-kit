import { useRef, useCallback } from "react";

export const AVAILABLE_MOTION_STATES = ["show", "hide"];

export const useMotionControls = () => {
  const callbacksRef = useRef({
    show: [],
    hide: [],
  });
  const metadataRef = useRef(null); // Ref to store metadata

  // Subscribe to the show or hide events
  const subscribe = useCallback((event, callback) => {
    if (!AVAILABLE_MOTION_STATES.includes(event)) return;

    callbacksRef.current[event].push(callback);

    // Return a function to unsubscribe the callback
    return () => {
      callbacksRef.current[event] = callbacksRef.current[event].filter(
        (cb) => cb !== callback
      );
    };
  }, []);

  // Unsubscribe a callback from the show or hide events
  const unsubscribe = useCallback((event, callback) => {
    if (!AVAILABLE_MOTION_STATES.includes(event)) return;

    callbacksRef.current[event] = callbacksRef.current[event].filter(
      (cb) => cb !== callback
    );
  }, []);

  // Trigger all callbacks for the show event
  const show = useCallback((metadata = {}) => {
    metadataRef.current = metadata;
    callbacksRef.current.show.forEach((callback) => callback(metadata));
  }, []);

  // Trigger all callbacks for the hide event
  const hide = useCallback((metadata = {}) => {
    metadataRef.current = metadata;
    callbacksRef.current.hide.forEach((callback) => callback(metadata));
  }, []);

  return { show, hide, metadata: metadataRef, subscribe, unsubscribe };
};
