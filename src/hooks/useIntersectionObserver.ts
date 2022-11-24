import React, { useCallback, useEffect, useRef } from "react";

export default function useIntersectionObserver(
  callback: () => void,
  dependencies: React.DependencyList
) {
  const loader = useRef(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting) {
      callback();
    }
  }, dependencies);

  useEffect(() => {
    const option = {
      // root: null,
      // rootMargin: "20px",
      // threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer && observer.disconnect();
  }, [loader.current]);

  return loader;
}
