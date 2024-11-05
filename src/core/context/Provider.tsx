import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BackgroundLoader } from "@components";
import { useMotionControls } from "@hooks/useMotionControls";
import { theme as defaultTheme } from "../theme";
import { useEffect, useMemo } from "react";
import { useUiKitStore } from "@store/store";

export const UiKitProvider = ({
  theme = defaultTheme,
  config = null,
  router: routerInstance = null,
  pathname = null,
  loaderConfig,
  children,
}) => {
  const controls = useMotionControls();
  const initRouter = useUiKitStore((state: any) => state.initRouter);
  const storeRouteTransitionEnabled = useUiKitStore(
    (state: any) => state.config.router.transition.enabled
  );
  // if config was override that that value first
  const routeTransitionEnabled = useMemo(
    () =>
      storeRouteTransitionEnabled
        ? storeRouteTransitionEnabled
        : typeof config?.router?.transition?.enabled === "boolean"
          ? config?.router?.transition?.enabled
          : true,
    [storeRouteTransitionEnabled, config]
  );

  //  // Initialize controls when the component mounts
  useEffect(() => {
    initRouter({ controls, instance: routerInstance });
  }, [initRouter, routerInstance]);

  useEffect(() => {
    // Next 13 removed asPath property
    if (routerInstance?.asPath || pathname) {
      controls.hide();
    }
  }, [routerInstance?.asPath, pathname]);

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <BackgroundLoader
        controls={controls}
        variation="sliding"
        direction="left"
        autoChange={false}
        repeat={1}
        show={false}
        disabled={!routeTransitionEnabled}
        onAnimationEnd={({ metadata }) => {
          if (metadata?.url) {
            routerInstance.push(metadata.url);
          }
        }}
        {...loaderConfig}
      />
      {children}
    </ChakraProvider>
  );
};
