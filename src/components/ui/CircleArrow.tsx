import React from 'react';

export interface CircleArrowProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  bgColor?: string;
  className?: string;
  href?: string;
  ariaLabel?: string;
}

const CircleArrow = ({
  bgColor = '#cfa7e8',
  className = '',
  href = '#',
  ariaLabel = 'Ir a la sección',
  ...props
}: CircleArrowProps) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`circle-arrow group ${className}`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <svg
        className='text-icon h-5 w-5 transition-transform duration-200 group-hover:scale-110'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        viewBox='0 0 24 24'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M7 17L17 7M17 7H9M17 7V15' />
      </svg>
    </a>
  );
};

export default CircleArrow;
