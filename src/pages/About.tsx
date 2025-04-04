
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Award, Globe, Users, Heart, Shield, Smartphone, Mail, MessageCircle } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Aryan Sharma",
      role: "Founder & Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Passionate about using technology to solve real-world problems in our communities."
    },
    {
      name: "Neha Patel",
      role: "Community Manager",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "Builds and nurtures our growing community of pothole warriors across the country."
    },
    {
      name: "Vikram Singh",
      role: "Municipal Liaison",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      description: "Works directly with city officials to ensure reported potholes get fixed quickly."
    },
    {
      name: "Priya Desai",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      description: "Creates intuitive, engaging experiences that make reporting potholes fun and easy."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 flex justify-center">
              <Shield size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About PatchItUp</h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
              We're on a mission to make our roads safer through community action and civic engagement.
            </p>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-charcoal mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  PatchItUp started in 2022 when founder Aryan Sharma hit a massive pothole on his commute, causing a flat tire and making him miss an important meeting. Frustrated by the lack of action from local authorities, he developed this platform to empower citizens.
                </p>
                <p className="text-gray-600 mb-4">
                  What began as a simple reporting tool has grown into a nationwide movement with thousands of active users working together to improve road safety in their communities.
                </p>
                <p className="text-gray-600">
                  Our unique approach combines easy-to-use technology with game mechanics to make civic engagement both effective and enjoyable.
                </p>
              </div>
              
              <div className="order-first md:order-last">
                <img 
                  src="https://images.unsplash.com/photo-1568332980775-dd2547d1e790?q=80&w=1000" 
                  alt="Team meeting" 
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-charcoal mb-4">Our Mission & Vision</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We believe in the power of community action to create visible, lasting change.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Globe size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To create safer roads by empowering citizens to report, track, and advocate for the repair of dangerous potholes and road conditions in their communities.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-600">Make reporting road issues simple and rewarding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-600">Foster community engagement through gamification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-600">Create accountability through data and transparency</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-accent/5 rounded-2xl p-8 border border-accent/20">
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Award size={28} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A world where community-powered technology bridges the gap between citizens and governments, resulting in safer, better-maintained infrastructure for all.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-gray-600">Zero preventable accidents caused by poor road conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-gray-600">Active community participation in local infrastructure maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-gray-600">A model for civic engagement that can be applied to other issues</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-charcoal mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We're a dedicated group of individuals passionate about road safety and civic engagement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-card p-6 text-center">
                  <div className="mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Us Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <Users size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl font-light mb-8 max-w-3xl mx-auto">
              Connect with fellow road safety advocates and stay updated on the latest news and features.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a href="#" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-4">
                  <MessageCircle size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discord</h3>
                <p className="text-white/90 text-sm">
                  Join our active Discord community to chat with other members and get help.
                </p>
              </a>
              
              <a href="#" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-4">
                  <Smartphone size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Telegram</h3>
                <p className="text-white/90 text-sm">
                  Subscribe to our Telegram channel for announcements and updates.
                </p>
              </a>
              
              <a href="#" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-4">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Newsletter</h3>
                <p className="text-white/90 text-sm">
                  Get monthly updates on our progress and new features via email.
                </p>
              </a>
            </div>
          </div>
        </section>
        
        {/* Support Us Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <Heart size={48} className="text-alert" />
            </div>
            <h2 className="text-3xl font-bold text-charcoal mb-4">Support Our Mission</h2>
            <p className="text-gray-600 mb-8">
              PatchItUp is a non-profit initiative. Your donations help us maintain our servers, develop new features, 
              and expand our impact to more communities.
            </p>
            <a href="/donate" className="btn-primary inline-flex items-center gap-2">
              <Heart size={18} className="text-white" />
              Donate Now
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
