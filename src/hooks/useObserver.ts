import { useEffect, useRef } from 'react';

export const useObserver = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const refElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0 },
    );

    if (refElement.current) {
      observer.observe(refElement.current);
    }

    return () => observer.disconnect();
  }, [setPage]);

  return refElement; // 관찰 대상의 ref를 return
};
