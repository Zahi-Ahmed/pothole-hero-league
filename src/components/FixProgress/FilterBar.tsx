
import React from 'react';

interface FilterBarProps {
  activeFilter: string;
  sortBy: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeFilter, 
  sortBy, 
  onFilterChange, 
  onSortChange 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-wrap gap-4 justify-between items-center">
      <div className="flex flex-wrap gap-2">
        <button 
          className={`px-3 py-1.5 ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button 
          className={`px-3 py-1.5 ${activeFilter === 'fixed' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
          onClick={() => onFilterChange('fixed')}
        >
          Fixed
        </button>
        <button 
          className={`px-3 py-1.5 ${activeFilter === 'in-progress' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
          onClick={() => onFilterChange('in-progress')}
        >
          In Progress
        </button>
        <button 
          className={`px-3 py-1.5 ${activeFilter === 'verified' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
          onClick={() => onFilterChange('verified')}
        >
          Verified
        </button>
        <button 
          className={`px-3 py-1.5 ${activeFilter === 'reported' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
          onClick={() => onFilterChange('reported')}
        >
          Reported
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select 
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          value={sortBy}
          onChange={onSortChange}
        >
          <option value="newest">Newest</option>
          <option value="status">Status</option>
          <option value="verified">Most Verified</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
