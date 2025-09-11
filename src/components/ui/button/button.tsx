import type { ButtonHTMLAttributes } from 'react';
import { buttonColor, buttonGroup, buttonStyle } from './button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'lavender' | 'light';
  size?: 'small' | 'normal' | 'large';
};

export const Button = ({ variant = 'primary', size = 'normal', ...props }: ButtonProps) => {
  return <button {...props} className={`${props.className || ''} ${buttonStyle[size]} ${buttonColor[variant]}`} />;
};

export const ButtonGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className={buttonGroup}>{children}</div>;
};
