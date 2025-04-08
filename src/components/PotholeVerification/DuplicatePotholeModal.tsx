
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pothole } from '@/lib/types';
import { MapPin, Calendar } from 'lucide-react';

interface DuplicatePotholeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  pothole: Pothole | null;
}

const DuplicatePotholeModal: React.FC<DuplicatePotholeModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  pothole
}) => {
  if (!pothole) return null;

  const formattedDate = new Date(pothole.reportedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Similar Pothole Already Reported</DialogTitle>
          <DialogDescription>
            We found a pothole report near this location. It might be the same pothole you're trying to report.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={pothole.image} 
              alt="Existing pothole report" 
              className="w-full h-48 object-cover"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-700">{pothole.location.address}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
              <p className="text-sm text-gray-700">Reported on {formattedDate}</p>
            </div>
            
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm">{pothole.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${
                pothole.status === 'reported' ? 'bg-yellow-100 text-yellow-800' :
                pothole.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                pothole.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {pothole.status.replace('-', ' ').toUpperCase()}
              </span>
              
              <span className={`text-xs px-2 py-1 rounded ${
                pothole.severity === 'low' ? 'bg-green-100 text-green-800' :
                pothole.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {pothole.severity.toUpperCase()} SEVERITY
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            View Existing Report
          </Button>
          <Button onClick={onProceed}>
            Submit Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicatePotholeModal;
