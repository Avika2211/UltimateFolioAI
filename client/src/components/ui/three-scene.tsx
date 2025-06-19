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

    // Create more complex 3D models with enhanced materials
    const geometries = [
      new THREE.DodecahedronGeometry(1.2),
      new THREE.TorusGeometry(1, 0.4, 16, 100),
      new THREE.OctahedronGeometry(1),
      new THREE.IcosahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(1.1),
      new THREE.SphereGeometry(0.6, 32, 32)
    ];

    const materialColors = [0x00d9ff, 0x8b5cf6, 0x00ff88, 0xff0080, 0xffff00, 0xff6600];
    const meshes: THREE.Mesh[] = [];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({ 
        color: materialColors[index], 
        wireframe: true,
        transparent: true,
        opacity: 0.7
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Position meshes in a more dynamic arrangement
      const angle = (index / geometries.length) * Math.PI * 2;
      const radius = 3;
      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 4
      );

      // Add random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);
      meshes.push(mesh);
    });

    // Add particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.6);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced Animation loop with mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Animate all meshes with different speeds and patterns
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + (index * 0.002);
        mesh.rotation.y += 0.007 + (index * 0.001);
        mesh.rotation.z += 0.003 + (index * 0.0015);

        // Add floating motion
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        
        // Mouse interaction - subtle camera movement
        mesh.rotation.x += mouseY * 0.01;
        mesh.rotation.y += mouseX * 0.01;
      });

      // Rotate particle system
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

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
      window.removeEventListener('mousemove', onMouseMove);
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
