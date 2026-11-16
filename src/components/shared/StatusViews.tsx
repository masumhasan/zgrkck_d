import React from 'react';
import { Button } from '../ui/Button';

export const LoadingBlock: React.FC<{ label?: string }> = ({ label = 'Loading…' }) => (
  <div className="flex items-center justify-center gap-3 py-12 text-xs text-slate-500" role="status">
    <span className="w-4 h-4 rounded-full border-2 border-[#244E41]/20 border-t-[#244E41] animate-spin" />
    <span>{label}</span>
  </div>
);

export const ErrorBlock: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="py-10 text-center space-y-3" role="alert">
    <p className="text-xs text-red-700">{message}</p>
    {onRetry && (
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Try again
      </Button>
    )}
  </div>
);

export const InlineError: React.FC<{ message: string | null }> = ({ message }) =>
  message ? (
    <p className="text-xs text-red-700 bg-red-50 border border-red-100 rounded px-3 py-2" role="alert">
      {message}
    </p>
  ) : null;
