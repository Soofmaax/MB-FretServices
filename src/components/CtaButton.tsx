import type { FC, ReactNode } from 'react';
import LocalizedLink from './LocalizedLink';

interface CtaButtonProps {
  href: string; // path without language prefix, can start with '/' or be relative
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

const CtaButton: FC<CtaButtonProps> = ({ 
  href, 
  children, 
  variant = 'primary', 
  className = '',
  onClick 
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    outline: "border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white focus:ring-accent-500"
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <LocalizedLink 
      to={href} 
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </LocalizedLink>
  );
};

export default CtaButton;