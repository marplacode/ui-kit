import { useRef, useCallback, useEffect } from 'react';

// Utility function to convert degrees to radians
const degToRad = (deg: number) => (deg * Math.PI) / 180;

interface CameraControlConfig {
  rotation?: [number, number];   // Rotation as [x, y] angles in degrees
  dollyDistance?: number;        // Distance for the dolly movement
  target?: [number, number, number];  // Target position
}

interface UseCameraControlsProps {
  config?: CameraControlConfig;  // Optional config object
}

export const useCameraControls = ({ config }: UseCameraControlsProps) => {
  const cameraControlsRef = useRef<any>();

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

  // Run move on the first mount
  useEffect(() => {
    const initialRotation = config?.rotation || [0, 0]; // Default rotation if not provided
    const initialDollyDistance = config?.dollyDistance || 10; // Default distance
    const initialTarget = config?.target || [0, 0, 0]; // Default target

    move({
      rotation: initialRotation,
      dollyDistance: initialDollyDistance,
      target: initialTarget
    });
  }, [config, move]);

  return {
    cameraControlsRef,
    move
  };
};