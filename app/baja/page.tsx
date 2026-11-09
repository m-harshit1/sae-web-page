'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import VehicleMeshPipeline from '@/components/3d/VehicleMeshPipeline';

export default function BajaWorkspace3D() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Tie the 3D rendering view context directly to your URL search query string
  const activeSubtab = searchParams.get('subtab') || 'overview';
  const explosionLevel = parseFloat(searchParams.get('explode') || '0.0');

  const updateExplosionValue = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('explode', val);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full h-screen bg-[#0D0E10] text-[#F3F4F6] relative overflow-hidden flex flex-col font-sans">
      
      {/* --- HUD HEADER STATUS PANEL --- */}
      <header className="w-full h-16 bg-[#0D0E10]/90 backdrop-blur-md border-b border-[#1E2025] px-6 flex items-center justify-between z-10 font-mono text-xs">
        <div className="flex items-center space-x-4">
          <Link
            href="/?tab=projects"
            className="px-3 py-1.5 bg-white/5 hover:bg-apex-red text-slate-300 hover:text-white border border-white/10 rounded transition-all flex items-center gap-1.5 font-bold uppercase tracking-wider"
          >
            ← Return to Cockpit
          </Link>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-pulse" />
            <span className="font-bold tracking-widest text-sm uppercase hidden sm:inline">B-26 CAD CORE // RENDERING MATRIX</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-gray-400 hidden md:block">
            FOCUS AXIS: <span className="text-[#0EA5E9] uppercase font-bold">{activeSubtab}</span>
          </div>
          <a
            href="/api/cad/download"
            download="BAJA_B26_FULL_ASSEMBLY.STEP"
            className="px-3 py-1.5 bg-[#F97316]/20 hover:bg-[#F97316] text-[#F97316] hover:text-white border border-[#F97316]/40 rounded transition-all flex items-center gap-1.5 font-bold uppercase tracking-wider"
            title="Download full 257 MB SolidWorks AP203 CAD STEP model"
          >
            <Download size={13} />
            <span>Download CAD (.STEP)</span>
          </a>
        </div>
      </header>

      {/* --- CORE GRAPHICS ENGINE WORKSPACE VIEWPORT --- */}
      <div className="flex-1 relative w-full h-full">
        <Canvas camera={{ position: [0, 2.5, 6], fov: 45 }} gl={{ antialias: true }}>
          <ambientLight intensity={0.35} />
          <pointLight position={[10, 15, 10]} intensity={1.2} />
          <directionalLight position={[-5, 10, -2]} intensity={0.7} color="#0EA5E9" />
          
          <Suspense fallback={
            <Html center>
              <div className="font-mono text-xs text-gray-500 bg-[#1E2025] px-4 py-3 border border-gray-800 rounded-sm uppercase tracking-widest animate-pulse">
                Compiling WebGL Geometry Buffers...
              </div>
            </Html>
          }>
            <VehicleMeshPipeline activeSubtab={activeSubtab} explosionLevel={explosionLevel} />
          </Suspense>

          <OrbitControls 
            enableZoom={true}
            maxDistance={9}
            minDistance={2.5}
            maxPolarAngle={Math.PI / 2 + 0.05}
          />
        </Canvas>

        {/* --- EXPLOSION DISPLACEMENT SLIDER CONTROL HUB --- */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80 bg-[#1E2025]/90 backdrop-blur-md p-4 border border-gray-800 rounded-sm font-mono z-10">
          <div className="flex justify-between text-[10px] text-gray-400 uppercase tracking-widest mb-2 select-none">
            <span>Assembly Separation</span>
            <span className="text-[#E11D48] font-bold">{(explosionLevel * 100).toFixed(0)}% Exploded</span>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explosionLevel}
            onChange={(e) => updateExplosionValue(e.target.value)}
            className="w-full accent-[#E11D48] bg-[#0D0E10] h-1 rounded-sm appearance-none cursor-ew-resize outline-none"
          />
        </div>
      </div>
    </div>
  );
}
