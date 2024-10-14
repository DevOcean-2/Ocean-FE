import { createContext } from 'react';
import { TabContextType } from '@/components/TabController/type';

export const TabContext = createContext<TabContextType | undefined>(undefined);
