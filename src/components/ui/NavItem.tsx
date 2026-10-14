import React from 'react';

export interface NavItemProps {
  href: string;
  children: React.ReactNode;
  badge?: string;
  isExternal?: boolean;
  className?: string;
  onClick?: () => void;
}

const NavItem = ({ href, children, badge, isExternal = false, className = '', onClick }: NavItemProps) => {
  return (
    <a
      href={href}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`text-icon hover:bg-primary/20 flex h-full items-center justify-center gap-1.5 px-5 py-4 text-xs font-medium whitespace-nowrap transition-colors xl:px-6 xl:text-sm ${className}`.trim()}
    >
      <span>{children}</span>
      {badge && (
        <span className='text-2xs bg-primary text-icon border-ink rounded-sm border px-1.5 py-0.5 font-bold'>
          {badge}
        </span>
      )}
    </a>
  );
};

export default NavItem;
