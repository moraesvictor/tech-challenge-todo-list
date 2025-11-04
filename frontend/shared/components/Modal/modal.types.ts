import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export interface IModal {
  content: ReactNode;
  title?: string;
}

export interface ModalContextType {
  open: (props: IModal) => void;
  close: () => void;
}

