import { useCallback, useEffect, useRef } from 'react';

function useInfiniteScroll(
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void,
) {
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        console.log(entry.target);
        observer.unobserve(entry.target);
        onIntersect(entry, observer);
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.7 });
      observer.observe(ref.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [ref, handleIntersect]);

  return ref;
}

export default useInfiniteScroll;
