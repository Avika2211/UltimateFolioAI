import * as THREE from 'three';

export function createParticleSystem(count: number = 1000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

    color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  return new THREE.Points(geometry, material);
}

export function createFloatingGeometry(type: 'dodecahedron' | 'torus' | 'octahedron', color: number) {
  let geometry: THREE.BufferGeometry;

  switch (type) {
    case 'dodecahedron':
      geometry = new THREE.DodecahedronGeometry(1);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
      break;
    case 'octahedron':
      geometry = new THREE.OctahedronGeometry(1);
      break;
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });

  return new THREE.Mesh(geometry, material);
}
