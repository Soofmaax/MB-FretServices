import { useEffect, useRef, useState } from 'react';

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // If no IntersectionObserver, consider it visible to avoid blocking content.
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        ...options,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}