
import React, { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save, X } from 'lucide-react';

interface UserProfileProps {
  initialUser: User;
  onUpdate: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ initialUser, onUpdate }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(initialUser);

  // Update component state when initialUser changes
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSave = () => {
    onUpdate(user);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setUser(initialUser);
    setIsEditing(false);
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-charcoal">Your Profile</h2>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSave} 
              className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-secondary text-white rounded-lg"
            >
              <Save size={16} />
              Save
            </button>
            <button 
              onClick={handleCancel} 
              className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-lg"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-primary/10 text-primary rounded-lg"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary object-cover"
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                <Edit size={16} />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-grow w-full">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={user.bio || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Tell us about yourself"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={user.location || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your city, state"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-1">{user.name}</h2>
              <p className="text-gray-600 text-sm mb-3">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
              
              {user.bio && (
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Bio</h3>
                  <p className="text-gray-600">{user.bio}</p>
                </div>
              )}
              
              {user.location && (
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Location</h3>
                  <p className="text-gray-600">{user.location}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
