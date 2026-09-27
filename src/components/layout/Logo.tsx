import React from 'react';

export interface LogoProps {
  size?: 'default' | 'large';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'default',
  showSubtitle = true,
  className = '',
  onClick,
}) => {
  const isLarge = size === 'large';

  return (
    <div
      className={`select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <h1
        className={`font-editorial font-bold text-[#244E41] tracking-tight leading-none ${
          isLarge ? 'text-4xl' : 'text-3xl'
        }`}
      >
        Mealist.ai
      </h1>
      {showSubtitle && (
        <p className="text-xs text-slate-500 font-normal mt-1 tracking-wide">
          Premium Data Platform
        </p>
      )}
    </div>
  );
};
