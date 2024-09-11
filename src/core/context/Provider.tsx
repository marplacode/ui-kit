import { ChakraProvider } from "@chakra-ui/react";
import { BackgroundLoader } from "@components";
import { CUBIC_MOTION_FUNCTION_1 } from "@config/definitions";
import { useRouter } from "@hooks/useRouter";
import { createContext, useContext, useMemo, useRef } from "react";
import { theme as defaultTheme } from "../theme";

const initialConfig = {
  global: {
    transition: { delay: 0, duration: 0.4, ease: CUBIC_MOTION_FUNCTION_1 },
  },
}

const initialState = {
  backgroundLoaderControls: null,
  config: initialConfig
};


const UiKitProviderContext = createContext(initialState);

export const UiKitProvider = ({
  theme = defaultTheme,
  config = initialConfig,
  router = null,
  children,
}) => {
  const backgroundLoaderControls = useRef(null);
  const { push } = useRouter(router, { backgroundLoaderControls });
  const state = useMemo( () => ({ backgroundLoaderControls, config}), [config, backgroundLoaderControls.current])

  return (
    <ChakraProvider theme={theme}>
      <UiKitProviderContext.Provider value={state}>
        <BackgroundLoader
          controlsRef={backgroundLoaderControls}
          variation="sliding"
          direction="left"
          autoChange={false}
          repeat={1}
          show={false}
          onAnimationEnd={({ metadata }) => {
            if (metadata?.path) {
              router.push(metadata.path);
              backgroundLoaderControls.current.hide();
            }
          }}
        />
        {children}
      </UiKitProviderContext.Provider>
    </ChakraProvider>
  );
};

export const useUiKit = () => {
  const context = useContext(UiKitProviderContext);

  if (context === undefined) {
    throw new Error("UiKit hooks must be use inside UiKitProvider");
  }

  return context;
};

export const useGlobalConfig = () => {
  const context = useUiKit();

  return context.config.global;
};

export const useBackgroundLoaderControls = () => {
  const context = useContext(UiKitProviderContext);

  return context.backgroundLoaderControls;
};
