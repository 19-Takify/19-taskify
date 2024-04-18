import { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const isMobileViewport = window.innerWidth <= 375;
      setIsMobile(isMobileViewport); // mobile 사이즈면 true
    }

    // 페이지가 처음 렌더링될 때 한 번 호출
    handleResize();

    // 창 크기가 변경될 때마다 호출
    window.addEventListener('resize', handleResize);

    // 클린 업
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export default useIsMobile;
