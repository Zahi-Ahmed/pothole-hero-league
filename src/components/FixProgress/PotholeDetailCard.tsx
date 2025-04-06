
import React from 'react';
import { Pothole } from '@/lib/types';
import CustomBadge from '@/components/UI/CustomBadge';
import { Calendar, AlertCircle, CheckCircle, RefreshCw, Clock, User, MessageCircle } from 'lucide-react';
import PotholeTimeline from './PotholeTimeline';
import CommentSection from './CommentSection';

interface PotholeDetailCardProps {
  pothole: Pothole;
  formatDate: (dateString: string) => string;
  commentText: string;
  activePotholeId: string | null;
  onCommentChange: (e: React.ChangeEvent<HTMLInputElement>, potholeId: string) => void;
  onCommentSubmit: (potholeId: string) => void;
}

const PotholeDetailCard: React.FC<PotholeDetailCardProps> = ({
  pothole,
  formatDate,
  commentText,
  activePotholeId,
  onCommentChange,
  onCommentSubmit
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CustomBadge 
                text={pothole.status === 'fixed' 
                  ? 'Fixed' 
                  : pothole.status === 'in-progress' 
                    ? 'In Progress' 
                    : pothole.status === 'verified' 
                      ? 'Verified' 
                      : 'Reported'} 
                variant={pothole.status === 'fixed' 
                  ? 'secondary' 
                  : pothole.status === 'in-progress' 
                    ? 'accent' 
                    : 'primary'} 
              />
              <CustomBadge 
                text={`${pothole.severity.charAt(0).toUpperCase() + pothole.severity.slice(1)} Severity`} 
                variant={pothole.severity === 'high' ? 'alert' : pothole.severity === 'medium' ? 'accent' : 'secondary'} 
              />
            </div>
            <h3 className="text-lg font-semibold text-charcoal">
              Pothole at {pothole.location.address}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar size={14} />
            <span>Reported {formatDate(pothole.reportedDate)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{pothole.description}</p>
        
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <User size={14} />
            <span>Reported by {pothole.reportedBy.name}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <CheckCircle size={14} className="text-secondary" />
            <span>{pothole.verifiedCount} verifications</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={14} className="text-primary" />
            <span>{pothole.comments.length} comments</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-alert" />
            <h4 className="font-medium text-charcoal">Before</h4>
          </div>
          <div className="rounded-lg overflow-hidden h-48 bg-gray-100">
            <img 
              src={pothole.image} 
              alt="Before fix" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-secondary" />
            <h4 className="font-medium text-charcoal">After</h4>
          </div>
          {pothole.status === 'fixed' && pothole.fixedImage ? (
            <div className="rounded-lg overflow-hidden h-48 bg-gray-100">
              <img 
                src={pothole.fixedImage} 
                alt="After fix" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 h-48 flex flex-col items-center justify-center">
              {pothole.status === 'in-progress' ? (
                <>
                  <RefreshCw size={32} className="text-accent mb-2 animate-spin" style={{ animationDuration: '3s' }} />
                  <p className="text-gray-600 font-medium">Repair in progress</p>
                  <p className="text-sm text-gray-500">Municipal team assigned</p>
                </>
              ) : (
                <>
                  <Clock size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-600 font-medium">Awaiting repair</p>
                  <p className="text-sm text-gray-500">Report received by authorities</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <PotholeTimeline 
        reportedDate={pothole.reportedDate}
        status={pothole.status}
        verifiedCount={pothole.verifiedCount}
        fixedDate={pothole.fixedDate}
        formatDate={formatDate}
      />
      
      <CommentSection 
        comments={pothole.comments}
        potholeId={pothole.id}
        commentText={commentText}
        activePotholeId={activePotholeId}
        onCommentChange={onCommentChange}
        onCommentSubmit={onCommentSubmit}
        formatDate={formatDate}
      />
    </div>
  );
};

export default PotholeDetailCard;
