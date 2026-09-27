import React from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      {(label || description) && (
        <div className="pr-4">
          {label && (
            <p className="text-sm font-medium text-stone-800 leading-snug">
              {label}
            </p>
          )}
          {description && (
            <p className="text-xs text-stone-500 mt-0.5">{description}</p>
          )}
        </div>
      )}
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`w-10 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#34624B] ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </label>
    </div>
  );
};
