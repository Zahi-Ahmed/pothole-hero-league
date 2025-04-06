
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface TimelineItem {
  status: string;
  date: string;
  description: string;
  isCompleted?: boolean;
}

interface PotholeTimelineProps {
  reportedDate: string;
  status: 'reported' | 'verified' | 'in-progress' | 'fixed';
  verifiedCount: number;
  fixedDate?: string;
  formatDate: (dateString: string) => string;
}

const PotholeTimeline: React.FC<PotholeTimelineProps> = ({ 
  reportedDate, 
  status, 
  verifiedCount, 
  fixedDate,
  formatDate 
}) => {
  // Generate timeline items based on pothole status
  const getTimelineItems = () => {
    const items: TimelineItem[] = [
      {
        status: 'Reported',
        date: formatDate(reportedDate),
        description: 'New pothole reported',
      }
    ];
    
    if (status === 'verified' || status === 'in-progress' || status === 'fixed') {
      items.push({
        status: 'Verified',
        date: formatDate(new Date(new Date(reportedDate).getTime() + 86400000 * 2).toISOString()),
        description: `Verified by ${verifiedCount} community members`,
      });
    }
    
    if (status === 'in-progress' || status === 'fixed') {
      items.push({
        status: 'Work Started',
        date: formatDate(new Date(new Date(reportedDate).getTime() + 86400000 * 5).toISOString()),
        description: 'Municipal repair team assigned to fix the pothole',
      });
    }
    
    if (status === 'fixed' && fixedDate) {
      items.push({
        status: 'Fixed',
        date: formatDate(fixedDate),
        description: 'Repair completed successfully',
        isCompleted: true,
      });
    }
    
    return items;
  };

  const timelineItems = getTimelineItems();

  return (
    <div className="px-5 pb-5">
      <h4 className="font-medium text-charcoal mb-3">Progress Timeline</h4>
      <div className="relative">
        <div className="absolute top-0 left-3 h-full w-0.5 bg-gray-200"></div>
        
        <div className="space-y-3">
          {timelineItems.map((item, index) => (
            <div key={index} className="ml-8 relative pb-3">
              <div className={`absolute -left-8 w-6 h-6 ${item.isCompleted ? 'bg-secondary' : index === 1 ? 'bg-primary' : index === 2 ? 'bg-accent' : 'bg-primary'} rounded-full flex items-center justify-center -mt-1`}>
                {item.isCompleted ? (
                  <CheckCircle size={12} className="text-white" />
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm font-medium text-charcoal">
                  <span>{item.status}</span>
                  <ArrowRight size={12} className="text-gray-400" />
                  <span>{item.date}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PotholeTimeline;
