export interface InputProps {
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
}