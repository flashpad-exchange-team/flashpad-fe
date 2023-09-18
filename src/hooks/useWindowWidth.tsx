import { useEffect, useState } from 'react';

export default function useWindowWidth() {
  const windowValue = typeof window !== 'undefined' ? window : ({} as any);
  const [windowWidth, setWindowWidth] = useState(windowValue.innerWidth);

  const handleResize = () => {
    setWindowWidth(windowValue.innerWidth);
  };

  useEffect(() => {
    // Add event listener to track window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when component unmounts
    return () => {
      windowValue.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
}
