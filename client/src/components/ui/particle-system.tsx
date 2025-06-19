import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const particlesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 100;
    const particles: HTMLElement[] = [];

    // Clear existing particles
    container.innerHTML = '';

    // Create enhanced particles with different types
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const particleType = Math.floor(Math.random() * 4);
      
      // Different particle styles
      switch (particleType) {
        case 0:
          particle.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70';
          break;
        case 1:
          particle.className = 'absolute w-2 h-2 bg-purple-500 rounded-full opacity-50';
          break;
        case 2:
          particle.className = 'absolute w-1.5 h-1.5 bg-green-400 rounded-full opacity-60';
          break;
        default:
          particle.className = 'absolute w-0.5 h-0.5 bg-pink-400 rounded-full opacity-80';
      }

      // Random initial position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = x + '%';
      particle.style.top = y + '%';
      
      // Add glow effect
      particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;
      
      // Random animation properties
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
      
      // Custom data for physics
      particle.dataset.vx = (Math.random() - 0.5).toString();
      particle.dataset.vy = (Math.random() - 0.5).toString();
      particle.dataset.originalX = x.toString();
      particle.dataset.originalY = y.toString();
      
      container.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Enhanced mouse interaction with physics
    const handleMouseMove = () => {
      particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = mousePosition.x - centerX;
        const deltaY = mousePosition.y - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const repulsion = force * 0.3;
          
          // Apply repulsion force
          const moveX = -deltaX * repulsion;
          const moveY = -deltaY * repulsion;
          
          // Add some randomness for organic movement
          const randomX = (Math.random() - 0.5) * force * 10;
          const randomY = (Math.random() - 0.5) * force * 10;
          
          particle.style.transform = `translate(${moveX + randomX}px, ${moveY + randomY}px) scale(${1 + force * 0.5})`;
          particle.style.opacity = (0.3 + force * 0.7).toString();
          
          // Color shift on interaction
          if (force > 0.5) {
            particle.style.filter = 'hue-rotate(90deg) brightness(1.5)';
          } else {
            particle.style.filter = 'none';
          }
        } else {
          // Return to original position
          particle.style.transform = 'translate(0, 0) scale(1)';
          particle.style.opacity = '';
          particle.style.filter = 'none';
        }
      });
    };

    // Continuous floating animation
    let animationFrame: number;
    const animate = () => {
      particles.forEach((particle, index) => {
        if (!particle.style.transform.includes('translate')) {
          // Gentle floating motion when not interacting
          const time = Date.now() * 0.001;
          const floatX = Math.sin(time + index * 0.5) * 2;
          const floatY = Math.cos(time + index * 0.3) * 1.5;
          particle.style.transform = `translate(${floatX}px, ${floatY}px)`;
        }
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      handleMouseMove();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mousePosition]);

  return (
    <>
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0"
        id="particles"
      />
      
      {/* Additional ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-radial from-purple-500/20 to-transparent rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-gradient-radial from-green-400/20 to-transparent rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
    </>
  );
}
