import { ChakraProvider } from "@chakra-ui/react";
import { CUBIC_MOTION_FUNCTION_1 } from "@config/definitions";
import { createContext, useContext } from "react";
import { theme as defaultTheme } from "../theme";

const initialState = {
  global: {
    transition: { delay: 0, duration: 0.4, ease: CUBIC_MOTION_FUNCTION_1 },
  },
};

const UiKitProviderContext = createContext(initialState);

export const UiKitProvider = ({
  theme = defaultTheme,
  config = initialState,
  children,
}) => (
  <ChakraProvider theme={theme}>
    <UiKitProviderContext.Provider value={config}>
      {children}
    </UiKitProviderContext.Provider>
  </ChakraProvider>
);

export const useUiKit = () => {
  const context = useContext(UiKitProviderContext)

  if(context === undefined) {
    throw new Error('UiKit hooks must be use inside UiKitProvider')
  }

  return context
} 

export const useGlobalConfig = () => {
  const context = useUiKit();

  return context.global
}