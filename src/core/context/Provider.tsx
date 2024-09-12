import { ChakraProvider } from "@chakra-ui/react";
import { BackgroundLoader } from "@components";
import { useMotionControls } from "@hooks/useMotionControls";
import { useUiKit } from "@hooks/useUiKit";
import { theme as defaultTheme } from "../theme";
import { useEffect, useMemo } from "react";
import { initialConfig, useUiKitStore } from "@store/store";

export const UiKitProvider = ({
  theme = defaultTheme,
  config = null,
  router: routerInstance = null,
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

  console.log("DISABLED", routeTransitionEnabled);

  console.log("ADSADSADSADSADSA");

  //  // Initialize controls when the component mounts
  useEffect(() => {
    initRouter({ controls });
  }, [initRouter]);

  useEffect(() => {
    if (routerInstance?.asPath) {
      controls.hide();
    }
  }, [routerInstance?.asPath]);

  return (
    <ChakraProvider theme={theme}>
      <BackgroundLoader
        controls={controls}
        variation="sliding"
        direction="left"
        autoChange={false}
        repeat={1}
        show={false}
        disabled={!routeTransitionEnabled}
        // disabled={false}
        onAnimationEnd={({ metadata }) => {
          if (metadata?.url) {
            routerInstance.push(metadata.url);
            // controls.hide();
          }
        }}
      />
      {children}
    </ChakraProvider>
  );
};
