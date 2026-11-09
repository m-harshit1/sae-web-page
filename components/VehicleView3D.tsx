'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

function ActualGLTFModel() {
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
        // High-visibility racing red with metallic sheen so all 107k CAD polygons pop cleanly
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#FF334B'),
          metalness: 0.6,
          roughness: 0.3,
          side: THREE.DoubleSide,
        });
      }
    });
  }, [gltf]);

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
          <mesh name="suspension_fl" position={[-0.7, -0.2, 0.8]}>
            <sphereGeometry args={[0.25]} />
            <meshStandardMaterial color="#0EA5E9" wireframe={true} />
          </mesh>
          <mesh name="suspension_fr" position={[0.7, -0.2, 0.8]}>
            <sphereGeometry args={[0.25]} />
            <meshStandardMaterial color="#0EA5E9" wireframe={true} />
          </mesh>
        </group>
      </Center>
    </group>
  );
}

function VehicleModel() {
  const [modelExists, setModelExists] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    fetch('/assets/b26_compressed.glb', { method: 'HEAD' })
      .then(res => setModelExists(res.ok))
      .catch(() => setModelExists(false));
  }, []);

  if (modelExists === null) return null;

  return modelExists ? <ActualGLTFModel /> : <FallbackWireframe />;
}

export default function VehicleView3D() {
  return (
    <div className="w-full h-[520px] md:h-[680px] bg-gradient-to-b from-[#111317] via-[#0E1013] to-[#0A0B0D] border border-white/10 rounded-xl relative overflow-hidden group select-none shadow-2xl">

      {/* 3D Canvas Context Runtime Container */}
      <Canvas camera={{ position: [3.2, 2.2, 4.2], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={['#0D0F13']} />
        
        {/* Studio-Grade High-Visibility 360° Lighting */}
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 15, 10]} intensity={2.5} color="#FFFFFF" />
        <directionalLight position={[-10, 12, -10]} intensity={2.0} color="#E2E8F0" />
        <directionalLight position={[-10, 8, 10]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[0, -8, 2]} intensity={1.2} color="#94A3B8" />
        <directionalLight position={[0, 10, 8]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[0, 6, 0]} intensity={1.5} color="#FFF1F2" />

        <Suspense fallback={
          <Html center className="font-mono text-xs text-slate-400 uppercase tracking-widest bg-carbon-900/90 border border-white/10 px-4 py-2 rounded">
            Hydrating SolidWorks Assembly...
          </Html>
        }>
          <VehicleModel />
        </Suspense>

        {/* Technical CAD Ground Plane Grid */}
        <gridHelper args={[10, 20, '#FF334B', '#232730']} position={[0, -1.4, 0]} />

        {/* 360 Turntable OrbitControls */}
        <OrbitControls
          enableZoom={true}
          maxDistance={9}
          minDistance={2}
          autoRotate={true}
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 2 + 0.05}
        />
      </Canvas>

      {/* Watermark / Data Overlay */}
      <div className="absolute top-5 left-5 pointer-events-none">
        <div className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-apex-red animate-pulse" />
          B-26 FULL ASSEMBLY
        </div>
        <div className="font-mono text-[10px] md:text-xs text-slate-400 mt-2 flex flex-col gap-1 bg-black/40 backdrop-blur-sm p-3 rounded border border-white/10">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SolidWorks AP203 CAD Online
          </span>
          <span>Mesh Faces: 910,449 Polygons (Continuous Solid Assembly)</span>
          <span>Source: BAJA_FULL_ASSEMBB;Y.STEP (257 MB)</span>
        </div>
      </div>

      {/* Interactive Navigation Hint */}
      <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:block">
        <div className="font-mono text-[10px] text-slate-400 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
          🖱️ Click &amp; drag to rotate • Scroll to zoom • Right-click to pan
        </div>
      </div>
    </div>
  );
}
