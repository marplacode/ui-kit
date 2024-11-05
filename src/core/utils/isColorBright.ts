export const isColorBright = (color: string) => {
  let r, g, b;

  if (color.startsWith("#")) {
    // Handle hexadecimal format
    const hexColor = color.slice(1); // Remove "#"
    r = parseInt(hexColor.slice(0, 2), 16);
    g = parseInt(hexColor.slice(2, 4), 16);
    b = parseInt(hexColor.slice(4, 6), 16);
  } else if (color.startsWith("rgb")) {
    // Handle RGB format: rgb(r, g, b)
    const rgbValues = color.match(/\d+/g); // Extract numbers
    if (rgbValues && rgbValues.length === 3) {
      r = parseInt(rgbValues[0], 10);
      g = parseInt(rgbValues[1], 10);
      b = parseInt(rgbValues[2], 10);
    } else {
      throw new Error("Invalid RGB color format.");
    }
  } else {
    throw new Error("Invalid color format. Please provide a hex or RGB color.");
  }

  // Calculate brightness
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return true if brightness is above threshold
  return brightness > 0.5;
};
