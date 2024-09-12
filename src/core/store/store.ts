import { create } from "zustand";
import { CUBIC_MOTION_FUNCTION_1 } from "../config/definitions";

// Initial configuration object
export const initialConfig = {
  transition: { delay: 0, duration: 0.4, ease: CUBIC_MOTION_FUNCTION_1 },
  router: {
    transition: {
      controls: null, // To be filled with control methods (show, hide, etc.)
      enabled: null,  // Enable/disable router transitions
    },
  },
};

// Create Zustand store
export const useUiKitStore = create((set) => ({
  // State: The initial config
  config: initialConfig,

  // Action: Initialize router controls with a given controls object
  initRouter: ({controls}) =>
    set((state) => ({
      config: {
        ...state.config,
        router: {
          ...state.config.router,
          transition: {
            ...state.config.router.transition,
            controls,
          },
        },
      },
    })),

  // Action: Update router configuration (deep merge with existing config)
  updateRouterConfig: (newConfig) =>
    set((state) => ({
      config: {
        ...state.config,
        router: {
          ...state.config.router,
          ...newConfig, // Spread new config over the existing one
        },
      },
    })),

  // Action: Disable router transition
  disableRouterTransition: () =>
    set((state) => ({
      config: {
        ...state.config,
        router: {
          ...state.config.router,
          transition: {
            ...state.config.router.transition,
            enabled: false, // Disable transitions
          },
        },
      },
    })),
}));
