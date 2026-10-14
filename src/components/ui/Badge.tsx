import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  dotColor?: string;
  variant?: 'default' | 'accent' | 'outline' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge = ({ children, dotColor, variant = 'default', size = 'sm', className = '' }: BadgeProps) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-sm border border-ink select-none';

  const sizeStyles = {
    sm: 'text-xxs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }[size];

  const variantStyles = {
    default: 'bg-paper text-icon shadow-retro-badge',
    accent: 'bg-primary text-icon shadow-retro-sm',
    outline: 'bg-white text-icon',
    dark: 'bg-ink text-paper',
  }[variant];

  return (
    <span className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim()}>
      {dotColor && (
        <span className='border-ink/40 h-2 w-2 shrink-0 rounded-full border' style={{ backgroundColor: dotColor }} />
      )}
      {children}
    </span>
  );
};

export default Badge;
