import { createContext } from 'react';
import { TabContextType } from '@/components/TabController/type';

const contextDefaultValue = {
  items: [],
  currentIndex: 0,
  setCurrentIndex: () => {},
};

export const TabContext = createContext<TabContextType>(contextDefaultValue);
