
import React from 'react';
import { Shield, TrendingUp, Users } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="section bg-softWhite">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Why Use PatchItUp?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield size={30} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Safer Roads</h3>
            <p className="text-gray-600">
              Help prevent accidents and vehicle damage by identifying road hazards before they cause harm.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp size={30} className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real Impact</h3>
            <p className="text-gray-600">
              See tangible results as reports get verified and fixed, making a visible difference in your community.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Users size={30} className="text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community Power</h3>
            <p className="text-gray-600">
              Join forces with neighbors and local authorities to create accountability and drive action.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="text-3xl font-bold text-primary mb-1">10,000+</h4>
              <p className="text-gray-600">Potholes Reported</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-primary mb-1">5,200+</h4>
              <p className="text-gray-600">Problems Fixed</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-primary mb-1">3,500+</h4>
              <p className="text-gray-600">Active Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
