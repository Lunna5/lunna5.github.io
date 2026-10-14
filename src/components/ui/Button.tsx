import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a';
}

const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  children,
  className = '',
  as,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer select-none text-center no-underline border-retro border-ink';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm',
    md: 'text-xs sm:text-sm px-6 py-3 rounded-sm',
    lg: 'text-sm sm:text-base px-8 py-3.5 rounded-sm',
  }[size];

  const variantStyles = {
    primary:
      'bg-primary text-icon shadow-retro-btn hover:translate-x-btn-hover hover:translate-y-btn-hover hover:shadow-retro-sm hover:bg-primary-hover active:translate-x-btn-active active:translate-y-btn-active active:shadow-none',
    secondary:
      'bg-white text-icon shadow-retro-btn hover:translate-x-btn-hover hover:translate-y-btn-hover hover:shadow-retro-sm hover:bg-surface-hover active:translate-x-btn-active active:translate-y-btn-active active:shadow-none',
    dark: 'bg-ink text-paper shadow-retro-btn-dark hover:translate-x-btn-hover hover:translate-y-btn-hover hover:shadow-retro-sm-dark hover:bg-ink-hover active:translate-x-btn-active active:translate-y-btn-active active:shadow-none',
    outline:
      'bg-transparent text-icon hover:bg-primary/20 shadow-retro-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  if (href || as === 'a') {
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
