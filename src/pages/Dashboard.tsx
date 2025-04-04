
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import UserStats from '@/components/Dashboard/UserStats';
import TaskCard from '@/components/Dashboard/TaskCard';
import { dummyUser, dummyTasks, dummyUsers } from '@/lib/dummyData';
import { Link } from 'react-router-dom';
import { Fire, Award, TrendingUp, MapPin, ChevronRight } from 'lucide-react';
import Badge from '@/components/UI/Badge';

const Dashboard: React.FC = () => {
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
          
          {/* User Stats Card */}
          <UserStats user={dummyUser} />
          
          {/* Daily Tasks & Streak */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Daily Tasks */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-charcoal">Daily Tasks</h2>
                  <Badge text="Complete all tasks for +100 XP bonus!" variant="primary" />
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
          
          {/* Leaderboard Preview */}
          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Award className="text-accent" />
                  <h2 className="text-xl font-bold text-charcoal">Leaderboard</h2>
                </div>
                <Link to="/leaderboard" className="text-primary flex items-center font-medium hover:underline">
                  See full leaderboard <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Level</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">XP</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Reports</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyUsers
                      .sort((a, b) => b.xp - a.xp)
                      .slice(0, 5)
                      .map((user, index) => (
                        <tr key={user.id} className="border-b border-gray-100">
                          <td className="px-4 py-3 text-sm">
                            <div className={`
                              w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                              ${index === 0 ? 'bg-accent text-charcoal' : 
                                index === 1 ? 'bg-gray-300 text-gray-700' : 
                                index === 2 ? 'bg-amber-600 text-white' : 
                                'bg-gray-100 text-gray-500'}
                            `}>
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="font-medium text-charcoal">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-sm font-bold">
                              {user.level}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-gray-600">{user.xp}</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-600">{user.reportsCount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
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
