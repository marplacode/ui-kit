import { useRef, useCallback, useEffect } from 'react';

// Utility function to convert degrees to radians
const degToRad = (deg: number) => (deg * Math.PI) / 180;

interface CameraControlConfig {
  rotation?: [number, number];   // Rotation as [x, y] angles in degrees
  dollyDistance?: number;        // Distance for the dolly movement
  target?: [number, number, number];  // Target position
  ref?: null;
}

export const useCameraControls = (config: CameraControlConfig) => {
  const internalRef = useRef<any>();
  const cameraControlsRef = config?.ref  || internalRef


  // Function to move the camera
  const move = useCallback(
    async ({ rotation, dollyDistance, target = [0, 0, 0] }: any) => {
      const finalRotation = config?.rotation || rotation;
      const finalDollyDistance = config?.dollyDistance || dollyDistance;
      const finalTarget = config?.target || target;

      // Rotate camera using the provided or default rotation values
      if (finalRotation) {
        cameraControlsRef.current?.rotateTo(
          degToRad(finalRotation[0]),
          degToRad(finalRotation[1]),
          true
        );
      }

      // Dolly to the provided or default distance
      if (finalDollyDistance) {
        cameraControlsRef.current?.dollyTo(finalDollyDistance, true);
      }

      // Set target position using the provided or default target
      await cameraControlsRef.current?.setTarget(...finalTarget, true);
    },
    [config]
  );

  return {
    cameraControlsRef,
    move
  };
};