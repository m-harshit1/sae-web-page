
'use client';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

function ActualGLTFModel({ explodedFactor, activeSubsystem }: { explodedFactor: number, activeSubsystem: string }) {
  const modelRef = useRef<THREE.Group>(null);
  // This hook will suspend until the model is loaded. 
  // It only runs if we pre-verified the file exists.
  const gltf = useGLTF('/assets/b26_compressed.glb');

  useFrame((state) => {
    if (!modelRef.current) return;
    if (activeSubsystem === 'overview') {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    } else {
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, 0, 0.1);
    }
  });

  return (
    <group ref={modelRef} scale={1.5} position={[0, -1, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function FallbackWireframe({ explodedFactor, activeSubsystem }: { explodedFactor: number, activeSubsystem: string }) {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!modelRef.current) return;

    // Slow rotational drift when idling to add depth to the viewport scene
    if (activeSubsystem === 'overview') {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    } else {
      // Smoothly snap to front orientation if focusing on a sub-assembly
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, 0, 0.1);
    }

    // Traverse the 3D model nodes to manipulate specific parts programmatically
    modelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const name = child.name.toLowerCase();

        // Explode the chassis frame upwards
        if (name.includes('chassis') || name.includes('rollcage')) {
          child.position.y = THREE.MathUtils.lerp(child.position.y, explodedFactor * 2.0, 0.1);
        }
        // Explode the powertrain components rearward
        if (name.includes('powertrain') || name.includes('engine') || name.includes('gearbox')) {
          child.position.z = THREE.MathUtils.lerp(child.position.z, explodedFactor * -1.5, 0.1);
        }
        // Explode suspension components outwards along the sides
        if (name.includes('suspension') || name.includes('wishbone')) {
          const sideFactor = child.position.x > 0 ? 1.2 : -1.2;
          child.position.x = THREE.MathUtils.lerp(child.position.x, sideFactor * explodedFactor, 0.1);
        }
      }
    });
  });

  return (
    <group ref={modelRef} scale={1.5} position={[0, -1, 0]}>
      {/* Placeholder chassis wireframe until real .glb is provided */}
      <mesh name="chassis" position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color="#E11D48" wireframe={true} />
      </mesh>
      <mesh name="powertrain" position={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6]} />
        <meshStandardMaterial color="#F97316" wireframe={true} />
      </mesh>
      <mesh name="suspension_fl" position={[-0.6, -0.2, 0.8]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#0EA5E9" wireframe={true} />
      </mesh>
      <mesh name="suspension_fr" position={[0.6, -0.2, 0.8]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#0EA5E9" wireframe={true} />
      </mesh>
    </group>
  );
}

function VehicleModel({ explodedFactor, activeSubsystem }: { explodedFactor: number, activeSubsystem: string }) {
  const [modelExists, setModelExists] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Check if the user has uploaded their compressed CAD yet
    fetch('/assets/b26_compressed.glb', { method: 'HEAD' })
      .then(res => setModelExists(res.ok))
      .catch(() => setModelExists(false));
  }, []);

  if (modelExists === null) return null; // Still checking

  return modelExists ? (
    <ActualGLTFModel explodedFactor={explodedFactor} activeSubsystem={activeSubsystem} />
  ) : (
    <FallbackWireframe explodedFactor={explodedFactor} activeSubsystem={activeSubsystem} />
  );
}

export default function VehicleView3D({ activeSubsystem = 'overview' }: { activeSubsystem?: string }) {
  const [explosionSlider, setExplosionSlider] = React.useState(0);

  return (
    <div className="w-full h-[500px] md:h-[650px] bg-[#0D0E10] border border-[#1E2025] rounded-xl relative overflow-hidden group">

      {/* 3D Canvas Context Runtime Container */}
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 8, -5]} intensity={0.8} color="#0EA5E9" />
        <spotLight position={[0, 5, 0]} intensity={2} angle={0.6} penumbra={1} castShadow />

        <Suspense fallback={<Html center className="font-mono text-xs text-gray-500 uppercase tracking-widest">Hydrating Mesh Graphics Matrix...</Html>}>
          <VehicleModel explodedFactor={explosionSlider} activeSubsystem={activeSubsystem} />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          maxDistance={8}
          minDistance={3}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>

      {/* Assembly Explosion Overlay Range Slider Control */}
      <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-72 bg-[#1E2025]/80 backdrop-blur-md p-4 rounded-sm border border-gray-800 font-mono z-10 transition-opacity opacity-90 hover:opacity-100">
        <div className="flex justify-between text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          <span>Assembly Position</span>
          <span className="text-[#E11D48] font-bold">{(explosionSlider * 100).toFixed(0)}% Exploded</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explosionSlider}
          onChange={(e) => setExplosionSlider(parseFloat(e.target.value))}
          className="w-full accent-[#E11D48] bg-[#0D0E10] h-1 rounded-sm appearance-none cursor-ew-resize"
        />
      </div>

      {/* Watermark / Data Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="font-heading font-black text-2xl text-white uppercase tracking-tighter">B-26 Assembly</div>
        <div className="font-mono text-[10px] text-slate-500 mt-2 flex flex-col gap-1">
          <span>WebGL Render Pipeline Active</span>
          <span>Polygons: ~1.2M (Decimated)</span>
          <span>Draco Compression: Enabled</span>
        </div>
      </div>
    </div>
  );
}
