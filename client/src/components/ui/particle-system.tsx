import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 50;

    // Clear existing particles
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      container.appendChild(particle);
    }

    // Mouse interaction effect
    const handleMouseMove = () => {
      const particles = container.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = mousePosition.x - centerX;
        const deltaY = mousePosition.y - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          const moveX = deltaX * force * 0.1;
          const moveY = deltaY * force * 0.1;
          
          (particle as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          (particle as HTMLElement).style.transform = 'translate(0, 0)';
        }
      });
    };

    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      handleMouseMove();
    }

  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      id="particles"
    />
  );
}
