
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'primary' | 'secondary' | 'accent' | 'alert';
  showText?: boolean;
  animate?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar = ({ 
  value, 
  max, 
  color = 'primary', 
  showText = false, 
  animate = false,
  height = 'md',
  className 
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    alert: 'bg-alert',
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height: heightClasses[height] }}>
        <div 
          className={cn(
            "rounded-full", 
            colorClasses[color],
            animate && "transition-all duration-500 ease-out"
          )} 
          style={{ 
            width: `${percentage}%`,
            height: '100%'
          }}
        />
      </div>
      {showText && (
        <div className="mt-1 text-xs font-medium text-gray-600">
          {value} / {max}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
