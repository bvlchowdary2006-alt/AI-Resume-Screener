import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, className, variant = 'brand' }) => {
  const variants = {
    brand: "bg-brand-500/10 text-brand-400 border-brand-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    surface: "bg-surface-800 text-surface-300 border-surface-700",
  };

  return (
    <span className={twMerge(
      clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )
    )}>
      {children}
    </span>
  );
};

export default Badge;
