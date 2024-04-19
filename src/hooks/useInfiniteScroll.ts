import { useCallback, useEffect, useRef } from 'react';

function useInfiniteScroll(
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void,
) {
  const ref = useRef<HTMLDivElement>(null); // useRef의 제네릭 타입을 HTMLDivElement로 지정

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        onIntersect(entry, observer);
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.6 });
      observer.observe(ref.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [ref.current, handleIntersect]);

  return ref;
}

export default useInfiniteScroll;
