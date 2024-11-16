import { useContext } from 'react';
import { HomeContext } from '../components/provider';

export const useHomeParameter = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return {
    isHome: context.isHome,
    changeMenu: context.changeMenu,
  };
};
