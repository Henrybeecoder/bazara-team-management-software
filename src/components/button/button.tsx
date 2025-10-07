import React from 'react';
import { Loader } from 'react-feather';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  icon?: React.ReactElement<any>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  onClick,
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    px-4 py-2
    text-xs font-medium
    rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    min-h-[40px]
  `;

  const variantClasses: Record<ButtonVariant, string> = {
    primary: `
      bg-[#1659E6]
      text-white
      hover:bg-[#1247b8]
      focus:ring-[#1659E6]
      border border-transparent
    `,
    secondary: `
      border border-[#EBEBEB]
      text-[#333333]
      bg-transparent
      hover:bg-gray-50
      focus:ring-gray-300
    `
  };

  const buttonClass = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${isLoading ? 'cursor-wait' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        <>
          {icon && React.cloneElement(icon, { className: `mr-2 h-4 w-4 ${icon.props.className || ''}` })}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;