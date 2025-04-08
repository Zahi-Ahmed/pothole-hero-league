
/**
 * Utility functions for handling image operations
 */

/**
 * Attempts to extract location metadata from an image file
 * This is a simplified implementation that simulates extracting EXIF data
 * In a real-world implementation, you would use a library like 'exif-js'
 */
export const extractLocationFromImage = (file: File): Promise<{address: string, lat: number, lng: number} | null> => {
  return new Promise((resolve) => {
    // For demonstration purposes, we're simulating the extraction of EXIF data
    // In a real implementation, you would use the exif-js library or similar
    
    // Simulate processing time
    setTimeout(() => {
      // Simulate successful metadata extraction for demo purposes
      // In a real app, this would actually read the EXIF data
      
      // Random coordinates in New Delhi area for demonstration
      const lat = 28.6139 + (Math.random() * 0.05 - 0.025);
      const lng = 77.2090 + (Math.random() * 0.05 - 0.025);
      
      // Generate a fake address based on the coordinates
      const address = `${Math.floor(Math.random() * 100 + 1)} ${[
        'Rajpath', 'Connaught Place', 'Lodhi Road', 'Janpath', 'Akbar Road'
      ][Math.floor(Math.random() * 5)]}, New Delhi, India`;
      
      resolve({
        address,
        lat,
        lng
      });
    }, 1500);
  });
};

/**
 * Reads an image file and returns a data URL
 */
export const readImageAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read image file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    reader.readAsDataURL(file);
  });
};
