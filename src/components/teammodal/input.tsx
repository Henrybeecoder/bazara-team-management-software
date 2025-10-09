
import React from 'react';
import { Check } from 'react-feather';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  height?: string;
  borderColor?: string;
  backgroundColor?: string;
  width?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  showCheckbox?: boolean;
  isValid?: boolean;
}

const TeamModalInput: React.FC<InputProps> = ({
  value,
  onChange,
  icon,
  height = '40px',
  borderColor = '#EBEBEB',
  backgroundColor = 'transparent',
  width = '100%',
  placeholder = '',
  type = 'text',
  disabled = false,
  showCheckbox = false,
  isValid = false
}) => {
  return (
    <div className="relative inline-flex items-center" style={{ width, height }}>
      {icon && (
        <div className="absolute left-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-full px-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        style={{
          borderRadius: '8px',
          border: `1px solid ${borderColor}`,
          backgroundColor,
          paddingLeft: icon ? '2.5rem' : '0.75rem',
          paddingRight: showCheckbox ? '2.5rem' : '0.75rem',
        }}
      />
      {showCheckbox && (
        <div
          className="absolute right-3 flex items-center justify-center w-5 h-5 rounded-full"
          style={{
            backgroundColor: isValid ? '#10B981' : '#C4C5C7',
          }}
        >
          <Check size={14} color="white" />
        </div>
      )}
    </div>
  );
};

export default TeamModalInput;