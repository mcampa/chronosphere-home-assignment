import React, { useCallback, useEffect, useRef } from "react";

export default function useIntersectionObserver(
  callback: () => void,
  dependencies: React.DependencyList
) {
  const loader = useRef(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    const topPosition = document.body.getBoundingClientRect().top;
    console.log({ topPosition });
    if (target.isIntersecting && topPosition < 0) {
      callback();
    }
  }, dependencies);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer && observer.disconnect();
  }, [loader.current]);

  return loader;
}
