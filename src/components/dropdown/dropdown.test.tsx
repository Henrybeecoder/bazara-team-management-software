import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Dropdown from './dropdown';
import { DropdownOption } from '@/types/dropdownProps';



const mockOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Dropdown Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Rendering', () => {
    it('should render the dropdown with label', () => {
      render(
        <Dropdown
          label="Test Label"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-button')).toBeInTheDocument();
    });

    it('should render without label', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
      expect(screen.getByTestId('dropdown-button')).toBeInTheDocument();
    });

    it('should display placeholder when no value is selected', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          placeholder="Choose an option"
        />
      );

      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('should display selected value', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="option2"
          onChange={mockOnChange}
        />
      );

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should render error message', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          error="This field is required"
        />
      );

      expect(screen.getByTestId('dropdown-error')).toHaveTextContent('This field is required');
    });
  });

  describe('Interactions', () => {
    it('should open dropdown when button is clicked', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should close dropdown when clicking outside', async () => {
      render(
        <div>
          <Dropdown
            options={mockOptions}
            onChange={mockOnChange}
          />
          <div data-testid="outside">Outside</div>
        </div>
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);
      expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();

      const outside = screen.getByTestId('outside');
      fireEvent.mouseDown(outside);

      await waitFor(() => {
        expect(screen.queryByTestId('dropdown-list')).not.toBeInTheDocument();
      });
    });

    it('should select an option and call onChange', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      const option2 = screen.getByTestId('dropdown-option-option2');
      fireEvent.click(option2);

      expect(mockOnChange).toHaveBeenCalledWith('option2');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should close dropdown after selecting an option', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      const option1 = screen.getByTestId('dropdown-option-option1');
      fireEvent.click(option1);

      expect(screen.queryByTestId('dropdown-list')).not.toBeInTheDocument();
    });

    it('should not open when disabled', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          disabled
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      expect(screen.queryByTestId('dropdown-list')).not.toBeInTheDocument();
    });

    it('should display empty state when no options', () => {
      render(
        <Dropdown
          options={[]}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      expect(screen.getByText('No options available')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should open dropdown with Enter key', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();
    });

    it('should open dropdown with Space key', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.keyDown(button, { key: ' ' });

      expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();
    });

    it('should close dropdown with Escape key', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);
      expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();

      fireEvent.keyDown(button, { key: 'Escape' });
      expect(screen.queryByTestId('dropdown-list')).not.toBeInTheDocument();
    });

    it('should select option with Enter key', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      const option2 = screen.getByTestId('dropdown-option-option2');
      fireEvent.keyDown(option2, { key: 'Enter' });

      expect(mockOnChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom background color', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          bgColor="bg-blue-100"
        />
      );

      const button = screen.getByTestId('dropdown-button');
      expect(button).toHaveClass('bg-blue-100');
    });

    it('should apply custom border color', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          borderColor="border-red-500"
        />
      );

      const button = screen.getByTestId('dropdown-button');
      expect(button).toHaveClass('border-red-500');
    });

    it('should apply custom chevron color', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          chevronColor="text-blue-600"
        />
      );

      const chevron = screen.getByTestId('chevron-icon');
      expect(chevron).toHaveClass('text-blue-600');
    });

    it('should apply custom width and height', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          width="w-64"
          height="h-12"
        />
      );

      const button = screen.getByTestId('dropdown-button');
      expect(button).toHaveClass('w-64', 'h-12');
    });

    it('should apply custom border radius', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
          borderRadius="rounded-lg"
        />
      );

      const button = screen.getByTestId('dropdown-button');
      expect(button).toHaveClass('rounded-lg');
    });

    it('should apply custom selected value color', () => {
      const { container } = render(
        <Dropdown
          options={mockOptions}
          value="option1"
          onChange={mockOnChange}
          selectedValueColor="text-purple-600"
        />
      );

      const button = screen.getByTestId('dropdown-button');
      const selectedText = button.querySelector('span');
      expect(selectedText).toHaveClass('text-purple-600');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Dropdown
          label="Accessible Dropdown"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have proper role attributes on list', () => {
      render(
        <Dropdown
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      const list = screen.getByTestId('dropdown-list');
      expect(list).toHaveAttribute('role', 'listbox');
    });

    it('should mark selected option with aria-selected', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="option2"
          onChange={mockOnChange}
        />
      );

      const button = screen.getByTestId('dropdown-button');
      fireEvent.click(button);

      const selectedOption = screen.getByTestId('dropdown-option-option2');
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });
  });
});