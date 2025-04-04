
import React from 'react';
import { Pothole } from '@/lib/types';
import CustomBadge from './CustomBadge';
import { MapPin, MessageCircle, ThumbsUp, Calendar } from 'lucide-react';

interface PotholeCardProps {
  pothole: Pothole;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  showActions?: boolean;
  className?: string;
}

const PotholeCard: React.FC<PotholeCardProps> = ({ 
  pothole, 
  onSwipeLeft,
  onSwipeRight,
  showActions = false,
  className 
}) => {
  const severityColor = {
    low: 'secondary',
    medium: 'accent',
    high: 'alert'
  };
  
  const statusText = {
    reported: 'Reported',
    verified: 'Verified',
    'in-progress': 'In Progress',
    fixed: 'Fixed'
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className={`card max-w-md mx-auto overflow-hidden ${className}`}>
      <div className="relative h-64 bg-gray-200">
        <img 
          src={pothole.image} 
          alt="Pothole" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <CustomBadge 
            text={statusText[pothole.status]} 
            variant={pothole.status === 'fixed' ? 'secondary' : pothole.status === 'in-progress' ? 'accent' : 'primary'} 
          />
          <CustomBadge 
            text={pothole.severity.charAt(0).toUpperCase() + pothole.severity.slice(1)} 
            variant={severityColor[pothole.severity] as any} 
          />
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin size={16} className="text-primary" />
            <span className="truncate max-w-[200px]">{pothole.location.address}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{formatDate(pothole.reportedDate)}</span>
          </div>
        </div>
        
        <p className="text-charcoal mb-4">{pothole.description}</p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <ThumbsUp size={16} className="text-secondary" />
            <span>{pothole.verifiedCount} verified</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={16} className="text-primary" />
            <span>{pothole.comments.length} comments</span>
          </div>
        </div>
        
        {showActions && (
          <div className="mt-5 flex justify-between gap-3">
            <button 
              onClick={onSwipeLeft}
              className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-500 font-medium hover:bg-gray-100 transition-colors"
            >
              Not a Pothole
            </button>
            <button 
              onClick={onSwipeRight}
              className="flex-1 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              Confirm Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PotholeCard;
