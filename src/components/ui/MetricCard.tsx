import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: React.ReactNode;
  height?: 'h-32' | 'h-[152px]';
  className?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  sublabel,
  icon,
  height = 'h-32',
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E5E2DC] rounded-xl p-5 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:border-[#D5D0C6] ${height} ${className}`}
    >
      {icon ? (
        <>
          <div className="text-[#244E41]">{icon}</div>
          <div>
            <p className="text-3xl font-editorial font-medium text-gray-900 leading-none">
              {value}
            </p>
            <p className="text-[13px] text-slate-500 mt-2 leading-snug">
              {label}
            </p>
            {sublabel && (
              <p className="text-[11px] text-slate-400 mt-0.5">{sublabel}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            {label}
          </span>
          <div>
            <span className="text-3xl font-editorial font-bold text-[#244E41]">
              {value}
            </span>
            {sublabel && (
              <p className="text-xs text-slate-500 mt-1">{sublabel}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
