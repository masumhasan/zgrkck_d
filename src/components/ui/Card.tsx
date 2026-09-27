import React from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  headerAction,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-[#E5E2DC] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 pb-4 border-b border-[#ECEAE4] gap-2">
          <div>
            {title && (
              <h3 className="text-lg font-editorial font-bold text-[#244E41]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
