import { ReactNode } from 'react';

export interface itemType {
  label: string;
}

export interface TabControllerProps {
  children?: ReactNode;
  items: itemType[];
}

export interface TabContextType {
  items: itemType[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export interface TabPageProps {
  index: number;
  children?: ReactNode;
}
