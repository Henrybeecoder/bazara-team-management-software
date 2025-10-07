
import React from 'react';
import { InputProps } from '@/types/inputProps';


const Input: React.FC<InputProps> = ({
  value,
  onChange,
  icon,
  height = '20px',
  borderColor = '#EBEBEB',
  backgroundColor = 'transparent',
  width = '100%',
  placeholder = '',
  type = 'text',
  disabled = false,
}) => {
  return (
    <div
      className="relative inline-flex items-center"
      style={{
        width,
        height,
      }}
    >
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
        }}
      />
    </div>
  );
};

export default Input;