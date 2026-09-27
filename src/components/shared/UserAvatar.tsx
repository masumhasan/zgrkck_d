import React from 'react';

export interface UserAvatarProps {
  src?: string;
  name: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  initials,
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-20 h-20 text-lg',
  }[size];

  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  const computedInitials =
    initials ||
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses} ${shapeClasses} object-cover border border-[#E5E1D8] shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses} ${shapeClasses} bg-[#E5E7EB] text-slate-600 font-semibold flex items-center justify-center tracking-tight border border-[#D5D1C8] shrink-0 select-none ${className}`}
    >
      {computedInitials}
    </div>
  );
};
