import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Brain, Leaf, MessageCircle, Eye, ServerCog, Target, Microscope, Cpu, Database, Code } from "lucide-react";

interface SkillOrbProps {
  className?: string;
}

const skills = [
  { icon: Leaf, color: 0x00ff88, label: "Climate AI", description: "Environmental modeling and data processing" },
  { icon: MessageCircle, color: 0x00d9ff, label: "Conversational AI", description: "NLP and chatbot development" },
  { icon: Eye, color: 0x8b5cf6, label: "Computer Vision", description: "Image processing and analysis" },
  { icon: ServerCog, color: 0xffff00, label: "MLOps", description: "Production AI systems" },
  { icon: Brain, color: 0xff0080, label: "Deep Learning", description: "Neural networks and AI research" },
  { icon: Database, color: 0xff6600, label: "Data Science", description: "Analytics and insights" },
  { icon: Code, color: 0x40e0d0, label: "Full Stack", description: "Web development and APIs" },
  { icon: Cpu, color: 0xff69b4, label: "Research", description: "Academic and industry research" }
];

export default function InteractiveSkillOrbs({ className }: SkillOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create skill orbs
    const orbs: THREE.Mesh[] = [];
    const orbRadius = 4;

    skills.forEach((skill, index) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.8,
        wireframe: false
      });

      const orb = new THREE.Mesh(geometry, material);
      
      // Position orbs in a circle
      const angle = (index / skills.length) * Math.PI * 2;
      orb.position.set(
        Math.cos(angle) * orbRadius,
        Math.sin(angle) * orbRadius,
        (Math.random() - 0.5) * 2
      );

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.4, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(orb.position);
      
      scene.add(orb);
      scene.add(glow);
      orbs.push(orb);
    });

    // Add connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    
    for (let i = 0; i < skills.length; i++) {
      const nextIndex = (i + 1) % skills.length;
      linePositions.push(
        orbs[i].position.x, orbs[i].position.y, orbs[i].position.z,
        orbs[nextIndex].position.x, orbs[nextIndex].position.y, orbs[nextIndex].position.z
      );
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.3
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    mountRef.current.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate entire system
      scene.rotation.y += 0.005;

      // Individual orb animations
      orbs.forEach((orb, index) => {
        orb.rotation.x += 0.01 + (index * 0.002);
        orb.rotation.y += 0.015 + (index * 0.001);
        
        // Floating motion
        orb.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
        
        // Scale based on mouse proximity
        const distance = Math.sqrt(
          Math.pow(mouseX * 5 - orb.position.x, 2) + 
          Math.pow(mouseY * 5 - orb.position.y, 2)
        );
        const scale = distance < 2 ? 1.5 : 1.0;
        orb.scale.setScalar(scale);
      });

      // Camera follows mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', onMouseMove);
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="w-full h-[300px] rounded-xl overflow-hidden glassmorphism" />
      
      {/* Skill Legend */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {skills.map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <div
              key={skill.label}
              className={`flex items-center space-x-3 p-3 rounded-lg glassmorphism cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedSkill === skill.label ? 'ring-2 ring-cyan-400' : ''
              }`}
              onMouseEnter={() => setHoveredSkill(skill.label)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => setSelectedSkill(selectedSkill === skill.label ? null : skill.label)}
            >
              <IconComponent 
                className="w-5 h-5" 
                style={{ color: `#${skill.color.toString(16).padStart(6, '0')}` }}
              />
              <div>
                <div className="text-sm font-semibold text-white">{skill.label}</div>
                {(hoveredSkill === skill.label || selectedSkill === skill.label) && (
                  <div className="text-xs text-gray-400 mt-1">{skill.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}