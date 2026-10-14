import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
  borderBottom?: boolean;
  bg?: string;
}

const Section = ({ id, children, className = '', borderBottom = true, bg = 'bg-paper', ...props }: SectionProps) => {
  const borderClass = borderBottom ? 'border-b-retro border-ink' : '';

  return (
    <section id={id} className={`w-full ${borderClass} ${bg} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
};

export default Section;
