import {
  Box,
  Slider as S,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import { useSpring, config as springConfig } from 'react-spring'
import { useState } from 'react'

export const Slider = ({ autoMove, moveTo = 20, value, defaultValue = 0, delay = 0, ...rest }) => {
  // auto animate slider
  const [isAutoMove, setIsAutoMove] = useState(false)
  const { value: springValue } = useSpring({
    value: autoMove ? moveTo : defaultValue,
    config: springConfig.slow,
    delay: delay * 1000,
    onChange: ({ value }) => {
      rest.onChange(value.value)
    },
    onStart: () => {
      setIsAutoMove(true)
    },
    onRest: () => {
      setIsAutoMove(false)
    },
  })

  return (
    <Box overflow={'visible'} px='6' py='1'>
      <S
        aria-label='slider-animation'
        w='40'
        defaultValue={defaultValue}
        color='white'
        colorScheme='whiteAlpha'
        step={5}
        max={99}
        value={isAutoMove ? springValue.get() : value}
        {...rest}
      >
        <SliderTrack bg='whiteAlpha.200'>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} bg='whiteAlpha.700' />
      </S>
    </Box>
  )
}
