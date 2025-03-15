// import { useState, useEffect } from "react";


// export function useCenterModel({ modelRef, scene }) {
  
//   useEffect(() => {
//     if (modelRef.current) {
//       // Compute the bounding box of the model
//       const box = new Box3().setFromObject(modelRef.current);

//       // Calculate the center of the bounding box
//       const center = new Vector3();
//       box.getCenter(center);

//       // Adjust the model's position to center it
//       modelRef.current.position.sub(center);
//     }
//   }, [scene]);
//   }

export const useCenterModel = 'not yet implemented'