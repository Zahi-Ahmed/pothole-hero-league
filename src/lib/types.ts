export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  joinedDate: string;
  badges: Badge[];
  reportsCount: number;
  verificationsCount: number;
  fixesCount: number;
  bio?: string;
  location?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'achievement';
  icon: string;
}

export interface Pothole {
  id: string;
  image: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'reported' | 'verified' | 'in-progress' | 'fixed';
  reportedBy: {
    userId: string;
    name: string;
  };
  reportedDate: string;
  verifiedCount: number;
  rejectedCount: number;
  comments: Comment[];
  fixedDate?: string;
  fixedImage?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  date: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  readTime: number;
}
