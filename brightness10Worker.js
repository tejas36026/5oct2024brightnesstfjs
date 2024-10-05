// brightness10Worker.js

self.onmessage = (e) => {
  const { imageData, selectedRegions } = e.data;

  // Function to adjust brightness of an image
  function adjustBrightness(imageData, brightness) {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
          data[i] += brightness;     // Red channel
          data[i + 1] += brightness; // Green channel
          data[i + 2] += brightness; // Blue channel
      }
      return imageData;
  }

  // Array to hold the 10 different brightness levels
  const brightnessLevels = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225];

  // Array to hold the brightness adjusted images
  const brightnessAdjustedImages = imageData.map((image) => {
      return brightnessLevels.map((brightness) => {
          // Clone the imageData to avoid modifying the original
          const adjustedImageData = new ImageData(
              new Uint8ClampedArray(image.data),
              image.width,
              image.height
          );
          return adjustBrightness(adjustedImageData, brightness);
      });
  }).flat(); // Flatten the array to get a single array of all adjusted images

  // Post the result back to the main thread
  self.postMessage({
      segmentedImages: brightnessAdjustedImages
  });
};
