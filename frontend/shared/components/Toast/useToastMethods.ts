'use client';

import { useCallback, useMemo } from 'react';
import { ToastPosition } from './toast.types';
import { useToastContext } from './ToastProvider';

export const useToastMethods = () => {
  const { addToast } = useToastContext();

  const success = useCallback(
    (msg: string, position?: ToastPosition) =>
      addToast(msg, 'success', position),
    [addToast]
  );

  const error = useCallback(
    (msg: string, position?: ToastPosition) =>
      addToast(msg, 'error', position),
    [addToast]
  );

  const warning = useCallback(
    (msg: string, position?: ToastPosition) =>
      addToast(msg, 'warning', position),
    [addToast]
  );

  const info = useCallback(
    (msg: string, position?: ToastPosition) =>
      addToast(msg, 'info', position),
    [addToast]
  );

  return useMemo(
    () => ({
      success,
      error,
      warning,
      info,
    }),
    [success, error, warning, info]
  );
};

