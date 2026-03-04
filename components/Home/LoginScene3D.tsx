import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text3D, Center } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function FloatingGrid() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + Math.PI / 4;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref} position={[0, -2, 0]}>
      <gridHelper args={[50, 50, 0xff00ff, 0x00ffff]} position={[0, -1, 0]} />
      <gridHelper args={[50, 50, 0xff00ff, 0x00ffff]} position={[0, 1, 0]} rotation={[Math.PI, 0, 0]} />
    </group>
  );
}

function NeonBox({ position, color }: { position: [number, number, number], color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.5;
      mesh.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh
        ref={mesh}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </Float>
  );
}

export function LoginScene3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <FloatingGrid />

        <NeonBox position={[-3, 0, -2]} color="#ff00ff" />
        <NeonBox position={[3, 1, -3]} color="#00ffff" />
        <NeonBox position={[0, 3, -5]} color="#ffff00" />
        <NeonBox position={[0, -3, 2]} color="#00ff00" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
