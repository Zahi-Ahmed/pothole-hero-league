
import React from 'react';
import { Task } from '@/lib/types';
import { Check } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onComplete?: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  return (
    <div 
      className={`card p-4 ${
        task.completed 
          ? 'bg-gray-50 border border-gray-200' 
          : 'bg-white hover:shadow-hover transition-shadow'
      }`}
    >
      <div className="flex items-start gap-3">
        <div 
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl ${
            task.completed 
              ? 'bg-gray-200 text-gray-500' 
              : 'bg-primary/10 text-primary'
          }`}
        >
          {task.icon}
        </div>
        
        <div className="flex-grow">
          <h3 
            className={`font-semibold ${
              task.completed ? 'text-gray-500' : 'text-charcoal'
            }`}
          >
            {task.title}
          </h3>
          <p 
            className={`text-sm ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            } mb-2`}
          >
            {task.description}
          </p>
          <div className="flex justify-between items-center">
            <span 
              className={`text-sm font-medium ${
                task.completed ? 'text-gray-400' : 'text-primary'
              }`}
            >
              +{task.xpReward} XP
            </span>
            
            {!task.completed ? (
              <button
                onClick={() => onComplete?.(task.id)}
                className="text-sm px-3 py-1 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                Complete
              </button>
            ) : (
              <span className="text-sm px-3 py-1 bg-gray-200 text-gray-600 rounded-full font-medium flex items-center gap-1">
                <Check size={14} /> Done
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
