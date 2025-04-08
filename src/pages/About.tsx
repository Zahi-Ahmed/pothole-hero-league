
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Users, Award, Heart, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Zahi",
    role: "Developer",
    avatar: "https://via.placeholder.com/400x400?text=Zahi",
    bio: "Full-stack developer with expertise in React and building user-friendly interfaces for community-driven applications."
  },
  {
    id: 2,
    name: "Priyanshu",
    role: "Social Media Manager",
    avatar: "https://via.placeholder.com/400x400?text=Priyanshu",
    bio: "Social media expert with a passion for community engagement and digital marketing strategies."
  },
  {
    id: 3,
    name: "Vansh",
    role: "Back End Developer",
    avatar: "https://via.placeholder.com/400x400?text=Vansh",
    bio: "Backend specialist focused on creating robust APIs and database solutions for scalable applications."
  },
  {
    id: 4,
    name: "Tushar",
    role: "Content Writer",
    avatar: "https://via.placeholder.com/400x400?text=Tushar",
    bio: "Creative content writer with a knack for crafting engaging narratives that resonate with diverse audiences."
  }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
              <Users className="text-primary h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold text-charcoal mb-4">About Team Nexium</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are working towards the betterment of the country and binding our citizens and government together.
            </p>
          </div>
          
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center">
              <Award className="text-primary mr-2" /> Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              At Team Nexium, we believe in the power of community-driven solutions to address everyday challenges faced by citizens. 
              Our mission is to bridge the gap between citizens and government agencies to create safer, more accessible public 
              infrastructure for everyone.
            </p>
            <p className="text-gray-600 mb-4">
              We're committed to leveraging technology and public participation to identify, report, and facilitate repairs 
              of potholes and road hazards across India. Through our platform, we aim to create a more engaged citizenry and a 
              more responsive governance system.
            </p>
            <p className="text-gray-600">
              By working together, we can make a tangible difference in the quality of our roads and the safety of our communities.
            </p>
          </div>
          
          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-card p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Community First</h3>
              <p className="text-gray-600">
                We prioritize the needs of citizens and communities in everything we do.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-card p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-secondary h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Quality & Safety</h3>
              <p className="text-gray-600">
                We're committed to promoting better infrastructure and safer roads for all.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-card p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-accent h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek new technologies and approaches to solve infrastructure challenges.
              </p>
            </div>
          </div>
          
          {/* Team */}
          <div className="bg-white rounded-2xl shadow-card p-8 mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-6">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="mb-4 mx-auto w-32 h-32 overflow-hidden rounded-full">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Join Us Section */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl shadow-card p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Together, we can create safer roads and stronger communities across India. 
              Join Team Nexium's mission by reporting potholes, verifying reports, or contributing to our cause.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/report" className="btn-accent">Report a Pothole</a>
              <a href="/donate" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-primary">Support Our Mission</a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
