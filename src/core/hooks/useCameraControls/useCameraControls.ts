import { useRef, useCallback } from 'react'

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

export const useCameraControls = ({ config }) => {
  const cameraControlsRef = useRef<any>()

  const move = useCallback(
    async ({ rotation, dollyDistance, target = [0,0,0],  }: any) => {
      // await cameraControlsRef.current?.setOrbitPoint(23, 0, 0, true)
      cameraControlsRef.current?.rotateTo(
        degToRad(rotation[0]),
        degToRad(rotation[1]),
        true
      )
      cameraControlsRef.current?.dollyTo(dollyDistance, true)
      await cameraControlsRef.current?.setTarget(...target, true)
    },
    []
  )

  return {
    cameraControlsRef,
    move
  }
  
}
