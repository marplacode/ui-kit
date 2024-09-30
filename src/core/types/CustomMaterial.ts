import { CustomTexture } from "./CustomTexture";

// Custom type for Material
export type CustomMaterial = {
  map?: CustomTexture;
  normalMap?: CustomTexture;
  roughness?: number;
  metalness?: number;
  envMapIntensity?: number;
  color: { set(value: number | string): void };
  transparent?: boolean;
  transmission?: number;
  opacity?: number;
  needsUpdate: boolean;
};
