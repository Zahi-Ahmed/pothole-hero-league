import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Camera, MapPin, Info, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import CustomBadge from '@/components/UI/CustomBadge';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Pothole } from '@/lib/types';
import { extractLocationFromImage, readImageAsDataURL } from '@/lib/imageUtils';
import { verifyPotholeImage, checkForNearbyPotholes } from '@/lib/aiUtils';
import DuplicatePotholeModal from '@/components/PotholeVerification/DuplicatePotholeModal';
import AIVerificationResult from '@/components/PotholeVerification/AIVerificationResult';

const ReportPothole: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [location, setLocation] = useState({
    address: '',
    lat: 0,
    lng: 0,
  });
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [isAIVerifying, setIsAIVerifying] = useState(false);
  const [aiVerification, setAIVerification] = useState<{
    isPothole: boolean;
    confidence: number;
    message: string;
  } | null>(null);
  
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [nearbyPothole, setNearbyPothole] = useState<Pothole | null>(null);
  const [bypassDuplicateCheck, setBypassDuplicateCheck] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setLocationError(null);
      setAIVerification(null);
      
      try {
        const dataUrl = await readImageAsDataURL(file);
        setImage(dataUrl);
        
        setIsLocationLoading(true);
        toast.info("Processing image and attempting to detect location...");
        
        const locationData = await extractLocationFromImage(file);
        
        if (locationData) {
          setLocation(locationData);
          toast.success("Location detected from image or current position");
          setLocationError(null);
          
          const nearbyCheck = await checkForNearbyPotholes(
            locationData.lat,
            locationData.lng,
            30
          );
          
          if (nearbyCheck.isNearby && nearbyCheck.nearbyPothole) {
            setNearbyPothole(nearbyCheck.nearbyPothole);
            setShowDuplicateModal(true);
            toast.info("Similar pothole report found nearby.");
          }
        } else {
          setLocationError("Couldn't detect location automatically. Please enter manually or try again.");
          toast.error("Location detection failed. Please enter manually.");
        }
        
        setIsAIVerifying(true);
        const verificationResult = await verifyPotholeImage(dataUrl);
        setAIVerification(verificationResult);
        
        if (!verificationResult.isPothole) {
          toast.error("The image doesn't appear to show a pothole. Please try a clearer image.");
        } else if (verificationResult.confidence > 0.7) {
          toast.success("Image verified as a pothole successfully!");
        } else {
          toast.info(verificationResult.message);
        }
      } catch (error) {
        console.error("Error processing image:", error);
        setLocationError("Error processing image. Please try again or enter location manually.");
        toast.error("Error processing image. Please try again.");
      } finally {
        setIsLocationLoading(false);
        setIsAIVerifying(false);
      }
    }
  };

  const getLocationClick = async () => {
    if (!navigator.geolocation) {
      toast.error("Your browser doesn't support geolocation.");
      setLocationError("Geolocation not supported by your browser. Please enter location manually.");
      return;
    }
    
    setIsLocationLoading(true);
    setLocationError(null);
    toast.info("Detecting your current location...");
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });
      
      const { latitude, longitude } = position.coords;
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'PotholeReporter/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error("Geocoding API error");
      }
      
      const data = await response.json();
      
      setLocation({
        address: data.display_name || `Location at ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        lat: latitude,
        lng: longitude,
      });
      
      toast.success("Current location detected successfully");
    } catch (error) {
      console.error("Geolocation error:", error);
      setLocationError("Failed to detect your location. Please enable location services or enter manually.");
      toast.error("Location detection failed. Please try again or enter manually.");
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!bypassDuplicateCheck && location.lat && location.lng) {
        const nearbyCheck = await checkForNearbyPotholes(
          location.lat,
          location.lng,
          30
        );
        
        if (nearbyCheck.isNearby && nearbyCheck.nearbyPothole) {
          setNearbyPothole(nearbyCheck.nearbyPothole);
          setShowDuplicateModal(true);
          setIsSubmitting(false);
          return;
        }
      }
      
      const newReport: Pothole = {
        id: `p-${uuidv4()}`,
        image: image || '',
        location: {
          address: location.address,
          lat: location.lat,
          lng: location.lng,
        },
        description: description,
        severity: severity,
        status: 'reported',
        reportedBy: {
          userId: 'current-user',
          name: 'Current User',
        },
        reportedDate: new Date().toISOString(),
        verifiedCount: 0,
        rejectedCount: 0,
        comments: [],
      };
      
      const existingReports = JSON.parse(localStorage.getItem('potholeReports') || '[]');
      const updatedReports = [newReport, ...existingReports];
      localStorage.setItem('potholeReports', JSON.stringify(updatedReports));
      
      window.dispatchEvent(new Event('storage'));
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        toast.success("Report submitted successfully! Thank you for making our roads safer.");
        
        const xpElement = document.getElementById('xp-gain');
        if (xpElement) {
          xpElement.classList.add('animate-slide-up');
          xpElement.style.opacity = '1';
        }
      }, 1500);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setImage(null);
    setImageFile(null);
    setLocation({
      address: '',
      lat: 0,
      lng: 0,
    });
    setDescription('');
    setSeverity('medium');
    setLocationError(null);
  };

  const navigateToProgress = () => {
    navigate('/progress');
  };

  const handleDuplicateModalClose = () => {
    setShowDuplicateModal(false);
    if (nearbyPothole) {
      navigate(`/progress`);
    }
  };

  const handleProceedAnyway = () => {
    setShowDuplicateModal(false);
    setBypassDuplicateCheck(true);
    toast.info("You can now submit your report anyway.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal">Report a Pothole</h1>
            <p className="text-gray-600">Help make our roads safer by reporting potholes in your area.</p>
          </div>
          
          {isSuccess ? (
            <div className="bg-white rounded-2xl shadow-card p-8">
              <div className="text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full">
                  <CheckCircle size={32} className="text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-2">Thank You for Your Report!</h2>
                <p className="text-gray-600 mb-6">
                  Your contribution helps make our community safer for everyone.
                </p>
                
                <div id="xp-gain" className="mb-8 opacity-0">
                  <CustomBadge text="+50 XP" variant="primary" className="text-lg px-6 py-2" animate={true} />
                  <p className="mt-2 text-sm text-gray-600">
                    You've earned points for your contribution!
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={resetForm} className="btn-primary">
                    Report Another Pothole
                  </button>
                  <button onClick={navigateToProgress} className="btn-outline">
                    View Your Report
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="text-primary" />
                  <h2 className="text-xl font-semibold">Upload Photo</h2>
                </div>
                
                {image ? (
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <img src={image} alt="Pothole preview" className="w-full h-64 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImageFile(null);
                        setLocation({
                          address: '',
                          lat: 0,
                          lng: 0,
                        });
                        setLocationError(null);
                        setAIVerification(null);
                        setBypassDuplicateCheck(false);
                      }}
                      className="absolute top-3 right-3 bg-charcoal/70 text-white p-2 rounded-full hover:bg-charcoal transition-colors"
                    >
                      ✖
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
                    <label
                      htmlFor="pothole-image"
                      className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <Camera size={48} className="text-gray-400 mb-2" />
                      <span className="text-gray-600 mb-1">Click to upload a photo</span>
                      <span className="text-gray-500 text-sm">or drag and drop</span>
                    </label>
                    <input
                      type="file"
                      id="pothole-image"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                )}
                
                {aiVerification && (
                  <div className="mt-4 mb-4">
                    <AIVerificationResult 
                      isPothole={aiVerification.isPothole}
                      confidence={aiVerification.confidence}
                      message={aiVerification.message}
                      isVerifying={isAIVerifying}
                    />
                  </div>
                )}
                
                <p className="text-sm text-gray-500">
                  Please upload a clear photo of the pothole. Our AI will verify the image
                  and we'll check if it has already been reported.
                </p>
              </div>
              
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-primary" />
                  <h2 className="text-xl font-semibold">Location</h2>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    className={`btn-secondary py-2 px-4 ${isLocationLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={getLocationClick}
                    disabled={isLocationLoading}
                  >
                    {isLocationLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Detecting...
                      </>
                    ) : (
                      "Auto-detect Location"
                    )}
                  </button>
                  <span className="text-sm text-gray-500">or enter manually</span>
                </div>
                
                {locationError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                    <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700">{locationError}</p>
                  </div>
                )}
                
                {location.address && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="font-medium">{location.address}</p>
                    <p className="text-sm text-gray-500">
                      Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter the exact location of the pothole"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="latitude"
                      value={location.lat || ''}
                      onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) || 0 })}
                      step="0.000001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Latitude (e.g. 28.6139)"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="longitude"
                      value={location.lng || ''}
                      onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) || 0 })}
                      step="0.000001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Longitude (e.g. 77.2090)"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="text-primary" />
                  <h2 className="text-xl font-semibold">Description & Severity</h2>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Describe the pothole (size, depth, location on road, etc.)"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Severity
                  </span>
                  <div className="flex gap-4">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <label
                        key={level}
                        className={`
                          flex-1 border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all
                          ${severity === level 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="severity"
                          value={level}
                          checked={severity === level}
                          onChange={() => setSeverity(level)}
                          className="sr-only"
                        />
                        <span className="text-2xl mb-1">
                          {level === 'low' ? '🟢' : level === 'medium' ? '🟠' : '🔴'}
                        </span>
                        <span className="font-medium capitalize">{level}</span>
                        <span className="text-xs text-gray-500 text-center mt-1">
                          {level === 'low' 
                            ? 'Small, shallow' 
                            : level === 'medium' 
                              ? 'Moderate size/depth' 
                              : 'Large, deep, dangerous'
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <button
                  type="submit"
                  disabled={
                    isSubmitting || 
                    !image || 
                    !location.address || 
                    !description || 
                    (aiVerification && !aiVerification.isPothole)
                  }
                  className={`
                    w-full btn-primary flex items-center justify-center gap-2
                    ${(isSubmitting || 
                       !image || 
                       !location.address || 
                       !description ||
                       (aiVerification && !aiVerification.isPothole)) 
                      ? 'opacity-70 cursor-not-allowed' 
                      : ''}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Report
                    </>
                  )}
                </button>
                
                <p className="mt-4 text-sm text-gray-500 text-center">
                  By submitting this report, you're helping make our roads safer for everyone.
                  <br />
                  Your contribution earns you +50 XP and counts toward badges!
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
      
      <DuplicatePotholeModal
        isOpen={showDuplicateModal}
        onClose={handleDuplicateModalClose}
        onProceed={handleProceedAnyway}
        pothole={nearbyPothole}
      />
      
      <Footer />
    </div>
  );
};

export default ReportPothole;
