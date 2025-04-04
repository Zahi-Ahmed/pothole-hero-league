
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  text: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'alert';
  animate?: boolean;
  className?: string;
}

const Badge = ({ text, icon, variant = 'default', animate = false, className }: BadgeProps) => {
  const baseClasses = "badge flex items-center gap-1 font-medium";
  
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary-dark",
    accent: "bg-accent/10 text-charcoal",
    alert: "bg-alert/10 text-alert",
  };
  
  return (
    <span 
      className={cn(
        baseClasses, 
        variantClasses[variant],
        animate && "animate-pulse-badge",
        className
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;
