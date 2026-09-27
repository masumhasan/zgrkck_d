import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  inline?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  inline = false,
  className = '',
  ...props
}) => {
  return (
    <div className={inline ? 'inline-flex items-center gap-1.5' : 'w-full'}>
      {label && (
        <label className="text-[11px] font-bold tracking-wider text-[#4B5563] uppercase select-none">
          {label}
        </label>
      )}
      <div className="relative inline-block w-full">
        <select
          className={`appearance-none bg-white border border-[#DED9CD] rounded px-3 py-2 text-xs text-[#2C3330] font-medium focus:outline-none focus:ring-1 focus:ring-[#244E41] focus:border-[#244E41] cursor-pointer pr-8 ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#75807C]">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
