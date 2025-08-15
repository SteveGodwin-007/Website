// src/components/Background3D.jsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Effects } from "@react-three/drei";
import { EffectComposer, Bloom, GodRays } from "@react-three/postprocessing";
import * as THREE from "three";

function MetallicShape({ type, color, position, floatSpeed }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * floatSpeed;
    ref.current.rotation.y = t * 0.5;
    ref.current.rotation.x = t * 0.3;
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
  });

  let geometry;
  if (type === "circle") geometry = new THREE.SphereGeometry(1.5, 32, 32);
  if (type === "triangle") geometry = new THREE.ConeGeometry(1.8, 2.5, 3);
  if (type === "square") geometry = new THREE.BoxGeometry(2, 2, 2);

  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 1,
    roughness: 0.2,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.8
  });

  return <mesh ref={ref} geometry={geometry} position={position} material={material} />;
}

function GridFloor({ color }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#111"
        metalness={0.5}
        roughness={0.4}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function FloatingParticles({ color }) {
  const count = 200;
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push([
        (Math.random() - 0.5) * 60,
        Math.random() * 30 - 10,
        (Math.random() - 0.5) * 60
      ]);
    }
    return arr;
  }, [count]);

  return positions.map((pos, i) => (
    <mesh key={i} position={pos}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  ));
}

function SweepingSpotlight({ color }) {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lightRef.current.position.x = Math.sin(t * 0.3) * 20;
    lightRef.current.position.z = Math.cos(t * 0.3) * 20;
    lightRef.current.target.position.set(0, -5, 0);
    lightRef.current.target.updateMatrixWorld();
    lightRef.current.intensity = 3 + Math.sin(t * 1.5) * 1.2;
  });

  return (
    <spotLight
      ref={lightRef}
      color={color}
      angle={0.6}
      penumbra={0.4}
      position={[0, 15, 15]}
      castShadow
      intensity={3}
      distance={50}
    />
  );
}

export default function Background3D({ accent }) {
  return (
    <Canvas
      shadows
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -20,
        pointerEvents: "none"
      }}
      camera={{ position: [0, 5, 18], fov: 60 }}
    >
      {/* Fog for depth */}
      <fogExp2 attach="fog" args={["#000000", 0.035]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 20, 10]} intensity={1.5} color={accent} />

      {/* Sweeping spotlight */}
      <SweepingSpotlight color={accent} />

      {/* Ground */}
      <GridFloor color={accent} />

      {/* Particles */}
      <FloatingParticles color={accent} />

      {/* Metallic Squid Game shapes */}
      <MetallicShape type="circle" color={accent} position={[-5, 1, -8]} floatSpeed={0.5} />
      <MetallicShape type="triangle" color={accent} position={[5, -1, -10]} floatSpeed={0.6} />
      <MetallicShape type="square" color={accent} position={[0, -2, -6]} floatSpeed={0.4} />

      {/* Camera rotation */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />

      {/* Bloom + God Rays */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        <GodRays sunPosition={[0, 10, 0]} intensity={0.8} decay={0.95} blur />
      </EffectComposer>
    </Canvas>
  );
}
