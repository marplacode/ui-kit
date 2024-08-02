import {
  ChakraProvider,
} from '@chakra-ui/react'
import  {theme} from '../theme'

export const UiKitProvider = ({ children }) => (
  <ChakraProvider theme={theme}>
   {children}
  </ChakraProvider>
)

