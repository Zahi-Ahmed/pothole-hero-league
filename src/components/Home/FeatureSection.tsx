
import React from 'react';
import { MapPin, CheckCircle, Award, Activity } from 'lucide-react';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <MapPin size={24} className="text-primary" />,
      title: "Report Potholes",
      description: "Easily submit reports with photos and location when you spot road damage.",
    },
    {
      icon: <CheckCircle size={24} className="text-secondary" />,
      title: "Verify Reports",
      description: "Help validate community submissions with our simple swipe interface.",
    },
    {
      icon: <Award size={24} className="text-accent" />,
      title: "Earn Rewards",
      description: "Get XP, badges, and climb the leaderboard as you contribute.",
    },
    {
      icon: <Activity size={24} className="text-alert" />,
      title: "Track Progress",
      description: "Follow the status of reports from submission to completion.",
    },
  ];
  
  return (
    <section className="section bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card p-6 flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
