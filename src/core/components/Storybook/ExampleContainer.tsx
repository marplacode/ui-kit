import { Box } from "@chakra-ui/react";
import { UiKitProvider } from "../../context";

export const ExampleContainer = ({children}) => <Box height='100vh'><UiKitProvider>{children}</UiKitProvider> </Box>