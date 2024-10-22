import { useMemo, useState } from 'react';

interface PositionItem {
  label: string;
  value: string;
}

export const usePositionHistory = () => {
  // @TODO: 선택했던 position의 history가 되어야 함.
  const [positionHistory, setPositionHistory] = useState<string[]>(['강남구', '서초구', '송파구']);

  const [currentPosition, setCurrentPosition] = useState<string>(
    positionHistory.length === 0 ? '' : positionHistory[0],
  );

  const positionHistoryItems = useMemo<PositionItem[]>(
    () => positionHistory.map((position) => ({ label: position, value: position })),
    [positionHistory],
  );

  return { currentPosition, positionHistory: positionHistoryItems, setCurrentPosition };
};
