import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = false, glass = false }) => {
  return (
    <div className={twMerge(
      clsx(
        "rounded-2xl border border-surface-800 bg-surface-900/50 backdrop-blur-sm p-6 shadow-xl transition-all duration-300",
        hover && "hover:border-brand-500/50 hover:shadow-brand-500/10 hover:translate-y-[-2px]",
        glass && "bg-white/5 border-white/10",
        className
      )
    )}>
      {children}
    </div>
  );
};

export default Card;
