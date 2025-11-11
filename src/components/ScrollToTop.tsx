import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll en haut à chaque navigation (chemin, requête ou hash)
    try {
      const main = document.getElementById('main');
      if (main) {
        main.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } catch {
      // Fallback sans options
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToTop;