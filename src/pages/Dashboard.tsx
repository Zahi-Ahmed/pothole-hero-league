
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import UserStats from '@/components/Dashboard/UserStats';
import UserProfile from '@/components/Dashboard/UserProfile';
import TaskCard from '@/components/Dashboard/TaskCard';
import { dummyUser, dummyTasks } from '@/lib/dummyData';
import { Link } from 'react-router-dom';
import { Award, TrendingUp, MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import CustomBadge from '@/components/UI/CustomBadge';
import Fire from '@/components/UI/Icons/Fire';
import { User } from '@/lib/types';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User>(dummyUser);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage or use dummy data if not available
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      setUser({...dummyUser, ...JSON.parse(savedUser)});
    }
  }, []);

  // Fetch articles from News API
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        // Simulating API call for demo purposes
        // In a real implementation, you would fetch from an actual API
        setTimeout(() => {
          const roadInfrastructureArticles = [
            {
              title: "Indian Government Announces New Road Infrastructure Initiative",
              description: "A new initiative to repair roads and highways across India has been announced, with a focus on fixing potholes and improving road safety.",
              url: "https://example.com/road-initiative",
              urlToImage: "https://via.placeholder.com/800x400?text=Road+Infrastructure+News",
              source: { name: "Infrastructure Today" },
              publishedAt: new Date().toISOString(),
            },
            {
              title: "Local Communities Take on Pothole Repairs",
              description: "Communities across the country are joining forces to address the pothole problem in their neighborhoods.",
              url: "https://example.com/community-repairs",
              urlToImage: "https://via.placeholder.com/800x400?text=Community+Repairs",
              source: { name: "Urban Planning Network" },
              publishedAt: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              title: "New Technology for Quick Pothole Detection",
              description: "Researchers have developed a new AI-based system that can automatically detect potholes from vehicle dash cam footage.",
              url: "https://example.com/pothole-detection",
              urlToImage: "https://via.placeholder.com/800x400?text=Pothole+Detection+Tech",
              source: { name: "Tech Innovate" },
              publishedAt: new Date(Date.now() - 172800000).toISOString(),
            },
          ];
          
          setArticles(roadInfrastructureArticles);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleUpdateUser = (updatedUser: User) => {
    // Merge the updated user with existing data to preserve non-editable fields
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
  };

  // Get user reports count from localStorage
  const getUserReportsCount = () => {
    const userReports = JSON.parse(localStorage.getItem('potholeReports') || '[]');
    return userReports.length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal">Your Dashboard</h1>
            <p className="text-gray-600">Track your progress and impact in the community.</p>
          </div>
          
          {/* User Profile */}
          <UserProfile 
            initialUser={user} 
            onUpdate={handleUpdateUser} 
          />
          
          {/* User Stats Card */}
          <div className="mt-8">
            <UserStats user={{
              ...user,
              reportsCount: getUserReportsCount()
            }} />
          </div>
          
          {/* Daily Tasks & Streak */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Daily Tasks */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-charcoal">Daily Tasks</h2>
                  <CustomBadge text="Complete all tasks for +100 XP bonus!" variant="primary" />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {dummyTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Streak Card */}
            <div>
              <div className="bg-white rounded-2xl shadow-card p-6 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-charcoal">Your Streak</h2>
                  <Fire className="text-alert" />
                </div>
                
                <div className="text-center py-4">
                  <div className="text-6xl font-bold text-primary mb-2">7</div>
                  <p className="text-gray-600 mb-4">days in a row!</p>
                  
                  <div className="flex justify-center space-x-2 mb-6">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          i < 7 ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-primary/5 p-3 rounded-xl">
                    <p className="text-sm text-gray-600">
                      Come back tomorrow to continue your streak and earn +20 XP bonus!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <ExternalLink className="text-accent" />
                  <h2 className="text-xl font-bold text-charcoal">Related Articles</h2>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <a 
                      key={index} 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={article.urlToImage || 'https://via.placeholder.com/800x400?text=No+Image'} 
                          alt={article.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 mb-1">
                          {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                        </div>
                        <h3 className="font-bold text-charcoal text-lg mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
                        <div className="mt-3 flex items-center text-primary font-medium text-sm">
                          Read more <ChevronRight size={16} />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-primary to-primary-light rounded-2xl shadow-card p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ready to make a difference today?</h2>
                <p className="text-white/90">Report a new pothole or help verify existing reports.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/report" className="btn-accent flex items-center gap-2">
                  <MapPin size={18} />
                  Report Pothole
                </Link>
                <Link to="/verify" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-primary flex items-center gap-2">
                  <TrendingUp size={18} />
                  Verify Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
