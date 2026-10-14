import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({ children, className = '', hoverEffect = true, ...props }: CardProps) => {
  const hoverStyles = hoverEffect ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-retro-lg' : '';

  return (
    <div
      className={`border-retro border-ink shadow-retro rounded-sm bg-white ${hoverStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`border-ink/15 border-b p-6 ${className}`.trim()}>{children}</div>;
};

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-6 ${className}`.trim()}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`border-ink/15 flex items-center justify-between border-t p-6 pt-4 ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Card;
