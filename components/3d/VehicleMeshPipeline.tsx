'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  activeSubtab: string;
  explosionLevel: number;
}

// Coordinate mapping for dynamic camera fly-throughs
const CAMERA_RIG: Record<string, { pos: THREE.Vector3, lookAt: THREE.Vector3 }> = {
  overview:   { pos: new THREE.Vector3(0, 2.5, 6), lookAt: new THREE.Vector3(0, 0, 0) },
  chassis:    { pos: new THREE.Vector3(0, 4, 3),   lookAt: new THREE.Vector3(0, 0.5, 0) },
  powertrain: { pos: new THREE.Vector3(-3, 1, -4), lookAt: new THREE.Vector3(0, 0, -0.8) },
  suspension: { pos: new THREE.Vector3(4, 0.5, 3), lookAt: new THREE.Vector3(1, -0.2, 0.8) },
};

function ModelWithRaycasting({ activeSubtab, explosionLevel }: Props) {
  const modelRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { camera, controls } = useThree();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Attempt to load CAD file
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

// --- FALLBACK PIPELINE ---
// Renders when /assets/b26_compressed.glb does not exist
function FallbackWireframePipeline({ activeSubtab, explosionLevel }: Props) {
  const modelRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { camera, controls } = useThree();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const triggerNavigation = (subtab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('subtab', subtab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useFrame((state) => {
    if (!modelRef.current) return;

    // Rotate slowly if overview
    if (activeSubtab === 'overview' && explosionLevel === 0) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    } else {
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, 0, 0.1);
    }

    // Displacement
    modelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const name = child.name;
        
        if (name === 'chassis') {
          child.position.y = THREE.MathUtils.lerp(child.position.y, explosionLevel * 1.5, 0.1);
        }
        if (name === 'powertrain') {
          child.position.z = THREE.MathUtils.lerp(child.position.z, explosionLevel * -1.8, 0.1);
        }
        if (name.includes('suspension')) {
          const defaultX = name.includes('right') ? 0.8 : -0.8;
          const side = defaultX > 0 ? 1 : -1;
          child.position.x = THREE.MathUtils.lerp(child.position.x, defaultX + (side * explosionLevel * 1.2), 0.1);
        }
      }
    });

    // Camera Rig
    const target = CAMERA_RIG[activeSubtab] || CAMERA_RIG.overview;
    camera.position.lerp(target.pos, 0.05);
    if (controls) {
      const ctrlTarget = (controls as any).target as THREE.Vector3;
      ctrlTarget.lerp(target.lookAt, 0.05);
    }
  });

  // UI Anchor helper
  const HotspotCard = ({ title, subtab }: { title: string, subtab: string }) => (
    <Html center>
      <div 
        onClick={() => triggerNavigation(subtab)}
        className={`w-32 bg-[#0D0E10]/90 backdrop-blur-md border ${hoveredNode === subtab ? 'border-[#E11D48]' : 'border-gray-800'} p-2 rounded-sm cursor-pointer transition-all hover:scale-105 select-none`}
        onPointerEnter={() => setHoveredNode(subtab)}
        onPointerLeave={() => setHoveredNode(null)}
      >
        <div className="font-mono text-[9px] text-[#E11D48] font-bold uppercase tracking-widest">{title}</div>
        <div className="font-mono text-[8px] text-gray-400 mt-1 uppercase">Click to Isolate</div>
      </div>
    </Html>
  );

  return (
    <group ref={modelRef} scale={1.5} position={[0, -1, 0]}>
      <mesh 
        name="chassis" 
        position={[0, 0, 0]}
        onPointerEnter={() => setHoveredNode('chassis')}
        onPointerLeave={() => setHoveredNode(null)}
        onClick={() => triggerNavigation('chassis')}
      >
        <boxGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color={hoveredNode === 'chassis' ? '#ff3b6b' : '#E11D48'} wireframe={true} />
        <HotspotCard title="Chassis Node" subtab="chassis" />
      </mesh>
      
      <mesh 
        name="powertrain" 
        position={[0, 0, -1]}
        onPointerEnter={() => setHoveredNode('powertrain')}
        onPointerLeave={() => setHoveredNode(null)}
        onClick={() => triggerNavigation('powertrain')}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.6]} />
        <meshStandardMaterial color={hoveredNode === 'powertrain' ? '#ff9a47' : '#F97316'} wireframe={true} />
        <HotspotCard title="Drivetrain Hub" subtab="powertrain" />
      </mesh>
      
      <mesh 
        name="suspension_left" 
        position={[-0.8, -0.2, 0.8]}
        onPointerEnter={() => setHoveredNode('suspension')}
        onPointerLeave={() => setHoveredNode(null)}
        onClick={() => triggerNavigation('suspension')}
      >
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color={hoveredNode === 'suspension' ? '#38bdf8' : '#0EA5E9'} wireframe={true} />
        <HotspotCard title="Front Left Susp" subtab="suspension" />
      </mesh>

      <mesh 
        name="suspension_right" 
        position={[0.8, -0.2, 0.8]}
        onPointerEnter={() => setHoveredNode('suspension')}
        onPointerLeave={() => setHoveredNode(null)}
        onClick={() => triggerNavigation('suspension')}
      >
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color={hoveredNode === 'suspension' ? '#38bdf8' : '#0EA5E9'} wireframe={true} />
        <HotspotCard title="Front Right Susp" subtab="suspension" />
      </mesh>
    </group>
  );
}

export default function VehicleMeshPipeline(props: Props) {
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  useEffect(() => {
    // Graceful check to ensure rendering doesn't explode if asset is missing
    fetch('/assets/b26_compressed.glb', { method: 'HEAD' })
      .then(res => setModelExists(res.ok))
      .catch(() => setModelExists(false));
  }, []);

  if (modelExists === null) return null;

  return modelExists ? <ModelWithRaycasting {...props} /> : <FallbackWireframePipeline {...props} />;
}
