import TabBar from '@/components/TabController/TabBar';
import TabPage from '@/components/TabController/TabPage';
import { TabControllerProps } from '@/components/TabController/type';
import { TabContext } from '@/components/TabController/context';
import { useState } from 'react';

const TabController = (props: TabControllerProps) => {
  const { children, items } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <TabContext.Provider value={{ items, currentIndex, setCurrentIndex }}>
      {children}
    </TabContext.Provider>
  );
};

TabController.TabBar = TabBar;
TabController.TabPage = TabPage;

export default TabController;
