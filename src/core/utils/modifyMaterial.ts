import { CustomMaterial } from "@commonTypes/CustomMaterial";
import { CustomTexture } from "@commonTypes/CustomTexture";

// Custom type for MaterialConfig
type MaterialConfig = {
  roughness?: number;
  metalness?: number;
  envMapIntensity?: number;
  color?: number | string;
  transparent?: boolean;
  transmission?: number;
  opacity?: number;
};

// Modify Material function using custom types
export function modifyMaterial(
  material: CustomMaterial,
  texture: CustomTexture,
  normalMap: CustomTexture,
  config: MaterialConfig
): void {
  material.map = texture ?? material.map;
  material.normalMap = normalMap ?? material.normalMap;

  if (config.roughness !== undefined) {
    material.roughness = config.roughness;
  }
  if (config.metalness !== undefined) {
    material.metalness = config.metalness;
  }
  if (config.envMapIntensity !== undefined) {
    material.envMapIntensity = config.envMapIntensity;
  }
  if (config.color !== undefined) {
    // material.color.set(config.color);
    material.color.set(0xffffff);
  }
  if (config.transparent !== undefined) {
    material.transparent = config.transparent;
  }
  if (config.transmission !== undefined) {
    material.transmission = config.transmission;
  }
  if (config.opacity !== undefined) {
    material.opacity = config.opacity;
  }

  material.needsUpdate = true;
}

type MaterialSurfaceType =
  | "metal"
  | "wood"
  | "glass"
  | "ceramic"
  | "plastic"
  | "wood"
  | "chrome"
  | "rubber"
  | "ceramic"
  | "mate"
  | "shiny"
  | "deckShine";
// Predefined material surface configurations
export const materialConfigs: Record<MaterialSurfaceType, MaterialConfig> = {
  metal: {
    roughness: 0.1, // Smooth surface
    metalness: 1.0, // Fully metallic
    envMapIntensity: 1.5, // Strong reflections
    color: 0xaaaaaa, // Light gray for steel look
    transparent: false,
    transmission: 0,
  },

  glass: {
    roughness: 0.0, // Completely smooth
    metalness: 0.0, // Non-metallic
    envMapIntensity: 0.9, // Good reflections, but not too strong
    color: 0xffffff, // Pure white for glass
    transparent: true,
    transmission: 0.9, // High transmission for glass effect
    opacity: 0.5, // Partial transparency
  },

  plastic: {
    roughness: 0.4, // Somewhat smooth, not glossy
    metalness: 0.0, // Non-metallic
    envMapIntensity: 0.3, // Low reflection
    color: 0x0000ff, // Default blue plastic
    transparent: false,
    transmission: 0,
  },

  wood: {
    roughness: 0.8, // Rough texture
    metalness: 0.0, // Non-metallic
    envMapIntensity: 0.2, // Minimal reflections
    color: 0x8b4513, // Brown wood color
    transparent: false,
    transmission: 0,
  },

  ceramic: {
    roughness: 0.2, // Smooth but not shiny
    metalness: 0.0, // Non-metallic
    envMapIntensity: 0.6, // Medium reflections
    color: 0xffffff, // White for ceramic
    transparent: false,
    transmission: 0,
  },

  rubber: {
    roughness: 0.9, // Very rough surface
    metalness: 0.0, // Non-metallic
    envMapIntensity: 0.1, // Almost no reflections
    color: 0x111111, // Dark rubber material
    transparent: false,
    transmission: 0,
  },

  chrome: {
    roughness: 0.0, // Perfectly smooth
    metalness: 1.0, // Fully metallic
    envMapIntensity: 2.0, // Very strong reflections
    color: 0xffffff, // Chrome look
    transparent: false,
    transmission: 0,
  },
  mate: {
    roughness: 0.3, // High roughness for matte appearance
    metalness: 0.3, // No metallic reflection
    color: 0xffffff, // Default to pure white color
    envMapIntensity: 0.2, // No environmental reflections
    transparent: false, // Opaque material
    transmission: 0, // No glass-like properties
  },
  shiny: {
    roughness: 0.1, // Low roughness for a shiny surface
    metalness: 1, // High metallic reflection
    color: 0xffffff, // Default to pure white color
    envMapIntensity: 1.0, // Moderate environmental reflections
    transparent: false, // Opaque material
    transmission: 0, // No glass-like properties
  },
  deckShine: {
    roughness: 0.05,
    metalness: 1.0, // High reflectivity
    color: 0xffffff, // Pure white base color, no tint
    envMapIntensity: 1.5, // Enhance environmental reflections
    // Remove transparency if you only want reflections
    transparent: false,
    transmission: 0, // Disable light transmission (no glass-like transparency)
  },
};
