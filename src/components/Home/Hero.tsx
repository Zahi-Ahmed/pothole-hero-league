
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Activity, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary to-primary-light text-white overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              PatchItUp
            </h1>
            <p className="text-xl md:text-2xl font-light mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Spot It. Report It. Fix It.
            </p>
            <p className="text-lg mb-8 text-white/90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Join our community mission to make roads safer by reporting and tracking potholes in your neighborhood.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in relative z-20" style={{ animationDelay: '0.6s' }}>
              <Button asChild variant="secondary">
                <Link to="/report" className="flex items-center gap-2">
                  <MapPin size={18} />
                  Report Pothole
                </Link>
              </Button>
              <Button asChild variant="default">
                <Link to="/progress" className="flex items-center gap-2">
                  <Activity size={18} />
                  See Progress
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="bg-white/10 border-white text-white hover:bg-white hover:text-primary transition-colors relative z-20"
              >
                <Link to="/donate" className="flex items-center gap-2">
                  <Heart size={18} />
                  Donate
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-bounce-in relative z-20">
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl transform rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1603811434402-31e7687e2761?q=80&w=1000" 
                  alt="Pothole on a road" 
                  className="w-full h-auto object-cover rounded-lg"
                  style={{ maxWidth: '400px' }}
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg p-3 transform -rotate-2 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <div className="text-sm font-medium text-charcoal">Reported & Fixed!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ zIndex: 1 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#FFFFFF" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,106.7C672,85,768,75,864,80C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
