import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Input from './input';

describe('Input Component', () => {
  it('renders with default props', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('applies default height of 20px', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe('20px');
  });

  it('applies custom height when provided', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} height="48px" />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe('48px');
  });

  it('applies border radius of 8px', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.borderRadius).toBe('8px');
  });

  it('applies default border color of #EBEBEB', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.border).toBe('1px solid #EBEBEB');
  });

  it('applies custom border color when provided', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} borderColor="#3B82F6" />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.border).toBe('1px solid #3B82F6');
  });

  it('applies 1px border width', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.border).toContain('1px');
  });

  it('applies transparent background by default', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('transparent');
  });

  it('applies custom background color when provided', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} backgroundColor="#F0F9FF" />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('#F0F9FF');
  });

  it('applies custom width when provided', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} width="300px" />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('300px');
  });

  it('applies default width of 100%', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('100%');
  });

  it('renders icon when provided', () => {
    const handleChange = vi.fn();
    render(
      <Input 
        value="" 
        onChange={handleChange} 
        icon={<span data-testid="test-icon">Icon</span>} 
      />
    );
    
    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
  });

  it('does not render icon when not provided', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const iconWrapper = container.querySelector('.absolute');
    expect(iconWrapper).toBeNull();
  });

  it('handles value prop correctly', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="test value" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('calls onChange when input value changes', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    await userEvent.type(input, 'a');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies placeholder text', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} placeholder="Enter text..." />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.placeholder).toBe('Enter text...');
  });

  it('applies input type', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} type="email" />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('applies default text type', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  it('handles disabled state', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} disabled={true} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('is not disabled by default', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  it('applies correct padding when icon is present', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input 
        value="" 
        onChange={handleChange} 
        icon={<span>Icon</span>} 
      />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.paddingLeft).toBe('2.5rem');
  });

  it('applies correct padding when icon is not present', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} />
    );
    
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.paddingLeft).toBe('0.75rem');
  });
});