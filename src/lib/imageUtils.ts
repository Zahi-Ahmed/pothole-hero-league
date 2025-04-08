
/**
 * Utility functions for handling image operations
 */

import { toast } from "sonner";

/**
 * Attempts to extract location metadata from an image file
 * This implementation tries multiple approaches to get location information
 */
export const extractLocationFromImage = async (file: File): Promise<{address: string, lat: number, lng: number} | null> => {
  try {
    console.log("Attempting to extract location from image:", file.name);
    
    // First try to read EXIF data using exif-js approach
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Try GPS from JPEG EXIF
    const exifData = await extractExifData(buffer);
    
    if (exifData && exifData.lat && exifData.lng) {
      // Got location from EXIF
      console.log("Successfully extracted location from image EXIF data:", exifData);
      
      // Attempt to get address from coordinates
      const address = await reverseGeocode(exifData.lat, exifData.lng);
      
      return {
        address,
        lat: exifData.lat,
        lng: exifData.lng
      };
    } else {
      console.log("No EXIF location data found, trying geolocation API");
      
      // Try browser geolocation as fallback
      const geoLocation = await getCurrentLocation();
      if (geoLocation) {
        console.log("Successfully obtained browser geolocation:", geoLocation);
        toast.success("Using your current location");
        return geoLocation;
      } else {
        console.log("Geolocation API failed or denied");
        toast.error("Could not detect location. Please enter manually.");
        return null;
      }
    }
  } catch (error) {
    console.error("Error extracting location from image:", error);
    toast.error("Could not extract location from image. Please enter manually.");
    return null;
  }
};

/**
 * Extracts actual EXIF data from image buffer
 * Looks for real GPS coordinates in the EXIF metadata
 */
const extractExifData = async (buffer: Uint8Array): Promise<{lat: number, lng: number} | null> => {
  // Helper function to convert GPS coordinates from EXIF format to decimal
  const convertDMSToDD = (degrees: number, minutes: number, seconds: number, direction: string): number => {
    let dd = degrees + minutes / 60 + seconds / 3600;
    if (direction === 'S' || direction === 'W') {
      dd = -dd;
    }
    return dd;
  };

  try {
    // Check if it's a JPEG (starts with FF D8)
    if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) {
      console.log("Not a JPEG file, can't extract EXIF");
      return null;
    }

    // Look for EXIF marker (FF E1)
    let offset = 2;
    while (offset < buffer.length - 1) {
      if (buffer[offset] === 0xFF && buffer[offset + 1] === 0xE1) {
        // Found EXIF marker
        const exifOffset = offset + 4; // Skip marker and length
        
        // Check for "Exif" string
        if (buffer[exifOffset] === 0x45 && // E
            buffer[exifOffset + 1] === 0x78 && // x
            buffer[exifOffset + 2] === 0x69 && // i
            buffer[exifOffset + 3] === 0x66) { // f
          
          // Found EXIF data, now look for GPS IFD
          // This is a simplified approach - a real implementation would need to parse the TIFF structure

          // Search for GPS related data - Look for typical GPS tag markers
          // Since this is simplified, we'll just check for patterns that might indicate GPS data

          // Convert buffer to string for easier searching
          const dataView = new DataView(buffer.buffer);
          
          // Scan for latitude and longitude references (North/South, East/West)
          let latRef = null;
          let lngRef = null;
          let latValue = null;
          let lngValue = null;
          
          // This is a very simplified detection approach
          // In a real implementation, you would properly parse the TIFF/EXIF structure
          for (let i = exifOffset; i < Math.min(exifOffset + 5000, buffer.length - 10); i++) {
            // Check for "N" or "S" for latitude ref
            if (buffer[i] === 0x4E || buffer[i] === 0x53) { // N or S
              if (i+1 < buffer.length && buffer[i+1] === 0x00) { // Null terminator
                latRef = String.fromCharCode(buffer[i]);
                console.log("Found latitude reference:", latRef);
              }
            }
            
            // Check for "E" or "W" for longitude ref
            if (buffer[i] === 0x45 || buffer[i] === 0x57) { // E or W
              if (i+1 < buffer.length && buffer[i+1] === 0x00) { // Null terminator
                lngRef = String.fromCharCode(buffer[i]);
                console.log("Found longitude reference:", lngRef);
              }
            }
            
            // Very rudimentary check for rational values that might be coordinates
            // In real GPS data, these would be properly structured
            if (i+8 < buffer.length) {
              // If we find what might be a rational number (2 32-bit values)
              const val1 = dataView.getUint32(i, false); // Big endian
              const val2 = dataView.getUint32(i+4, false);
              
              // If values look like they could be part of coordinates
              // (checking for reasonable ranges for degrees)
              if (val1 > 0 && val1 < 180 && val2 > 0) {
                // Store potential lat/lng values
                if (!latValue && latRef) {
                  latValue = val1 / val2;
                  console.log("Potential latitude value:", latValue);
                } else if (!lngValue && lngRef) {
                  lngValue = val1 / val2;
                  console.log("Potential longitude value:", lngValue);
                }
              }
            }
            
            // If we found both latitude and longitude, break early
            if (latRef && lngRef && latValue !== null && lngValue !== null) {
              break;
            }
          }
          
          // If we found GPS coordinates, return them
          if (latRef && lngRef && latValue !== null && lngValue !== null) {
            console.log("Extracted GPS coordinates from EXIF:", latValue, latRef, lngValue, lngRef);
            return {
              lat: latRef === 'N' ? latValue : -latValue,
              lng: lngRef === 'E' ? lngValue : -lngValue
            };
          }
        }
      }
      
      // Move to next marker
      if (buffer[offset] === 0xFF && buffer[offset + 1] !== 0x00) {
        const length = (buffer[offset + 2] << 8) + buffer[offset + 3];
        offset += 2 + length;
      } else {
        offset += 1;
      }
    }
    
    console.log("No GPS data found in EXIF");
    return null;
  } catch (error) {
    console.error("Error parsing EXIF data:", error);
    return null;
  }
};

/**
 * Get current location using browser's geolocation API
 */
const getCurrentLocation = (): Promise<{address: string, lat: number, lng: number} | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation API not supported by this browser");
      resolve(null);
      return;
    }
    
    const timeoutId = setTimeout(() => {
      console.warn("Geolocation request timed out");
      resolve(null);
    }, 8000); // 8 second timeout
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        
        const { latitude, longitude } = position.coords;
        console.log("Browser geolocation successful:", latitude, longitude);
        
        // Get address from coordinates
        const address = await reverseGeocode(latitude, longitude);
        
        resolve({
          address,
          lat: latitude,
          lng: longitude
        });
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Geolocation error:", error.code, error.message);
        resolve(null);
      },
      { 
        timeout: 5000, 
        enableHighAccuracy: true,
        maximumAge: 0 // Don't use cached position
      }
    );
  });
};

/**
 * Reverse geocode coordinates to get address
 * Uses Nominatim OpenStreetMap API for geocoding
 */
const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    console.log("Reverse geocoding coordinates:", lat, lng);
    
    // Using OpenStreetMap's Nominatim service which is free and doesn't require API key
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PotholeReporter/1.0' // Required by Nominatim ToS
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Geocoding response:", data);
    
    if (data && data.display_name) {
      return data.display_name;
    } else {
      throw new Error("No address found in geocoding response");
    }
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    // Fall back to coordinates as the address
    return `Location at coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
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
