import { useState, useEffect, useRef, RefObject } from 'react';
import { useAtomValue } from 'jotai';
import { sideMenuAtom } from '@/components/Layout/DashBoardLayout';

const useSlideAnimation = (className: any) => {
  const isOpen = useAtomValue(sideMenuAtom);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [renderDelayed, setRenderDelayed] = useState(false);
  const refElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 첫 렌더링 시에는 slideOut 애니메이션 작동 x
    setIsFirstRender(true);

    if (isFirstRender && !isOpen) {
      refElement.current?.classList.add(className);
    }

    //렌더링시 0.4초 뒤에 작동 >> 초기 애니메이션 제거
    const timeout = setTimeout(() => {
      setRenderDelayed(true);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen, className]);

  return [refElement, isOpen, renderDelayed];
};

export default useSlideAnimation;
