import React, { createContext, useState } from 'react';

// Context 타입 정의
interface HomeContextType {
  isHome: boolean;
  changeMenu: () => void;
  myRanking: number;
  updateMyRanking: (rank: number) => void;
}

// Context 생성
export const HomeContext = createContext<HomeContextType | undefined>(undefined);

// Provider 컴포넌트
export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHome, setIsHome] = useState<boolean>(true);
  const [myRanking, setMyRanking] = useState<number>(0);

  return (
    <HomeContext.Provider
      value={{
        isHome,
        changeMenu: () => setIsHome((prev) => !prev),
        myRanking,
        updateMyRanking: (rank: number) => setMyRanking(rank),
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
