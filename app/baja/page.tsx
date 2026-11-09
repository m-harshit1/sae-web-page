'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import VehicleMeshPipeline from '@/components/3d/VehicleMeshPipeline';

export default function BajaWorkspace3D() {
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
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-11 flex items-center justify-center shrink-0">
              <img src="/monarch_logo.png" alt="Team Monarch Racing" className="max-h-full max-w-full object-contain drop-shadow" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
              <span className="font-bold tracking-widest text-xs uppercase hidden sm:inline">
                TEAM MONARCH RACING // B-26 CAD CORE
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
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
        <Canvas camera={{ position: [3.2, 2.2, 4.2], fov: 45 }} gl={{ antialias: true }}>
          <color attach="background" args={['#0D0F13']} />

          {/* High-Visibility Multi-directional Lighting */}
          <ambientLight intensity={1.8} />
          <directionalLight position={[10, 15, 10]} intensity={2.5} color="#FFFFFF" />
          <directionalLight position={[-10, 12, -10]} intensity={2.0} color="#E2E8F0" />
          <directionalLight position={[-10, 8, 10]} intensity={1.8} color="#FFFFFF" />
          <directionalLight position={[0, -8, 2]} intensity={1.2} color="#94A3B8" />
          <directionalLight position={[0, 10, 8]} intensity={2.2} color="#FFFFFF" />
          <pointLight position={[0, 6, 0]} intensity={1.5} color="#FFF1F2" />

          <Suspense fallback={
            <Html center>
              <div className="font-mono text-xs text-slate-300 bg-[#1E2025] px-4 py-3 border border-gray-800 rounded-sm uppercase tracking-widest animate-pulse">
                Hydrating Full Vehicle Assembly...
              </div>
            </Html>
          }>
            <VehicleMeshPipeline activeSubtab="overview" explosionLevel={0} />
          </Suspense>

          {/* Ground Grid Floor */}
          <gridHelper args={[12, 24, '#FF334B', '#232730']} position={[0, -1.4, 0]} />

          <OrbitControls
            enableZoom={true}
            maxDistance={10}
            minDistance={2}
            autoRotate={true}
            autoRotateSpeed={1.0}
            maxPolarAngle={Math.PI / 2 + 0.05}
          />
        </Canvas>

        {/* Navigation Info Pill */}
        <div className="absolute bottom-5 right-5 pointer-events-none hidden sm:block">
          <div className="font-mono text-[10px] text-slate-400 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
            🖱️ Click &amp; drag to rotate • Scroll to zoom • Right-click to pan
          </div>
        </div>
      </div>
    </div>
  );
}
