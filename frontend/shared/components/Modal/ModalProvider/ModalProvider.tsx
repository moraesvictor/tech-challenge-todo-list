'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModalBase } from '../ModalBase';
import { IModal, ModalContextType } from '../modal.types';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<IModal | null>(null);

  const open = (props: IModal) => setModal(props);
  const close = () => setModal(null);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {modal && (
        <ModalBase
          title={modal.title || ''}
          isOpen={true}
          onClose={close}
        >
          {modal.content}
        </ModalBase>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

