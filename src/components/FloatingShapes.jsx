// src/components/FloatingShapes.jsx
import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Shape({ geometry, position, color, speed }) {
  const meshRef = React.useRef();
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * speed;
    meshRef.current.rotation.y = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial emissive={color} emissiveIntensity={0.8} color={color} />
    </mesh>
  );
}

export default function FloatingShapes({ accent }) {
  return (
    <>
      <Shape
        geometry={<sphereGeometry args={[1, 32, 32]} />}
        position={[-3, 1, -5]}
        color={accent}
        speed={0.3}
      />
      <Shape
        geometry={<boxGeometry args={[1.5, 1.5, 1.5]} />}
        position={[3, -1, -4]}
        color={accent}
        speed={0.2}
      />
      <Shape
        geometry={<coneGeometry args={[1, 2, 3]} />}
        position={[0, 2, -6]}
        color={accent}
        speed={0.25}
      />
    </>
  );
}
