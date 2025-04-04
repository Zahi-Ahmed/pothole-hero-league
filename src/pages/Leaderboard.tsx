
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { dummyUsers } from '@/lib/dummyData';
import Badge from '@/components/UI/Badge';
import { Award, TrendingUp, Flag, CheckCircle, Tool } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [leaderboardType, setLeaderboardType] = useState<'xp' | 'reports' | 'verifications' | 'fixes'>('xp');
  
  // Sort users based on selected leaderboard type
  const sortedUsers = [...dummyUsers].sort((a, b) => {
    switch (leaderboardType) {
      case 'reports':
        return b.reportsCount - a.reportsCount;
      case 'verifications':
        return b.verificationsCount - a.verificationsCount;
      case 'fixes':
        return b.fixesCount - a.fixesCount;
      case 'xp':
      default:
        return b.xp - a.xp;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal">Leaderboard</h1>
            <p className="text-gray-600">See who's making the biggest impact in our community.</p>
          </div>
          
          {/* Leaderboard Type Selector */}
          <div className="bg-white rounded-xl shadow-card p-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setLeaderboardType('xp')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium ${
                  leaderboardType === 'xp' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Award size={18} />
                <span>Total XP</span>
              </button>
              
              <button
                onClick={() => setLeaderboardType('reports')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium ${
                  leaderboardType === 'reports' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Flag size={18} />
                <span>Reports</span>
              </button>
              
              <button
                onClick={() => setLeaderboardType('verifications')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium ${
                  leaderboardType === 'verifications' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CheckCircle size={18} />
                <span>Verifications</span>
              </button>
              
              <button
                onClick={() => setLeaderboardType('fixes')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium ${
                  leaderboardType === 'fixes' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Tool size={18} />
                <span>Fixes</span>
              </button>
            </div>
          </div>
          
          {/* Top 3 Users */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {sortedUsers.slice(0, 3).map((user, index) => (
              <div 
                key={user.id} 
                className={`bg-white rounded-2xl shadow-card p-6 ${
                  index === 0 
                    ? 'border-2 border-accent ring-4 ring-accent/20 transform md:scale-105 md:-translate-y-2 z-10' 
                    : ''
                }`}
              >
                {/* Medal Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index === 0 
                        ? 'bg-accent' 
                        : index === 1 
                          ? 'bg-gray-400' 
                          : 'bg-amber-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-500">
                      {leaderboardType === 'xp' && (
                        <span className="font-medium text-primary">{user.xp} XP</span>
                      )}
                      {leaderboardType === 'reports' && (
                        <span className="font-medium text-primary">{user.reportsCount} reports</span>
                      )}
                      {leaderboardType === 'verifications' && (
                        <span className="font-medium text-primary">{user.verificationsCount} verifications</span>
                      )}
                      {leaderboardType === 'fixes' && (
                        <span className="font-medium text-primary">{user.fixesCount} fixes</span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <TrendingUp size={12} className="text-secondary mr-1" />
                      <span className="text-xs text-secondary">
                        +{Math.floor(Math.random() * 50) + 10} this week
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* User Info */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" 
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {user.level}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-charcoal mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {user.badges.slice(0, 3).map((badge) => (
                      <Badge 
                        key={badge.id} 
                        text={badge.name} 
                        icon={badge.icon} 
                        variant={index === 0 ? 'accent' : 'primary'} 
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 w-full text-center text-sm">
                    <div>
                      <div className="font-bold text-charcoal">{user.reportsCount}</div>
                      <div className="text-gray-500">Reports</div>
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">{user.verificationsCount}</div>
                      <div className="text-gray-500">Verified</div>
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">{user.fixesCount}</div>
                      <div className="text-gray-500">Fixes</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Rest of Leaderboard */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Level</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                      {leaderboardType === 'xp' && 'XP'}
                      {leaderboardType === 'reports' && 'Reports'}
                      {leaderboardType === 'verifications' && 'Verifications'}
                      {leaderboardType === 'fixes' && 'Fixes'}
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Badges</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.slice(3).map((user, index) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-charcoal font-medium">#{index + 4}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-charcoal">{user.name}</div>
                            <div className="text-xs text-gray-500">Joined {new Date(user.joinedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-bold">
                          {user.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap font-medium text-charcoal">
                        {leaderboardType === 'xp' && user.xp}
                        {leaderboardType === 'reports' && user.reportsCount}
                        {leaderboardType === 'verifications' && user.verificationsCount}
                        {leaderboardType === 'fixes' && user.fixesCount}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-1">
                          {user.badges.slice(0, 3).map((badge) => (
                            <span key={badge.id} title={badge.name} className="text-lg">
                              {badge.icon}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
