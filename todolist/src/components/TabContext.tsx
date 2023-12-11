import React, { createContext, useContext, ReactNode, useState } from 'react';

interface TabContextProps {
  children: ReactNode;
}

interface TabContextValue {
  TabState: number;
  setTabState: React.Dispatch<React.SetStateAction<number>>;
}

const TabContext = createContext<TabContextValue | undefined>(undefined);

export const TabProvider: React.FC<TabContextProps> = ({ children }) => {
  const [TabState, setTabState] = useState<number>(1);

  return (
    <TabContext.Provider value={{ TabState, setTabState }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabState = (): TabContextValue => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabState must be used within a TabProvider');
  }
  return context;
};