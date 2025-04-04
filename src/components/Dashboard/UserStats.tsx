
import React from 'react';
import { User } from '@/lib/types';
import ProgressBar from '@/components/UI/ProgressBar';
import Badge from '@/components/UI/Badge';
import { Award, Flag, CheckCircle, Tool } from 'lucide-react';

interface UserStatsProps {
  user: User;
}

const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  // Calculate XP needed for next level (simple formula: current level * 300)
  const nextLevelXp = user.level * 300;
  const currentLevelXp = (user.level - 1) * 300;
  const levelProgress = user.xp - currentLevelXp;
  const maxLevelXp = nextLevelXp - currentLevelXp;
  
  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {user.level}
            </div>
          </div>
        </div>
        
        <div className="flex-grow text-center sm:text-left">
          <h2 className="text-2xl font-bold text-charcoal mb-1">{user.name}</h2>
          <p className="text-gray-600 text-sm mb-3">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-600">Level {user.level}</span>
              <span className="text-sm font-medium text-gray-600">{levelProgress}/{maxLevelXp} XP</span>
            </div>
            <ProgressBar 
              value={levelProgress} 
              max={maxLevelXp} 
              color="primary" 
              animate={true} 
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {user.badges.map((badge) => (
              <Badge 
                key={badge.id} 
                text={badge.name} 
                icon={badge.icon} 
                variant="primary" 
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-primary/5 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Flag className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-charcoal">{user.reportsCount}</h3>
          <p className="text-sm text-gray-600">Reports</p>
        </div>
        
        <div className="bg-secondary/5 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="text-secondary h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-charcoal">{user.verificationsCount}</h3>
          <p className="text-sm text-gray-600">Verifications</p>
        </div>
        
        <div className="bg-accent/5 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <Tool className="text-accent h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-charcoal">{user.fixesCount}</h3>
          <p className="text-sm text-gray-600">Fixes</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
