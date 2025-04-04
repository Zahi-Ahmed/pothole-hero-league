
import React from 'react';
import Hero from '@/components/Home/Hero';
import FeatureSection from '@/components/Home/FeatureSection';
import BenefitsSection from '@/components/Home/BenefitsSection';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, MapPin } from 'lucide-react';
import { dummyPotholes } from '@/lib/dummyData';
import PotholeCard from '@/components/UI/PotholeCard';

const Index: React.FC = () => {
  // Get 2 random potholes to display
  const featuredPotholes = dummyPotholes.slice(0, 2);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <BenefitsSection />
        
        {/* Featured Reports Section */}
        <section className="section bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-charcoal">Featured Reports</h2>
              <Link to="/verify" className="text-primary flex items-center font-medium hover:underline">
                See all reports <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPotholes.map((pothole) => (
                <PotholeCard key={pothole.id} pothole={pothole} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/report" className="btn-primary inline-flex items-center gap-2">
                <MapPin size={18} />
                Report a Pothole
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <Award size={48} className="text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal">Join the Pothole Hero League</h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of the solution. Report potholes, earn rewards, and make your community safer for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dashboard" className="btn-primary">
                Get Started
              </Link>
              <Link to="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
