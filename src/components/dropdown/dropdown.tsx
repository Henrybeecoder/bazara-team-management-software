import React, { useState, useRef, useEffect } from 'react';
import { DropdownProps, DropdownOption } from '@/types/dropdownProps';
import { ChevronDown } from 'react-feather';



const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
 
  disabled = false,
  error,
   placeholder = 'Select an option',
  bgColor = 'bg-white',
  borderColor = 'border-[#299CCA]',
  chevronColor = 'text-[#299CCA]',
  selectedValueColor = 'text-[#299CCA]',
  width = 'w-full',
  height = 'h-10',
  borderRadius = 'rounded-lg',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'ArrowDown' && isOpen) {
      event.preventDefault();
      const firstOption = dropdownRef.current?.querySelector('[role="option"]') as HTMLElement;
      firstOption?.focus();
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent, optionValue: string, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(optionValue);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextOption = dropdownRef.current?.querySelectorAll('[role="option"]')[index + 1] as HTMLElement;
      nextOption?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (index === 0) {
        const button = dropdownRef.current?.querySelector('button') as HTMLElement;
        button?.focus();
        setIsOpen(true);
      } else {
        const prevOption = dropdownRef.current?.querySelectorAll('[role="option"]')[index - 1] as HTMLElement;
        prevOption?.focus();
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      const button = dropdownRef.current?.querySelector('button') as HTMLElement;
      button?.focus();
    }
  };

  return (
    <div className={width} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? undefined : 'dropdown-button'}
          className={`
         ${height} ${bgColor} w-full  rounded-lg
            border px-3 py-2 text-left flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#299CCA]
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${error ? 'border-red-500' : ''}
          `}
          data-testid="dropdown-button"
        >
          <span className={selectedOption &&  selectedValueColor}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
         <ChevronDown color='#299CCA'/>
        </button>

        {isOpen && (
          <ul
            role="listbox"
            aria-labelledby={label ? undefined : 'dropdown-listbox'}
            className={`
              absolute z-10 mt-1 ${width} ${bgColor} ${borderColor} ${borderRadius}
              border shadow-lg max-h-60 overflow-auto
            `}
            data-testid="dropdown-list"
          >
            {options.length === 0 ? (
              <li className="px-3 py-2 text-gray-500 text-sm">No options available</li>
            ) : (
              options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  tabIndex={0}
                  onClick={() => handleSelect(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.value, index)}
                  className={`
                    px-3 py-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    ${option.value === value ? 'bg-blue-50' : ''}
                  `}
                  data-testid={`dropdown-option-${option.value}`}
                >
                  <span className={option.value === value ? selectedValueColor : 'text-gray-700'}>
                    {option.label}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" data-testid="dropdown-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;