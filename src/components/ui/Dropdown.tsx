import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface DropdownItem {
  id?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  mobileLabel?: React.ReactNode;
  mobileIcon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export interface DropdownProps {
  items?: DropdownItem[];
  trigger?: React.ReactNode;
  ariaLabel?: string;
  title?: string;
  showArrow?: boolean;
  align?: 'left' | 'right';
  menuWidthClass?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  mobile?: boolean;
  mobileLabel?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  trigger,
  ariaLabel,
  title,
  showArrow = true,
  align = 'right',
  menuWidthClass = 'w-36',
  className = '',
  triggerClassName = '',
  menuClassName = '',
  mobile = false,
  mobileLabel,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const containerRef = useRef<HTMLDivElement>(null);

  const setIsOpen = useCallback(
    (nextOpen: boolean | ((prev: boolean) => boolean)) => {
      const value = typeof nextOpen === 'function' ? nextOpen(isOpen) : nextOpen;
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, isOpen, onOpenChange],
  );

  useEffect(() => {
    if (mobile || !isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobile, isOpen, setIsOpen]);

  if (mobile) {
    return (
      <div className={`bg-paper-alt/40 flex items-center justify-between p-3.5 ${className}`.trim()}>
        {mobileLabel && <span className='text-ink-muted font-mono text-xs font-bold uppercase'>{mobileLabel}:</span>}
        <div className='flex gap-1.5 sm:gap-2'>
          {items?.map((item, index) => {
            const activeClass = item.active
              ? 'bg-primary text-ink shadow-retro-sm'
              : 'text-ink hover:bg-surface-hover bg-white';
            const itemClasses =
              `border-ink flex cursor-pointer items-center justify-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-bold transition-all sm:px-3 ${activeClass} ${item.className || ''}`.trim();

            const content = item.mobileLabel ?? (
              <>
                {item.mobileIcon ?? item.icon}
                {typeof item.label === 'string' ? <span>{item.label}</span> : item.label}
              </>
            );

            if (item.href) {
              return (
                <a key={item.id ?? index} href={item.href} onClick={item.onClick} className={itemClasses}>
                  {content}
                </a>
              );
            }

            return (
              <button key={item.id ?? index} type='button' onClick={item.onClick} className={itemClasses}>
                {content}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-stretch ${className}`.trim()} ref={containerRef}>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className={`hover:bg-primary/20 text-ink flex h-full cursor-pointer items-center gap-2 px-3.5 text-xs font-bold tracking-wider transition-colors sm:px-4 sm:text-sm ${triggerClassName}`.trim()}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup='true'
        title={title}
      >
        {trigger}
        {showArrow && (
          <span className={`text-3xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        )}
      </button>

      {isOpen && (
        <div
          role='menu'
          className={`border-retro border-ink shadow-retro divide-ink/10 absolute top-full ${
            align === 'left' ? 'left-0' : 'right-0'
          } z-50 mt-1 flex ${menuWidthClass} flex-col divide-y bg-white py-1 ${menuClassName}`.trim()}
        >
          {items
            ? items.map((item, index) => {
                const itemClasses =
                  `hover:bg-primary/25 flex w-full cursor-pointer items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                    item.active ? 'bg-primary/20 text-accent' : 'text-ink'
                  } ${item.className || ''}`.trim();

                const content = (
                  <>
                    {item.icon ? (
                      <span className='flex items-center gap-2'>
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {item.active && <span className='font-bold'>✓</span>}
                  </>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.id ?? index}
                      href={item.href}
                      onClick={() => {
                        item.onClick?.();
                        setIsOpen(false);
                      }}
                      className={itemClasses}
                      role='menuitem'
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    key={item.id ?? index}
                    type='button'
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className={itemClasses}
                    role='menuitem'
                  >
                    {content}
                  </button>
                );
              })
            : children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
