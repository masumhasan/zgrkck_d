import React from 'react';

export type BadgeVariant =
  | 'active'
  | 'pending'
  | 'inactive'
  | 'suspended'
  | 'plus'
  | 'free'
  | 'pro'
  | 'published'
  | 'needs-review'
  | 'draft'
  | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  showDot = false,
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, { bg: string; dot: string }> = {
    active: {
      bg: 'bg-[#D1F2DF] text-[#1E7249]',
      dot: 'bg-[#1E7249]',
    },
    pending: {
      bg: 'bg-[#FBF0E4] text-[#B86E2A]',
      dot: 'bg-[#B86E2A]',
    },
    inactive: {
      bg: 'bg-[#F3F4F6] text-[#6B7280]',
      dot: 'bg-[#6B7280]',
    },
    suspended: {
      bg: 'bg-[#FDE8E8] text-[#9B1C1C]',
      dot: 'bg-[#9B1C1C]',
    },
    plus: {
      bg: 'bg-[#FEEED8] text-[#B45309]',
      dot: 'bg-[#B45309]',
    },
    free: {
      bg: 'bg-[#E5E7EB] text-[#4B5563]',
      dot: 'bg-[#4B5563]',
    },
    pro: {
      bg: 'bg-[#E0E7FF] text-[#3730A3]',
      dot: 'bg-[#3730A3]',
    },
    published: {
      bg: 'bg-[#E5EEE7] text-[#326049]',
      dot: 'bg-[#326049]',
    },
    'needs-review': {
      bg: 'bg-[#FAEBD7] text-[#9A6125]',
      dot: 'bg-[#9A6125]',
    },
    draft: {
      bg: 'bg-[#F3F4F6] text-[#6B7280]',
      dot: 'bg-[#6B7280]',
    },
    neutral: {
      bg: 'bg-[#EFEFEA] text-[#4A5568]',
      dot: 'bg-[#4A5568]',
    },
  };

  const current = variantStyles[variant] || variantStyles.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-tight ${current.bg} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${current.dot} shrink-0`} />
      )}
      {children}
    </span>
  );
};
