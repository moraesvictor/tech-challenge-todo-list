import React, { ReactElement } from 'react';
import {
  render,
  renderHook,
  RenderOptions,
  RenderHookOptions,
} from '@testing-library/react';
import { ModalProvider } from '@shared/components/Modal';
import { ToastProvider } from '@shared/components/Toast';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <ToastProvider>
      <ModalProvider>{children}</ModalProvider>
    </ToastProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

const customRenderHook = <T,>(
  hook: () => T,
  options?: Omit<RenderHookOptions<T>, 'wrapper'>
) => renderHook(hook, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render, customRenderHook as renderHook };

