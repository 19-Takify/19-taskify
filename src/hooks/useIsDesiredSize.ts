import { useEffect, useState } from 'react';

/*
사용 방법: 매개변수에 원하는 사이즈 숫자를 적으면 뷰포트가 사이즈보다 같거나 작아지면 true 반환
const isTablet = useIsDesiredSize(744);
const isMobile = useIsDesiredSize(375);
*/
function useIsDesiredSize(size: number) {
  const [isDesiredSize, setIsDesiredSize] = useState(false);

  useEffect(() => {
    function handleResize() {
      const isMDesiredViewport = window.innerWidth <= size;
      setIsDesiredSize(isMDesiredViewport); // 원하는 사이즈면 true
    }

    // 페이지가 처음 렌더링될 때 한 번 호출
    handleResize();

    // 창 크기가 변경될 때마다 호출
    window.addEventListener('resize', handleResize);

    // 클린 업
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesiredSize;
}

export default useIsDesiredSize;
