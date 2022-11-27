import { useCallback, useEffect, useRef } from "react";

export function useIntersectionObserver(callback: () => void) {
  const loader = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      const topPosition = document.body.getBoundingClientRect().top;
      if (target.isIntersecting && topPosition < 0) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer && observer.disconnect();
  }, [handleObserver]);

  return loader;
}
