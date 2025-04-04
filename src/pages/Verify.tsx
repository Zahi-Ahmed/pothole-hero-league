
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PotholeCard from '@/components/UI/PotholeCard';
import { dummyPotholes } from '@/lib/dummyData';
import { CheckCircle, X, Info, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Verify: React.FC = () => {
  const { toast } = useToast();
  const [potholes, setPotholes] = useState(dummyPotholes.filter(p => p.status === 'reported'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipeLeft = () => {
    if (currentIndex < potholes.length) {
      setSwipeDirection('left');
      
      toast({
        title: "Report Rejected",
        description: "You've marked this as not a pothole.",
        variant: "destructive",
      });
      
      // After animation completes, remove the pothole and reset direction
      setTimeout(() => {
        setPotholes(prev => prev.filter((_, i) => i !== currentIndex));
        setSwipeDirection(null);
      }, 300);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < potholes.length) {
      setSwipeDirection('right');
      
      toast({
        title: "Report Verified",
        description: "+10 XP earned for verification!",
      });
      
      // After animation completes, remove the pothole and reset direction
      setTimeout(() => {
        setPotholes(prev => prev.filter((_, i) => i !== currentIndex));
        setSwipeDirection(null);
      }, 300);
    }
  };

  const getSwipeClass = () => {
    if (swipeDirection === 'left') return 'animate-slide-left';
    if (swipeDirection === 'right') return 'animate-slide-right';
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-charcoal">Verify Reports</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Help validate community reports by swiping right to confirm real potholes 
              or left to reject false reports.
            </p>
          </div>
          
          {/* Instructions Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex gap-4 items-start">
            <div className="text-primary mt-1">
              <Info size={20} />
            </div>
            <div>
              <h3 className="font-medium text-charcoal">How to verify</h3>
              <p className="text-sm text-gray-600 mb-2">
                Look carefully at each report and help verify its authenticity.
              </p>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp size={16} className="text-secondary" />
                  <span>Swipe right to verify</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown size={16} className="text-alert" />
                  <span>Swipe left to reject</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Swipe Cards Container */}
          <div className="relative h-[600px] mb-8">
            {potholes.length > 0 ? (
              <div className={`swipe-card ${getSwipeClass()}`}>
                <PotholeCard 
                  pothole={potholes[currentIndex]} 
                  showActions={true} 
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl shadow-card p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-2">All Caught Up!</h3>
                <p className="text-gray-600 mb-6">
                  You've verified all available reports. Check back later for more!
                </p>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-primary/5 rounded-full text-primary font-medium">
                  +{potholes.length * 10} XP Earned
                </div>
              </div>
            )}
          </div>
          
          {/* Swipe Indicators */}
          {potholes.length > 0 && (
            <div className="flex justify-center gap-8 mb-8">
              <button
                onClick={handleSwipeLeft}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-alert rounded-full flex items-center justify-center text-white">
                  <X size={24} />
                </div>
                <span className="text-sm text-gray-600">Not a Pothole</span>
              </button>
              
              <button
                onClick={handleSwipeRight}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white">
                  <CheckCircle size={24} />
                </div>
                <span className="text-sm text-gray-600">Confirm</span>
              </button>
            </div>
          )}
          
          {/* Progress */}
          {potholes.length > 0 && (
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                {currentIndex + 1} of {potholes.length} reports
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / potholes.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Verify;
