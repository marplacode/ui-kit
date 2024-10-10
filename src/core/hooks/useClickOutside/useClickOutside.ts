import { useEffect, RefObject } from "react";

type UseClickOutsideOptions = {
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[]; // Supports one or more refs
  onClickOutside: (event: MouseEvent | TouchEvent) => void; // Callback for outside clicks
  enabled?: boolean; // Allows toggling the hook
  events?: string[]; // List of events to listen to
};

export const useClickOutside = ({
  refs,
  onClickOutside,
  enabled = true,
  events = ["mousedown", "touchstart"],
}: UseClickOutsideOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Normalize refs to an array if it's a single ref
      const refList = Array.isArray(refs) ? refs : [refs];

      // Check if the click is outside all the specified refs
      const isOutside = refList.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );

      if (isOutside) {
        onClickOutside(event);
      }
    };

    // Attach event listeners
    events.forEach((eventName) => {
      document.addEventListener(eventName, handleClickOutside);
    });

    // Clean up event listeners on unmount or ref change
    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handleClickOutside);
      });
    };
  }, [refs, onClickOutside, enabled, events]);
};
