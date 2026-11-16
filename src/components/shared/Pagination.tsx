import React from 'react';
import type { Pagination as PaginationInfo } from '../../types';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  noun?: string;
}

// Shows a compact window of page numbers around the current page.
const pageWindow = (page: number, total: number): number[] => {
  const start = Math.max(1, Math.min(page - 1, total - 2));
  const end = Math.min(total, start + 2);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange, noun = 'results' }) => {
  const { page, limit, total, totalPages } = pagination;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  const btn = 'px-2.5 py-1 border border-[#D5D1C8] rounded text-slate-600 hover:bg-[#FAF9F6] disabled:opacity-40 disabled:hover:bg-transparent';

  return (
    <div className="p-4 border-t border-[#ECE8DF] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
      <span>
        Showing {from} to {to} of {total.toLocaleString()} {noun}
      </span>
      <div className="flex items-center space-x-1">
        <button type="button" className={btn} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        {pageWindow(page, totalPages).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={
              p === page
                ? 'px-2.5 py-1 bg-[#244E41] text-white rounded font-medium'
                : btn
            }
          >
            {p}
          </button>
        ))}
        <button type="button" className={btn} disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};
