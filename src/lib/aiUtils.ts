
import { toast } from "sonner";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

/**
 * Verifies if an image contains a pothole using MobileNet image classification
 * @param imageUrl The URL or data URL of the image to analyze
 * @returns Promise resolving to verification result with confidence score
 */
export const verifyPotholeImage = async (imageUrl: string): Promise<{isPothole: boolean; confidence: number; message: string}> => {
  try {
    console.log("Starting pothole image verification");
    
    // Load MobileNet model
    const model = await mobilenet.load({
      version: 2,
      alpha: 1.0
    });
    
    // Create an image element for the model to analyze
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    
    // Wait for image to load
    await new Promise((resolve) => {
      imgElement.onload = resolve;
      // Set a timeout in case image loading hangs
      setTimeout(resolve, 3000);
    });
    
    // Use model to classify the image
    const predictions = await model.classify(imgElement);
    console.log("Image classification results:", predictions);
    
    // List of terms that might indicate a pothole
    const potholeTerms = [
      "pothole", "hole", "crater", "damage", "broken", "road", "street", 
      "asphalt", "concrete", "pavement", "damaged"
    ];

    // Check if any prediction matches pothole-related terms
    const potholeMatches = predictions.filter(p => 
      potholeTerms.some(term => p.className.toLowerCase().includes(term))
    );
    
    // If we have a strong match for pothole-related terms
    if (potholeMatches.length > 0) {
      const bestMatch = potholeMatches.reduce((prev, current) => 
        (prev.probability > current.probability) ? prev : current
      );
      
      console.log("Pothole detected with confidence:", bestMatch.probability);
      
      return {
        isPothole: true,
        confidence: bestMatch.probability,
        message: `Pothole detected with ${Math.round(bestMatch.probability * 100)}% confidence.`
      };
    }
    
    // Fallback: Use a general heuristic based on visual features
    // Roads often have certain textures and colors
    const roadRelatedTerms = ["road", "street", "asphalt", "pavement", "concrete", "gravel"];
    const isRoadSurface = predictions.some(p => 
      roadRelatedTerms.some(term => p.className.toLowerCase().includes(term))
    );

    // If it's likely a road surface but not clearly identified as a pothole,
    // we'll accept it but with lower confidence
    if (isRoadSurface) {
      console.log("Possible road surface detected, assuming potential pothole");
      return {
        isPothole: true,
        confidence: 0.6, // Medium confidence
        message: "Image appears to show a road surface. Please ensure it clearly shows a pothole."
      };
    }
    
    console.log("No pothole detected in image");
    return {
      isPothole: false,
      confidence: 0.3,
      message: "This image doesn't appear to contain a pothole. Please upload a clearer image of the pothole."
    };
  } catch (error) {
    console.error("Error verifying pothole image:", error);
    // In case of error, we'll be permissive rather than blocking
    return {
      isPothole: true,
      confidence: 0.5,
      message: "Could not verify image content. Please ensure it clearly shows a pothole."
    };
  }
};

/**
 * Checks if the given location is near any existing pothole reports
 * @param lat Latitude of the new report
 * @param lng Longitude of the new report
 * @param maxDistance Maximum distance in meters to consider as "nearby"
 * @returns Promise resolving to any nearby potholes found
 */
export const checkForNearbyPotholes = async (
  lat: number, 
  lng: number, 
  maxDistance: number = 30
): Promise<{isNearby: boolean; nearbyPothole: any | null}> => {
  try {
    console.log(`Checking for potholes within ${maxDistance}m of ${lat}, ${lng}`);
    
    // Get existing pothole reports from localStorage
    const existingReports = JSON.parse(localStorage.getItem('potholeReports') || '[]');
    
    // Find the closest pothole report
    let closestPothole = null;
    let minDistance = Number.MAX_VALUE;
    
    for (const report of existingReports) {
      const distance = calculateDistance(
        lat, 
        lng, 
        report.location.lat, 
        report.location.lng
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestPothole = report;
      }
    }
    
    if (minDistance <= maxDistance && closestPothole) {
      console.log(`Found nearby pothole at distance: ${minDistance.toFixed(2)}m`);
      return {
        isNearby: true,
        nearbyPothole: closestPothole
      };
    }
    
    console.log("No nearby potholes found");
    return {
      isNearby: false,
      nearbyPothole: null
    };
  } catch (error) {
    console.error("Error checking for nearby potholes:", error);
    return {
      isNearby: false,
      nearbyPothole: null
    };
  }
};

/**
 * Calculate distance between two coordinates in meters using the Haversine formula
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};
