import { useState, useEffect } from "react";

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let prevScrollY = window.pageYOffset;

    const updateScrollY = () => {
      const currentScrollY = window.pageYOffset;
      setScrollDirection(currentScrollY > prevScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollY);
    return () => window.removeEventListener('scroll', updateScrollY);
  }, []);

  return { scrollY, scrollDirection };
}
