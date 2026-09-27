import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded gap-1.5',
    md: 'text-xs font-semibold px-4 py-2 rounded-md gap-2',
    lg: 'text-sm font-semibold px-5 py-2.5 rounded-lg gap-2',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#244E41] hover:bg-[#1a3c31] text-white shadow-sm focus:ring-2 focus:ring-[#244E41]/20 active:translate-y-[0.5px]',
    secondary:
      'bg-white border border-[#D5D1C8] text-slate-700 hover:bg-[#FAF9F6] shadow-sm',
    outline:
      'border border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50 shadow-sm',
    danger:
      'border border-[#E05252] text-[#D83A3A] hover:bg-red-50 focus:ring-2 focus:ring-red-200',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-[#E6E6E0] rounded-md',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
