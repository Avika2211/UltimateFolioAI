import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometry1 = new THREE.DodecahedronGeometry(1);
    const geometry2 = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const geometry3 = new THREE.OctahedronGeometry(1);

    const material1 = new THREE.MeshBasicMaterial({ 
      color: 0x00d9ff, 
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const material2 = new THREE.MeshBasicMaterial({ 
      color: 0x8b5cf6, 
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const material3 = new THREE.MeshBasicMaterial({ 
      color: 0x00ff88, 
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    const dodecahedron = new THREE.Mesh(geometry1, material1);
    const torus = new THREE.Mesh(geometry2, material2);
    const octahedron = new THREE.Mesh(geometry3, material3);

    dodecahedron.position.set(-2, 1, 0);
    torus.position.set(2, -1, 0);
    octahedron.position.set(0, 2, -1);

    scene.add(dodecahedron);
    scene.add(torus);
    scene.add(octahedron);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      dodecahedron.rotation.x += 0.01;
      dodecahedron.rotation.y += 0.01;
      
      torus.rotation.x += 0.02;
      torus.rotation.y += 0.01;
      
      octahedron.rotation.x += 0.01;
      octahedron.rotation.z += 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`fixed inset-0 pointer-events-none ${className}`} />;
}
