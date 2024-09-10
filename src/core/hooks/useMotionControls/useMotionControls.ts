import { useState, useEffect, useRef, useCallback } from "react";

// TODO
// add both hooks on implementation and on other side
// Handle imperative show/hide API for motion box
export function useMotionControls() {
  const controlsRef = useRef(null);

  // Imperative API callback controls
  useEffect(() => {
    if (!controlsRef) return;
    if (controlsRef.current == null) {
      controlsRef.current = {
        metadata: {},
        loadMetadata: (metadata) => {
          controlsRef.current.metadata = metadata;
        },
        show: (metadata) => {
          controlsRef.current.loadMetadata(metadata);
        },
        hide: (metadata) => {
          controlsRef.current.loadMetadata(metadata);
        },
      };
    }
  }, [controlsRef]);

  const show = useCallback(
    (metadata) => controlsRef.current.show(metadata),
    []
  );

  const hide = useCallback(
    (metadata) => controlsRef.current.hide(metadata),
    []
  );

  return { show, hide, controlsRef };
}
