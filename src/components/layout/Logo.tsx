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
      <div className={`inline-flex items-center ${isLarge ? 'gap-2.5' : 'gap-2'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className={isLarge ? 'w-9 h-9 shrink-0' : 'w-7 h-7 shrink-0'}
          aria-hidden="true"
        >
          <path d="M 16.06 27.31 C 8.56 24.5 8.56 14.19 17.0 13.25 C 17.94 5.75 28.25 3.88 32.0 9.5 C 35.75 3.88 46.06 5.75 47.0 13.25 C 55.44 14.19 55.44 24.5 47.94 27.31 Z" fill="#FFFFFF" stroke="#12402C" strokeWidth="2.34" strokeLinejoin="round"/>
          <path d="M 17.0 26.38 L 47.0 26.38 L 45.12 33.88 L 18.88 33.88 Z" fill="#FFFFFF" stroke="#12402C" strokeWidth="2.34" strokeLinejoin="round"/>
          <path d="M 21.22 38.09 q 3.0 2.81 6.0 0" fill="none" stroke="#12402C" strokeWidth="1.87" strokeLinecap="round"/>
          <circle cx="35.28" cy="38.09" r="1.88" fill="#12402C"/>
          <rect x="11.56" y="45.12" width="4.5" height="6.56" rx="2.25" fill="#FFFFFF" stroke="#12402C" strokeWidth="1.99"/>
          <rect x="47.94" y="45.12" width="4.5" height="6.56" rx="2.25" fill="#FFFFFF" stroke="#12402C" strokeWidth="1.99"/>
          <path d="M 16.06 42.31 L 47.94 42.31 L 46.53 55.44 a 3.75 3.75 0 0 1 -3.75 3.38 L 21.22 58.81 a 3.75 3.75 0 0 1 -3.75 -3.38 Z" fill="#FFFFFF" stroke="#12402C" strokeWidth="2.34" strokeLinejoin="round"/>
          <path d="M 21.22 47.0 l 1.41 1.59 l 2.91 -3.56" fill="none" stroke="#12402C" strokeWidth="1.78" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="28.25" y1="47.0" x2="42.31" y2="47.0" stroke="#12402C" strokeWidth="1.78" strokeLinecap="round"/>
          <path d="M 21.22 51.31 l 1.41 1.59 l 2.91 -3.56" fill="none" stroke="#12402C" strokeWidth="1.78" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="28.25" y1="51.31" x2="42.31" y2="51.31" stroke="#12402C" strokeWidth="1.78" strokeLinecap="round"/>
          <path d="M 21.22 55.62 l 1.41 1.59 l 2.91 -3.56" fill="none" stroke="#F26722" strokeWidth="1.78" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="28.25" y1="55.62" x2="39.5" y2="55.62" stroke="#12402C" strokeWidth="1.78" strokeLinecap="round"/>
        </svg>
        <h1
          className={`font-editorial italic font-bold tracking-[-0.02em] leading-[1.1] ${
            isLarge ? 'text-4xl' : 'text-[26px]'
          }`}
        >
          <span className="text-[#12402C]">Mealist</span>
          <span className="text-[#F26722]">.ai</span>
        </h1>
      </div>
      {showSubtitle && (
        <p className="text-xs text-slate-500 font-normal mt-1 tracking-wide">
          Premium Data Platform
        </p>
      )}
    </div>
  );
};
