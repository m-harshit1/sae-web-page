'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

type ColorScheme = 'livery' | 'red' | 'titanium';

function ActualGLTFModel({ colorScheme }: { colorScheme: ColorScheme }) {
  const modelRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/assets/b26_compressed.glb');

  React.useLayoutEffect(() => {
    if (!gltf.scene) return;
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.geometry) {
          mesh.geometry.computeVertexNormals();
        }

        if (colorScheme === 'livery') {
          // Multi-tone Motorsport Livery: rubber tires, chrome rims, apex red spaceframe, orange suspension
          mesh.material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            metalness: 0.5,
            roughness: 0.35,
            side: THREE.DoubleSide,
          });
        } else if (colorScheme === 'red') {
          // Monochrome Apex Racing Red
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#FF2B47'),
            metalness: 0.6,
            roughness: 0.25,
            side: THREE.DoubleSide,
          });
        } else {
          // Machined Studio Titanium / Spec CAD
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#CBD5E1'),
            metalness: 0.75,
            roughness: 0.2,
            side: THREE.DoubleSide,
          });
        }
      }
    });
  }, [gltf, colorScheme]);

  return (
    <group ref={modelRef}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  );
}

function FallbackWireframe() {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={modelRef}>
      <Center>
        <group>
          <mesh name="chassis" position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 0.6, 2.4]} />
            <meshStandardMaterial color="#FF334B" wireframe={true} />
          </mesh>
          <mesh name="powertrain" position={[0, 0, -0.8]}>
            <cylinderGeometry args={[0.35, 0.35, 0.7]} />
            <meshStandardMaterial color="#F97316" wireframe={true} />
          </mesh>
        </group>
      </Center>
    </group>
  );
}

function VehicleModel({ colorScheme }: { colorScheme: ColorScheme }) {
  const [modelExists, setModelExists] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    fetch('/assets/b26_compressed.glb', { method: 'HEAD' })
      .then(res => setModelExists(res.ok))
      .catch(() => setModelExists(false));
  }, []);

  if (modelExists === null) return null;

  return modelExists ? <ActualGLTFModel colorScheme={colorScheme} /> : <FallbackWireframe />;
}

export default function VehicleView3D() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('livery');

  return (
    <div className="w-full h-[520px] md:h-[680px] bg-gradient-to-b from-[#111317] via-[#0E1013] to-[#0A0B0D] border border-white/10 rounded-xl relative overflow-hidden group select-none shadow-2xl">

      {/* 3D Canvas Context Runtime Container */}
      <Canvas camera={{ position: [3.2, 2.2, 4.2], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={['#0D0F13']} />
        
        {/* High-Contrast Dynamic Motorsport Studio Lighting */}
        <ambientLight intensity={1.2} />
        {/* Primary Key Light */}
        <directionalLight position={[10, 16, 12]} intensity={2.8} color="#FFFFFF" castShadow />
        {/* Cool Rim Silhouette Light for edge definition */}
        <directionalLight position={[-12, 10, -10]} intensity={2.2} color="#E0F2FE" />
        {/* Warm Accent Fill */}
        <directionalLight position={[-10, 6, 10]} intensity={1.6} color="#FFE4E6" />
        {/* Ground Reflection Bounce */}
        <directionalLight position={[0, -6, 2]} intensity={1.0} color="#94A3B8" />
        {/* Front Specular Highlight */}
        <directionalLight position={[0, 8, 10]} intensity={2.4} color="#FFFFFF" />
        <pointLight position={[0, 5, 0]} intensity={1.8} color="#FFF1F2" />

        <Suspense fallback={
          <Html center className="font-mono text-xs text-slate-400 uppercase tracking-widest bg-carbon-900/90 border border-white/10 px-4 py-2 rounded">
            Hydrating SolidWorks Assembly...
          </Html>
        }>
          <VehicleModel colorScheme={colorScheme} />
        </Suspense>

        {/* Technical CAD Ground Plane Grid */}
        <gridHelper args={[10, 20, '#FF334B', '#1E232D']} position={[0, -1.38, 0]} />

        {/* 360 Turntable OrbitControls */}
        <OrbitControls
          enableZoom={true}
          maxDistance={9}
          minDistance={2}
          autoRotate={true}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2 + 0.05}
        />
      </Canvas>

      {/* Top Left: Watermark & CAD Specs */}
      <div className="absolute top-5 left-5 pointer-events-none">
        <div className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-apex-red animate-pulse" />
          B-26 FULL ASSEMBLY
        </div>
        <div className="font-mono text-[10px] md:text-xs text-slate-400 mt-2 flex flex-col gap-1 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 shadow-xl">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SolidWorks AP203 CAD Online
          </span>
          <span>Mesh Faces: 910,449 Polygons (High-Contrast CAD Assembly)</span>
          <span>Source: BAJA_FULL_ASSEMBB;Y.STEP (257 MB)</span>
        </div>
      </div>

      {/* Top Right: Color & Contrast Palette Switcher */}
      <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl">
        <span className="font-mono text-[9px] uppercase font-bold text-slate-400 px-2 hidden sm:inline">Theme:</span>
        <button
          onClick={() => setColorScheme('livery')}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
            colorScheme === 'livery'
              ? 'bg-torque-orange text-white shadow-md shadow-torque-orange/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Motorsport Livery: Dark rubber tires, chrome rims, apex red roll cage, and orange suspension"
        >
          🏎️ Team Livery
        </button>
        <button
          onClick={() => setColorScheme('red')}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
            colorScheme === 'red'
              ? 'bg-apex-red text-white shadow-md shadow-apex-red/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Monochrome Apex Racing Red with metallic sheen"
        >
          🛡️ Apex Red
        </button>
        <button
          onClick={() => setColorScheme('titanium')}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
            colorScheme === 'titanium'
              ? 'bg-slate-200 text-carbon-900 shadow-md shadow-white/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Brushed Titanium CAD Studio finish"
        >
          ⚪ Titanium CAD
        </button>
      </div>

      {/* Bottom Right: Interactive Navigation Hint */}
      <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:block">
        <div className="font-mono text-[10px] text-slate-400 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
          🖱️ Click &amp; drag to rotate • Scroll to zoom • Right-click to pan
        </div>
      </div>
    </div>
  );
}
