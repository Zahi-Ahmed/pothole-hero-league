
import React from 'react';
import { Comment } from '@/lib/types';

interface CommentSectionProps {
  comments: Comment[];
  potholeId: string;
  commentText: string;
  activePotholeId: string | null;
  onCommentChange: (e: React.ChangeEvent<HTMLInputElement>, potholeId: string) => void;
  onCommentSubmit: (potholeId: string) => void;
  formatDate: (dateString: string) => string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  potholeId,
  commentText,
  activePotholeId,
  onCommentChange,
  onCommentSubmit,
  formatDate
}) => {
  return (
    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
      <h4 className="font-medium text-charcoal mb-3">Comments</h4>
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img 
              src={comment.userAvatar} 
              alt={comment.userName} 
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="bg-gray-50 rounded-lg p-3 flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-charcoal">{comment.userName}</span>
                <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
              </div>
              <p className="text-gray-600 text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex gap-2">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          value={activePotholeId === potholeId ? commentText : ''}
          onChange={(e) => onCommentChange(e, potholeId)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onCommentSubmit(potholeId);
            }
          }}
        />
        <button 
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
          onClick={() => onCommentSubmit(potholeId)}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
