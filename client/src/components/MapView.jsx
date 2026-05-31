import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Generate a procedural point cloud that looks like a building floor plan
const generateBuildingPointCloud = () => {
  const positions = [];
  const colors = [];

  // Building outer walls (black points forming a rectangle outline)
  const buildingWidth = 30;
  const buildingHeight = 20;
  const wallDensity = 200; // points per wall side

  // Top and bottom walls
  for (let i = 0; i < wallDensity; i++) {
    const x = (i / wallDensity) * buildingWidth - buildingWidth / 2;
    // Top wall with some noise
    for (let j = 0; j < 3; j++) {
      positions.push(x + (Math.random() - 0.5) * 0.2, buildingHeight / 2 + (Math.random() - 0.5) * 0.3, 0);
      colors.push(0.05, 0.05, 0.05);
    }
    // Bottom wall
    for (let j = 0; j < 3; j++) {
      positions.push(x + (Math.random() - 0.5) * 0.2, -buildingHeight / 2 + (Math.random() - 0.5) * 0.3, 0);
      colors.push(0.05, 0.05, 0.05);
    }
  }

  // Left and right walls
  for (let i = 0; i < wallDensity; i++) {
    const y = (i / wallDensity) * buildingHeight - buildingHeight / 2;
    for (let j = 0; j < 3; j++) {
      positions.push(-buildingWidth / 2 + (Math.random() - 0.5) * 0.3, y + (Math.random() - 0.5) * 0.2, 0);
      colors.push(0.05, 0.05, 0.05);
    }
    for (let j = 0; j < 3; j++) {
      positions.push(buildingWidth / 2 + (Math.random() - 0.5) * 0.3, y + (Math.random() - 0.5) * 0.2, 0);
      colors.push(0.05, 0.05, 0.05);
    }
  }

  // Interior rooms (pink/red rectangles)
  const rooms = [
    { x: -10, y: 4, w: 5, h: 4 },
    { x: -2, y: 5, w: 4, h: 3 },
    { x: 6, y: 4, w: 6, h: 5 },
    { x: -8, y: -5, w: 6, h: 4 },
    { x: 2, y: -5, w: 5, h: 4 },
    { x: 10, y: -5, w: 5, h: 4 },
  ];

  rooms.forEach(({ x, y, w, h }) => {
    for (let i = 0; i < 150; i++) {
      const px = x + (Math.random() - 0.5) * w;
      const py = y + (Math.random() - 0.5) * h;
      positions.push(px, py, 0);
      // Pink/red color with some variation
      colors.push(0.95 + Math.random() * 0.05, 0.7 + Math.random() * 0.15, 0.7 + Math.random() * 0.15);
    }
    // Room outline
    for (let i = 0; i < 50; i++) {
      const t = i / 50;
      positions.push(x - w / 2 + t * w, y - h / 2, 0);
      colors.push(0.6, 0.2, 0.2);
      positions.push(x - w / 2 + t * w, y + h / 2, 0);
      colors.push(0.6, 0.2, 0.2);
      positions.push(x - w / 2, y - h / 2 + t * h, 0);
      colors.push(0.6, 0.2, 0.2);
      positions.push(x + w / 2, y - h / 2 + t * h, 0);
      colors.push(0.6, 0.2, 0.2);
    }
  });

  // Scattered obstacle points (small clusters)
  for (let i = 0; i < 30; i++) {
    const cx = (Math.random() - 0.5) * buildingWidth * 0.85;
    const cy = (Math.random() - 0.5) * buildingHeight * 0.85;
    for (let j = 0; j < 15; j++) {
      positions.push(
        cx + (Math.random() - 0.5) * 0.6,
        cy + (Math.random() - 0.5) * 0.6,
        0
      );
      const gray = 0.2 + Math.random() * 0.2;
      colors.push(gray, gray, gray);
    }
  }

  // Random noise points (sparse)
  for (let i = 0; i < 1000; i++) {
    positions.push(
      (Math.random() - 0.5) * buildingWidth * 1.1,
      (Math.random() - 0.5) * buildingHeight * 1.1,
      0
    );
    const gray = 0.7 + Math.random() * 0.2;
    colors.push(gray, gray, gray);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
};

const PointCloud = ({ zoom }) => {
  const pointsRef = useRef();
  const { positions, colors } = useMemo(() => generateBuildingPointCloud(), []);

  useFrame(() => {
    if (pointsRef.current) {
      // Slow auto-rotation for visual interest
      pointsRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
};

// Robot marker that shows the current position
const RobotMarker = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(clock.elapsedTime * 0.3) * 2;
      meshRef.current.position.y = Math.cos(clock.elapsedTime * 0.3) * 1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.4, 32]} />
      <meshBasicMaterial color="#1e40af" />
    </mesh>
  );
};

const MapView = ({ zoom }) => {
  return (
    <div className="absolute inset-0 bg-white">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <PointCloud zoom={zoom} />
        <RobotMarker />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};

export default MapView;
