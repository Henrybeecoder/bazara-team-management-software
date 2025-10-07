export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  bgColor?: string;
  borderColor?: string;
  chevronColor?: string;
  selectedValueColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  disabled?: boolean;
  error?: string;
}
