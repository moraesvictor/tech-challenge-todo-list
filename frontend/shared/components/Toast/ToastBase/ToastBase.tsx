'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import { ToastProps } from '../toast.types';

export const ToastBase = ({ id, message, type, onClose }: ToastProps) => {
  const colors = useMemo(
    () => ({
      'bg-green-500': type === 'success',
      'bg-red-500': type === 'error',
      'bg-yellow-400 text-black': type === 'warning',
      'bg-cyan-500': type === 'info',
    }),
    [type]
  );

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-lg min-w-[260px] text-white animate-fade-in-up',
        colors
      )}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-white/80 hover:text-white transition-colors"
        aria-label="Fechar toast"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

