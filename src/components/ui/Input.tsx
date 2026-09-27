import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, prefixIcon, suffixIcon, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-white border border-[#E5E1D8] text-xs text-slate-800 placeholder-slate-400 rounded-md py-2 transition-all focus:outline-none focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41] ${
              prefixIcon ? 'pl-10' : 'pl-3.5'
            } ${suffixIcon ? 'pr-10' : 'pr-3.5'} ${
              error ? 'border-red-500 focus:ring-red-500' : ''
            } ${className}`}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {suffixIcon}
            </div>
          )}
        </div>
        {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
