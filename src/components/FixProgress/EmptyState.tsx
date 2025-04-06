
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  onResetFilter: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilter }) => {
  return (
    <div className="bg-white rounded-2xl shadow-card p-10 text-center">
      <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
      <h3 className="text-xl font-semibold text-charcoal mb-2">No potholes found</h3>
      <p className="text-gray-600">No potholes match your current filter criteria.</p>
      <button 
        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium"
        onClick={onResetFilter}
      >
        View All Potholes
      </button>
    </div>
  );
};

export default EmptyState;
