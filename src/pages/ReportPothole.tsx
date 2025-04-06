
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Camera, MapPin, Info, Send, CheckCircle } from 'lucide-react';
import CustomBadge from '@/components/UI/CustomBadge';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Pothole } from '@/lib/types';

const ReportPothole: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState({
    address: '',
    lat: 0,
    lng: 0,
  });
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getLocationClick = () => {
    setIsSubmitting(true);
    
    // Simulate fetching location
    setTimeout(() => {
      setLocation({
        address: 'Detected Address, New Delhi, India',
        lat: 28.6139,
        lng: 77.2090,
      });
      
      setIsSubmitting(false);
      
      toast({
        title: "Location detected",
        description: "We've found your current location.",
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create new pothole report
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
    
    // Add to localStorage
    const existingReports = JSON.parse(localStorage.getItem('potholeReports') || '[]');
    const updatedReports = [newReport, ...existingReports];
    localStorage.setItem('potholeReports', JSON.stringify(updatedReports));
    
    // Trigger localStorage event so other components can update
    window.dispatchEvent(new Event('storage'));
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Report submitted successfully!",
        description: "Thank you for making our roads safer.",
        variant: "default",
      });
      
      const xpElement = document.getElementById('xp-gain');
      if (xpElement) {
        xpElement.classList.add('animate-slide-up');
        xpElement.style.opacity = '1';
      }
    }, 1500);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setImage(null);
    setLocation({
      address: '',
      lat: 0,
      lng: 0,
    });
    setDescription('');
    setSeverity('medium');
  };

  const navigateToProgress = () => {
    navigate('/progress');
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
                      onClick={() => setImage(null)}
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
                
                <p className="text-sm text-gray-500">
                  Please upload a clear photo of the pothole. This helps verify the report quickly.
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
                    className="btn-secondary py-2 px-4"
                    onClick={getLocationClick}
                  >
                    Auto-detect Location
                  </button>
                  <span className="text-sm text-gray-500">or enter manually</span>
                </div>
                
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
                          {level === 'low' ? '🟢' : level === 'medium' ? '����' : '🔴'}
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
                  disabled={isSubmitting || !image || !location.address || !description}
                  className={`
                    w-full btn-primary flex items-center justify-center gap-2
                    ${(isSubmitting || !image || !location.address || !description) 
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
      
      <Footer />
    </div>
  );
};

export default ReportPothole;
